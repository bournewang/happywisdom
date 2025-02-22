import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FaSpinner } from 'react-icons/fa';
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
    const videoRef = useRef<HTMLVideoElement>(null);

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

    const handleSwipeUp = () => {
        if (historyPosition < history.length - 1) {
            // Navigate forward in history
            setHistoryPosition(prev => prev + 1);
            setCurrentIndex(history[historyPosition + 1]);
        } else {
            // At the end of history, generate random index and add to history
            const newIndex = Math.floor(Math.random() * mediaList.length);
            setCurrentIndex(newIndex);
            setHistory(prev => [...prev, newIndex]);
            setHistoryPosition(prev => prev + 1);
        }
    };

    const handleSwipeDown = () => {
        if (historyPosition > 0) {
            // Navigate back in history
            setHistoryPosition(prev => prev - 1);
            setCurrentIndex(history[historyPosition - 1]);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedUp: handleSwipeUp,
        onSwipedDown: handleSwipeDown,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    if (mediaList.length === 0) {
        return (<div className="flex items-center justify-center h-full">
            <FaSpinner className="animate-spin text-white" />
            </div>);
    }

    const currentVideo = mediaList[currentIndex];

    return (
        <div {...swipeHandlers} className="flex flex-col h-full">
            <div className="h-[78vh] items-center justify-center">
                <video
                    ref={videoRef}
                    controls
                    className="w-full h-full object-contain"
                    playsInline={true}
                    autoPlay={true}
                    poster={currentVideo.image ? config.imagePrefix + currentVideo.image : undefined}
                >
                    <source src={config.meidaPrefix + currentVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="h-[10vh] w-full bg-black/50 text-white p-2 text-center">
                <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
                <p className="">上下滑动可切换</p>
            </div>
        </div>
    );
} 