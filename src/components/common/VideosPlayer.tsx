import { MediaPlayer, MediaItem } from './MediaPlayer';
// import type { VideoVerse } from './types';
import { config } from '../../config';

interface VideosPlayerProps {
    category: string;
    jsonPath: string;
}

export function VideosPlayer({ category, jsonPath }: VideosPlayerProps) {
    const renderVideo = (currentVideo: MediaItem, videoRef: React.RefObject<HTMLVideoElement>) => (
        <>
            {/* <div className="flex-grow flex items-center justify-center"> */}
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
            {/* </div> */}
            {/* <div className="flex-none text-center p-4">
                <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
                <p className="text-gray-500">上下滑动可切换</p>
            </div> */}

        </>

    );

    return (
        <MediaPlayer
            category={category}
            jsonPath={jsonPath}
            renderMedia={renderVideo}
        />
    );
} 