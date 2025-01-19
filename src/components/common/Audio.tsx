import { useState, useRef, useEffect } from 'react';
import { ttsUrl } from '../../api/tts';
import { FaPlay, FaPause } from 'react-icons/fa';

interface AudioProps {
    source: string;
    isTTS?: boolean;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

export function Audio({ source, isTTS = false, className = '', size = 'large' }: AudioProps) {
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

    const sizeClasses = {
        small: ' text-sm w-10 h-10',
        medium: ' text-base w-14 h-14',
        large: ' text-lg w-20 h-20'
    }

    const iconSizeClasses = {
        small: 'text-lg',
        medium: 'text-2xl',
        large: 'text-3xl'
    }

    return (
        <>
            <button
                onClick={togglePlay}
                className={`relative rounded-full 
                        ${isPlaying ? 'bg-red-500 hover:bg-red-400' : 'pl-1 bg-gradient-to-r from-blue-500/80 to-cyan-400/80 \
                        transform hover:scale-105 active:scale-95 \
                        transition-all duration-300 ease-in-out \
                        shadow-lg hover:shadow-cyan-500/30 hover:from-blue-400 hover:to-cyan-300'}
                        text-white font-medium
                        transition-all duration-300 ease-in-out
                        shadow-lg
                        backdrop-blur-md
                        flex items-center justify-center text-center
                        group
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${className} ${sizeClasses[size]}`}
                title={isTTS ? "朗读文本" : "播放音频"}
            >
                <span className="relative text-2xl group-hover:scale-110 transition-transform duration-300">
                    {isPlaying ? <FaPause className={`${iconSizeClasses[size]}`} /> : <FaPlay className={`${iconSizeClasses[size]}`} />}
                </span>
            </button>

            <audio
                autoPlay={true}
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setIsPlaying(false)}
            />
        </>
    );
} 