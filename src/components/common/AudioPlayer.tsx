import { ReactNode, useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaSync } from 'react-icons/fa';
import { ttsUrl } from '../../api/tts';
import { config } from '../../config';
import type { AudioVerse } from './types';
import { SwipeContainer } from './SwipeContainer';
import { loadJson } from '../../utils/loadJson';

interface PlayerProps {
    // itemList: any[];
    jsonPath: string;
    renderItem: (item: any) => {
        title?: string;
        subtitle?: string;
        content: ReactNode;
        audioSource?: string;
        backgroundImage?: string;
    };
    isTTS?: boolean;
    voice?: string;
    size?: 'small' | 'medium' | 'large';
    // position?: 'top' | 'middle' | 'bottom';
    actions?: ReactNode;
    showRefresh?: boolean;
}

export function AudioPlayer({
    // itemList,
    jsonPath,
    renderItem,
    isTTS = false,
    voice = 'zh-CN-XiaoxiaoNeural',
    size = 'medium',
    // position = 'middle',
    actions,
    showRefresh = true,
}: PlayerProps) {
    const [itemList, setItemList] = useState([]);
    const [currentItem, setCurrentItem] = useState<AudioVerse | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    // const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadJson(jsonPath)
            .then(items => {
                setItemList(items);
                setCurrentItem(items[Math.floor(Math.random() * items.length)]);
            })
            .catch(error => {
                console.error('Error loading items:', error);
            });
    }, [jsonPath]);

    useEffect(() => {
        if (itemList.length > 0) {
            setCurrentItem(itemList[currentIndex]);
        }
    }, [currentIndex]);


    const refreshContent = () => {
        const newItem = itemList[Math.floor(Math.random() * itemList.length)];
        setCurrentItem(newItem);
    };

    const rendered = renderItem(currentItem);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = isTTS ? ttsUrl(rendered.audioSource || '', voice) : (config.meidaPrefix + rendered.audioSource || '');
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
    const handleSwipeUp = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : itemList.length - 1));
    };

    const handleSwipeDown = () => {
        setCurrentIndex((prevIndex) => (prevIndex < itemList.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        currentItem && (
            <SwipeContainer
                onSwipeUp={handleSwipeUp}
                onSwipeDown={handleSwipeDown}
                className="w-full h-full overflow-hidden"
            >
                {/* Background Image Layer */}
                {/* implement background image */}
                <div
                    className="absolute w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${config.imagePrefix + rendered.backgroundImage})` }}
                />

                <div className='relative w-full h-full z-10 justify-center'>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center w-full max-w-3xl bg-black/50 ">
                            <div className="items-center justify-center p-4">

                                {/* <div className={`max-w-3xl ${className}`}> */}
                                <div className=" rounded-xl p-2 md:p-8 ">
                                    {(rendered.title || rendered.subtitle) && (
                                        <div className="mb-2 text-center">
                                            {rendered.title && (
                                                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-amber-200 
                                                    tracking-wide drop-shadow-lg">
                                                    {rendered.title}
                                                </h1>
                                            )}
                                            {rendered.subtitle && (
                                                <h2 className="text-lg md:text-xl text-white
                                                    tracking-wider font-medium">
                                                    {rendered.subtitle}
                                                </h2>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-center text-2xl drop-shadow-lg text-white">
                                    {rendered.content}
                                </div>

                                {(
                                    <div className="flex items-center justify-center gap-4 mt-6">
                                        {rendered.audioSource && !currentItem.videoUrl && (
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
                                                    ref={audioRef}
                                                    autoPlay={true}
                                                    onPlay={() => setIsPlaying(true)}
                                                    onEnded={() => setIsPlaying(false)}
                                                    onError={() => setIsPlaying(false)}
                                                />
                                            </>
                                        )}
                                        {actions}
                                        {showRefresh && (
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
                                                    <FaSync />
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </SwipeContainer>
        )
    );
} 