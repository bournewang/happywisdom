import { ReactNode, useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaSync } from 'react-icons/fa';
import { ttsUrl } from '../../api/tts';

interface PlayerProps {
    itemList: any[];
    renderItem: (item: any) => {
        title?: string;
        subtitle?: string;
        content: ReactNode;
        audioSource?: string;
        backgroundImage?: string;
    };
    isTTS?: boolean;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    actions?: ReactNode;
}

export function Player({ 
    itemList,
    renderItem,
    isTTS = false,
    className = '',
    size = 'medium',
    actions
}: PlayerProps) {
    const [currentItem, setCurrentItem] = useState(itemList[Math.floor(Math.random() * itemList.length)]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const refreshContent = () => {
        const newItem = itemList[Math.floor(Math.random() * itemList.length)];
        setCurrentItem(newItem);
    };

    const rendered = renderItem(currentItem);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = isTTS ? ttsUrl(rendered.audioSource || '') : (rendered.audioSource || '');
        }
    }, [rendered.audioSource, isTTS]);

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
        small: 'text-sm w-10 h-10',
        medium: 'text-base w-14 h-14',
        large: 'text-lg w-20 h-20'
    }

    const iconSizeClasses = {
        small: 'text-lg',
        medium: 'text-2xl',
        large: 'text-3xl'
    }

    return (
        <div className="relative flex flex-col min-h-screen">
            {/* Content Section - Top */}
            <div className=" relative z-10 flex-1 flex flex-col justify-start pt-2">
                <div className={` max-w-3xl ${className}`}>
                    <div className="bg-black/10 rounded-xl p-2 md:p-8 shadow-2xl  border-white/10">
                        {(rendered.title || rendered.subtitle) && (
                            <div className="mb-2 text-center">
                                {rendered.title && (
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-amber-200 
                                        tracking-wide drop-shadow-lg">
                                        {rendered.title}
                                    </h1>
                                )}
                                {rendered.subtitle && (
                                    <h2 className="text-lg md:text-xl text-gray-300 
                                        tracking-wider font-medium">
                                        {rendered.subtitle}
                                    </h2>
                                )}
                            </div>
                        )}
                        
                        <div className="text-white text-2xl md:text-xl leading-relaxed text-center space-y-2">
                            {rendered.content}
                        </div>

                        {(rendered.audioSource || actions) && (
                            <div className="flex items-center justify-center gap-4 mt-2">
                                {rendered.audioSource && (
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
                                                ${sizeClasses[size]}`}
                                            title={isTTS ? "朗读文本" : "播放音频"}
                                        >
                                            <span className="relative group-hover:scale-110 transition-transform duration-300">
                                                {isPlaying ? 
                                                    <FaPause className={iconSizeClasses[size]} /> : 
                                                    <FaPlay className={iconSizeClasses[size]} />
                                                }
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
                                )}
                                {actions}
                                <button 
                                    className={`relative rounded-full pl-1 bg-gradient-to-r from-blue-500/80 to-cyan-400/80 
                                        transform hover:scale-105 active:scale-95 
                                        transition-all duration-300 ease-in-out 
                                        shadow-lg hover:shadow-cyan-500/30 hover:from-blue-400 hover:to-cyan-300 
                                        text-white font-medium
                                        flex items-center justify-center text-center
                                        group
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        ${sizeClasses[size]}`}
                                    onClick={refreshContent}
                                >
                                    <span className={`relative ${iconSizeClasses[size]} group-hover:scale-110 transition-transform duration-300`}>
                                        <FaSync className={iconSizeClasses[size]} />
                                    </span>
                                </button>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

            {/* Background Image - Bottom 2/3 */}
            <div className="absolute bottom-0 left-0 w-full h-2/3">
                <img 
                    src={rendered.backgroundImage}
                    alt="background"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
} 