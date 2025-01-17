import { useState, useEffect } from 'react';
import { dict } from '../api/dict';

interface Word {
    word: string;
    phonetic: string;
    definition: string;
}

interface Phonetic {
    text: string;
    audio: string;
}

interface DictResponse {
    word: string;
    phonetics: Phonetic[];
}

function Vocabulary({ words }: { words: Word[] }) {
    const [currentIndex, setCurrentIndex] = useState(() => {
        const saved = localStorage.getItem('vocabularyIndex');
        const initialValue = saved ? parseInt(saved, 10) : 0;
        return initialValue >= 0 && initialValue < words.length ? initialValue : 0;
    });
    const currentWord = words[currentIndex];
    const [phonetics, setPhonetics] = useState<Phonetic[]>([]);
    // const [audioUrl, setAudioUrl] = useState<string>('');

    useEffect(() => {
        dict(currentWord.word).then((data: DictResponse[]) => {
            setPhonetics(data[0]?.phonetics?.filter((p: Phonetic) => p.audio) || []);
            const audio = data[0]?.phonetics?.find((p: Phonetic) => p.audio)?.audio || '';
            console.log(audio);
            // setAudioUrl(audio);
            playAudio(audio);
        });
    }, [currentWord.word]);

    const playAudio = (audioUrl: string) => {
        if (audioUrl) {
            new Audio(audioUrl).play();
        }
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            localStorage.setItem('vocabularyIndex', newIndex.toString());
            setPhonetics([]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(currentIndex - 1);
            localStorage.setItem('vocabularyIndex', newIndex.toString());
            setPhonetics([]);
        }
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto p-8">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="flex flex-col items-center justify-between min-h-[60vh]">
                        {/* Progress Bar */}
                        <div className="w-full mb-8">
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div 
                                    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                                />
                            </div>
                            <p className="text-right text-gray-500 mt-2">
                                {currentIndex + 1} / {words.length}
                            </p>
                        </div>

                        {/* Word Content */}
                        <div className="flex-1 flex flex-col items-center justify-center w-full space-y-8">
                            <h2 className="text-6xl font-bold text-gray-800 mb-4 tracking-tight">
                                {currentWord.word}
                            </h2>
                            
                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                {phonetics.map((phonetic) => (
                                    <div key={phonetic.text} 
                                        className="flex items-center gap-2 bg-blue-200 px-4 py-2 rounded-full">
                                        {phonetic.audio && (
                                            <button
                                                onClick={() => playAudio(phonetic.audio)}
                                                className="hover:bg-blue-200 p-2 rounded-full transition-all"
                                            >
                                                <p className="text-xl text-gray-600">{phonetic.text}</p>
                                                <span className="text-xl">🔊</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <p className="text-2xl text-gray-700 max-w-2xl text-center leading-relaxed">
                                {currentWord.definition}
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between w-full mt-12 gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl disabled:opacity-50 
                                disabled:cursor-not-allowed hover:bg-blue-700 transition-all transform hover:-translate-y-0.5
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                上一个
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === words.length - 1}
                                className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl disabled:opacity-50 
                                disabled:cursor-not-allowed hover:bg-blue-700 transition-all transform hover:-translate-y-0.5
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                下一个
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vocabulary; 