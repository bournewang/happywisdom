import { useState, useEffect, useRef } from 'react';
import { FaSpinner, FaPlay, FaPause, FaSync } from 'react-icons/fa';
import { loadJson } from '../../utils/loadJson';
import { config } from '../../config';
import { VideoVerse } from './types';

interface VideosPlayerProps {
    category: string;
    jsonPath: string;
}

export function VideosPlayer({ category, jsonPath }: VideosPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mediaList, setMediaList] = useState<VideoVerse[]>([]);
    const [history, setHistory] = useState<number[]>([]);
    const [historyPosition, setHistoryPosition] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const touchStartY = useRef<number>(0);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        loadJson(jsonPath)
            .then(data => {
                setMediaList(data);
                const savedIndex = localStorage.getItem(`currentVideoIndex_${category}`);
                const initialIndex = savedIndex ? parseInt(savedIndex, 10) : 0;
                setCurrentIndex(initialIndex);
                setHistory([initialIndex]);
                setHistoryPosition(0);
            })
            .catch(error => {
                console.error('Error loading items:', error);
            });
    }, [jsonPath, category]);

    useEffect(() => {
        if (mediaList.length > 0) {
            localStorage.setItem(`currentVideoIndex_${category}`, currentIndex.toString());
        }
    }, [currentIndex, category, mediaList]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [currentIndex]);

    useEffect(() => {
        if (showControls) {
            const timer = setTimeout(() => {
                setShowControls(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showControls]);

    const togglePlay = async () => {
        if (!videoRef.current) return;

        try {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                await videoRef.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Audio playback error:', error);
            setIsPlaying(false);
        }
    };

    const handleSwipeUp = () => {
        if (historyPosition < history.length - 1) {
            setHistoryPosition(prev => prev + 1);
            setCurrentIndex(history[historyPosition + 1]);
        } else {
            const newIndex = Math.floor(Math.random() * mediaList.length);
            setCurrentIndex(newIndex);
            setHistory(prev => [...prev, newIndex]);
            setHistoryPosition(prev => prev + 1);
        }
    };

    const handleSwipeDown = () => {
        if (historyPosition > 0) {
            setHistoryPosition(prev => prev - 1);
            setCurrentIndex(history[historyPosition - 1]);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchEndY - touchStartY.current;

        // Minimum swipe distance threshold
        if (Math.abs(deltaY) > 50) {
            if (deltaY < 0) {
                handleSwipeUp();
            } else {
                handleSwipeDown();
            }
        }
    };

    const handleVideoClick = () => {
        setShowControls(true);
    };

    if (mediaList.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <FaSpinner className="animate-spin text-white" />
            </div>
        );
    }

    const currentVideo = mediaList[currentIndex];

    return (
        <div className="flex flex-col h-full relative" >
            {/* Swipe overlay areas */}
            <div
                className="absolute top-0 left-0 w-full h-full z-10"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={handleVideoClick}
            >
                <div className="flex flex-col justify-center w-full h-full ">
                    <div className={`flex items-center justify-center gap-4 mt-6 z-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
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
                            text-base w-14 h-14
                            `}
                        >
                            <span className="relative group-hover:scale-110 transition-transform duration-300">
                                {isPlaying ?
                                    <FaPause className='text-2xl ' /> :
                                    <FaPlay className='text-2xl' />
                                }
                            </span>
                        </button>
                        <button
                            className={`relative rounded-full pl-1 bg-gradient-to-r from-blue-500/80 to-cyan-400/80 
                                transform hover:scale-105 active:scale-95 
                            transition-all duration-300 ease-in-out 
                            shadow-lg hover:shadow-cyan-500/30 hover:from-blue-400 hover:to-cyan-300 
                            text-white font-medium
                            flex items-center justify-center text-center
                            group
                            disabled:opacity-50 disabled:cursor-not-allowed
                            text-base w-14 h-14`}
                            onClick={handleSwipeUp}
                        >
                            <span className={`relative text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                <FaSync />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Video container */}
            <div className="h-[78vh] items-center justify-center relative">
                <video
                    ref={videoRef}
                    // controls
                    className="w-full h-full object-contain"
                    playsInline={true}
                    autoPlay={true}
                    onPlay={() => setIsPlaying(true)}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setIsPlaying(false)}
                    poster={currentVideo.image ? config.imagePrefix + currentVideo.image : undefined}
                >
                    <source src={config.meidaPrefix + currentVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Visual indicators */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="h-1/3 w-full bg-gradient-to-b from-black/20 to-transparent opacity-50"></div>
                <div className="h-1/3"></div>
                <div className="h-1/3 w-full bg-gradient-to-t from-black/20 to-transparent opacity-50"></div>
            </div>

            {/* Title bar */}
            <div className="h-[10vh] w-full bg-black/50 text-white p-2 text-center">
                <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
                <p className="">上下滑动可切换</p>
            </div>
        </div>
    );
} 