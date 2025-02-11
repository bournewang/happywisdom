import { useState, useEffect, useRef, ReactNode } from 'react';
import { useSwipeable } from 'react-swipeable';

export interface MediaItem {
    title: string;
    videoUrl?: string;  // For videos
    audioUrl?: string;  // For audios

    // for poem
    author?: string;
    content?: string;
    paragraphs?: string[];
    image?: string;
}

interface MediaPlayerProps {
    category: string;
    jsonPath: string;
    renderMedia: (currentMedia: MediaItem, mediaRef: React.RefObject<HTMLVideoElement | HTMLAudioElement>) => ReactNode;
    type: 'video' | 'audio';
}

export function MediaPlayer({ category, jsonPath, renderMedia, type }: MediaPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

    useEffect(() => {
        import(jsonPath)
            .then(module => {
                setMediaList(module.default);
                const savedIndex = localStorage.getItem(`currentVideoIndex_${category}`);
                if (savedIndex) {
                    setCurrentIndex(parseInt(savedIndex, 10));
                }
            })
            .catch(error => {
                console.error('Error loading media list:', error);
            });
    }, [jsonPath, category]);

    useEffect(() => {
        if (mediaList.length > 0) {
            localStorage.setItem(`currentVideoIndex_${category}`, currentIndex.toString());
        }
    }, [currentIndex, category, mediaList]);

    useEffect(() => {
        if (mediaRef.current) {
            mediaRef.current.load();
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
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    if (mediaList.length === 0) {
        return <div>No media available</div>;
    }

    const currentMedia = mediaList[currentIndex];

    return (
        <div {...swipeHandlers} className="flex flex-col items-center justify-center h-full">
            {/* <div className="flex flex-col justify-center w-full max-w-3xl"> */}
            <div className="flex-grow flex items-center justify-center">
                {renderMedia(currentMedia, mediaRef)}
            </div>
            <div className="flex-none text-center p-4">
                <h1 className="text-2xl font-bold mb-2">{currentMedia.title}</h1>
                <p className="text-gray-500">上下滑动可切换</p>
            </div>
            {/* </div> */}
        </div>
    );
} 