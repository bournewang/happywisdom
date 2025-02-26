import { useState, useEffect, useRef } from 'react';
import { SwipeContainer } from './SwipeContainer';
import { loadJson } from '../../utils/loadJson';
import { config } from '../../config';

export interface VideoItem {
    title: string;
    videoUrl: string;
}

interface VideoPlayerProps {
    category: string;
    jsonPath: string;
}

export function VideoPlayer({ category, jsonPath }: VideoPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoList, setVideoList] = useState<VideoItem[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        loadJson(jsonPath)
            .then(data => {
                setVideoList(data);
                const savedIndex = localStorage.getItem(`currentVideoIndex_${category}`);
                if (savedIndex) {
                    setCurrentIndex(parseInt(savedIndex, 10));
                }
            })
            .catch(error => {
                console.error('Error loading videos:', error);
            });   
    }, [jsonPath, category]);

    useEffect(() => {
        if (videoList.length > 0) {
            localStorage.setItem(`currentVideoIndex_${category}`, currentIndex.toString());
        }
    }, [currentIndex, category, videoList]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videoList.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < videoList.length - 1 ? prevIndex + 1 : 0));
    };

    if (videoList.length === 0) {
        return <div>No videos available</div>;
    }

    const currentVideo = videoList[currentIndex];

    return (
        <SwipeContainer
            onSwipeUp={handlePrev}
            onSwipeDown={handleNext}
            className="flex flex-col h-full"
        >
            <div className="h-[78vh] items-center justify-center">
                <video
                    ref={videoRef}
                    controls
                    className="w-full h-full object-contain"
                    playsInline={true}
                    autoPlay={true}
                >
                    <source src={config.meidaPrefix + currentVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="h-[10vh] w-full bg-black/50 text-white p-2 text-center">
                <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
                {/* <p className="">上下滑动可切换</p> */}
            </div>
        </SwipeContainer>
    );
} 