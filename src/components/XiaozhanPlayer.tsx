import { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';

interface Video {
    video: string;
}

export function XiaozhanPlayer() {
    const [videoList, setVideoList] = useState<Video[]>([]);

    useEffect(() => {
        import('../assets/xiaozhan.json')
            .then(module => {
                setVideoList(module.default);
            })
            .catch(error => {
                console.error('Error loading videos:', error);
            });
    }, []);

    return <VideoPlayer videoList={videoList} />;
} 