import { useState, useEffect, useRef } from 'react';
import { textToSpeech } from '../api/tts';
import bibleVerses from '../assets/bible.json';

interface BibleVerse {
    content: string;
    verse: string;
}

interface AudioCache {
    [key: string]: string;
}

export function ChristPlayer() {
    const [currentVerse] = useState<BibleVerse>(() => {
        return bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    });
    const [isTTSPlaying, setIsTTSPlaying] = useState(false);
    const audioCache = useRef<AudioCache>({});

    // const playRandomVerse = () => {
    //     const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    //     setCurrentVerse(randomVerse);
    // };

    const playTTS = async () => {
        if (!currentVerse) return;
        
        try {
            setIsTTSPlaying(true);
            const fullText = currentVerse.content;
            
            let audioUrl: string;
            
            // Check if audio is already cached
            if (audioCache.current[fullText]) {
                audioUrl = audioCache.current[fullText];
            } else {
                // If not cached, request new audio
                const audioBlob = await textToSpeech(fullText);
                audioUrl = URL.createObjectURL(audioBlob);
                audioCache.current[fullText] = audioUrl;
            }

            const audio = new Audio(audioUrl);
            
            audio.onended = () => {
                setIsTTSPlaying(false);
            };

            audio.onerror = () => {
                console.error('Audio playback error');
                setIsTTSPlaying(false);
                // If there's an error, remove from cache
                if (audioCache.current[fullText]) {
                    URL.revokeObjectURL(audioCache.current[fullText]);
                    delete audioCache.current[fullText];
                }
            };
            
            await audio.play();
        } catch (error) {
            console.error('TTS error:', error);
            setIsTTSPlaying(false);
        }
    };

    // Cleanup function to revoke object URLs when component unmounts
    useEffect(() => {
        return () => {
            // Cleanup all cached audio URLs
            Object.values(audioCache.current).forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, []);

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-end p-4 md:p-8"
            style={{
                backgroundImage: `url('/images/christ.jpg')`
            }}
        >
            <div className="w-full max-w-3xl mx-auto mb-12">
                <div className="bg-black/20 rounded-3xl p-6 md:p-8 ">
                    {/* Verse Reference */}
                    <h2 className="text-2xl md:text-2xl font-semibold text-center text-white mb-4">
                        {currentVerse.verse}
                    </h2>
                    
                    {/* Verse Content */}
                    <div className=" rounded-2xl p-5 ">
                        <p className="text-white leading-relaxed text-2xl md:text-3xl" >
                            {currentVerse.content}
                        </p>
                    </div>

{/* Controls */}
                    <div className="flex items-center justify-center mt-4 gap-4 mb-6">
                        <button
                            onClick={playTTS}
                            disabled={isTTSPlaying}
                            className="group relative px-8 py-3 rounded-full 
                                    bg-gradient-to-r from-blue-400/90 to-blue-500/90
                                    hover:from-blue-400 hover:to-blue-500
                                    text-white font-medium 
                                    transform hover:scale-105 active:scale-95
                                    transition-all duration-300 ease-in-out
                                    shadow-lg hover:shadow-blue-500/30
                                    flex items-center gap-3
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-2xl">🔊</span>
                            {/* <span>{isTTSPlaying ? '播放中...' : '朗读经文'}</span> */}
                        </button>

                        {/* <button
                            onClick={playRandomVerse}
                            className="p-3 rounded-full 
                                    bg-white/50 hover:bg-white/70
                                    transform hover:scale-105 active:scale-95
                                    transition-all duration-300 ease-in-out
                                    shadow-lg hover:shadow-blue-500/20
                                    flex items-center justify-center
                                    w-12 h-12"
                            title="换一节"
                        >
                            <span className="text-xl">🔄</span>
                        </button> */}
                    </div>                    
                </div>
            </div>
        </div>
    );
} 