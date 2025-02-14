import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
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
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        loadJson(jsonPath)
            .then(data => {
                setMediaList(data);
                const savedIndex = localStorage.getItem(`currentVideoIndex_${category}`);
                if (savedIndex) {
                    setCurrentIndex(parseInt(savedIndex, 10));
                }
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
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : mediaList.length - 1));
    };

    const handleSwipeDown = () => {
        setCurrentIndex((prevIndex) => (prevIndex < mediaList.length - 1 ? prevIndex + 1 : 0));
    };

    const swipeHandlers = useSwipeable({
        onSwipedUp: handleSwipeUp,
        onSwipedDown: handleSwipeDown,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    if (mediaList.length === 0) {
        return <div>No media available</div>;
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