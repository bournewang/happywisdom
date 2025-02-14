import { useState, useEffect } from 'react';
import { Audio } from './common/Audio';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { config } from '../config';

interface Word {
    word: string;
    phonetic: string;
    definition: string;
    audioUrl?: string;
}

function Vocabulary({ words, grade, semester }: { words: Word[], grade: string, semester: string }) {
    const storageKey = `vocabularyIndex-${grade}-${semester}`;

    const [currentIndex, setCurrentIndex] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        const initialValue = saved ? parseInt(saved, 10) : 0;
        return initialValue >= 0 && initialValue < words.length ? initialValue : 0;
    });
    const [currentWord, setCurrentWord] = useState<Word>(words[currentIndex]);
    // const [phonetics, setPhonetics] = useState<Phonetic[]>([]);

    useEffect(() => {
        setCurrentWord(words[currentIndex]);
    }, [words, currentIndex]);

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            localStorage.setItem(storageKey, newIndex.toString());
            // setPhonetics([]); // Clear phonetics immediately
            setCurrentWord(words[newIndex]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            localStorage.setItem(storageKey, newIndex.toString());
            // setPhonetics([]); // Clear phonetics immediately
            setCurrentWord(words[newIndex]);
        }
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            <div className="fixed w-full h-full">
                <img 
                    src="/images/english.jpg"
                    alt="background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative max-w-4xl mx-auto p-8">
                <div className="bg-white/80 rounded-2xl shadow-xl p-8 md:p-12">
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
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                                {currentWord.word}
                            </h2>
                            
                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                {currentWord.audioUrl && (
                                    <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                                        <p className="text-xl text-gray-600">{currentWord.phonetic}</p>
                                        <Audio source={currentWord.audioUrl ? config.dictAudioPrefix + currentWord.audioUrl : ''} size="small"/>
                                    </div>
                                )}
                            </div>

                            <p className="text-xl text-gray-700 max-w-2xl text-center leading-relaxed">
                                {currentWord.definition}
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between w-full mt-12 gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                // simplify the button style
                                
                                className="flex-1 px-8 py-4 rounded-xl flex items-center justify-center
                                    bg-gradient-to-r from-blue-500/80 to-cyan-400/80
                                    hover:from-blue-400 hover:to-cyan-300
                                    text-white font-medium
                                    transform hover:scale-105 active:scale-95
                                    transition-all duration-300 ease-in-out
                                    shadow-lg hover:shadow-cyan-500/30
                                    backdrop-blur-sm
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    disabled:hover:scale-100
                                    group"
                            >
                                <FaArrowLeft className="text-2xl"/>
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === words.length - 1}
                                className="flex-1 px-8 py-4 rounded-xl flex items-center justify-center
                                    bg-gradient-to-r from-blue-500/80 to-cyan-400/80
                                    hover:from-blue-400 hover:to-cyan-300
                                    text-white font-medium
                                    transform hover:scale-105 active:scale-95
                                    transition-all duration-300 ease-in-out
                                    shadow-lg hover:shadow-cyan-500/30
                                    backdrop-blur-sm
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    disabled:hover:scale-100
                                    group"
                            >
                                <FaArrowRight className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vocabulary; 