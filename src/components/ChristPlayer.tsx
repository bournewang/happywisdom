import { useState, useRef, useEffect } from 'react';
import { ttsUrl } from '../api/tts';
import bibleVerses from '../assets/bible.json';

interface BibleVerse {
    content: string;
    verse: string;
}

export function ChristPlayer() {
    const [currentVerse] = useState<BibleVerse>(() => {
        return bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    });
    const [isTTSPlaying, setIsTTSPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Set audio source when verse changes
    useEffect(() => {
        if (audioRef.current && currentVerse) {
            audioRef.current.src = ttsUrl(currentVerse.content);
        }
    }, [currentVerse]);

    const playTTS = async () => {
        if (!audioRef.current) return;
        
        try {
            setIsTTSPlaying(true);
            await audioRef.current.play();
        } catch (error) {
            console.error('TTS error:', error);
            setIsTTSPlaying(false);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-end p-4 md:p-8"
            style={{
                backgroundImage: `url('/images/christ.jpg')`
            }}>
            <div className="w-full max-w-3xl mx-auto mb-12">
                <div className="bg-black/20 rounded-3xl p-6 md:p-8">
                    <h2 className="text-2xl md:text-2xl font-semibold text-center text-white mb-6">
                        {currentVerse.verse}
                    </h2>
                    
                    <div className="rounded-2xl p-5">
                        <p className="leading-relaxed text-2xl md:text-3xl text-white">
                            {currentVerse.content}
                        </p>
                    </div>

                    <div className="flex items-center justify-center mt-4 gap-4">
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
                                    disabled:opacity-50 disabled:cursor-not-allowed">
                            <span className="text-2xl">🔊</span>
                        </button>
                    </div>
                    
                    <audio 
                        ref={audioRef}
                        onEnded={() => setIsTTSPlaying(false)}
                        onError={() => setIsTTSPlaying(false)}
                    />
                </div>
            </div>
        </div>
    );
} 