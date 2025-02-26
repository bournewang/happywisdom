import { useState, useEffect } from 'react';
import { Audio } from './common/Audio';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SwipeContainer } from './common/SwipeContainer';
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
        <div className="h-full w-full relative overflow-hidden">
            <SwipeContainer 
                onSwipeUp={handleNext}
                onSwipeDown={handlePrev}
                className="relative"
            >
                <div className=" p-8 md:p-12 ">
                    <div className="flex flex-col items-center justify-between min-h-[60vh] ">
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
                                        <Audio source={config.dictAudioPrefix + currentWord.audioUrl} size="small"/>
                                    </div>
                                )}
                            </div>

                            <p className="text-2xl text-gray-700 max-w-2xl text-center leading-relaxed">
                                {currentWord.definition}
                            </p>
                        </div>
                    </div>
                </div>
            </SwipeContainer>
        </div>
    );
}

export default Vocabulary; 