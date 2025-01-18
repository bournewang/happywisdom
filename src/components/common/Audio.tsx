import { useState, useRef, useEffect } from 'react';
import { ttsUrl } from '../../api/tts';

interface AudioProps {
    source: string;
    isTTS?: boolean;
    className?: string;
}

export function Audio({ source, isTTS = false, className = '' }: AudioProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = isTTS ? ttsUrl(source) : source;
        }
    }, [source, isTTS]);

    const togglePlay = async () => {
        if (!audioRef.current) return;
        
        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Audio playback error:', error);
            setIsPlaying(false);
        }
    };

    return (
        <>
            <button
                onClick={togglePlay}
                className={`relative p-4 rounded-full 
                        bg-gradient-to-r from-blue-500/80 to-cyan-400/80
                        hover:from-blue-400 hover:to-cyan-300
                        transform hover:scale-110 active:scale-95
                        transition-all duration-300 ease-in-out
                        shadow-lg hover:shadow-cyan-500/30
                        backdrop-blur-md
                        flex items-center justify-center
                        w-14 h-14
                        group
                        disabled:opacity-50 disabled:cursor-not-allowed
                        before:content-['']
                        before:absolute before:inset-1
                        before:rounded-full before:bg-white/20
                        before:backdrop-blur-sm
                        before:transition-all before:duration-300
                        hover:before:bg-white/30
                        ${className}`}
                title={isTTS ? "朗读文本" : "播放音频"}
            >
                <span className="relative text-2xl group-hover:scale-110 transition-transform duration-300">
                    {isPlaying ? '⏸️' : '▶️'}
                </span>
            </button>
            
            <audio 
                autoPlay={true}
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                onError={() => setIsPlaying(false)}
            />
        </>
    );
} 