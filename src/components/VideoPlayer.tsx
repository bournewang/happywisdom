import { Player } from './common/Player';

interface Video {
    video: string;
}

interface VideoPlayerProps {
    videoList: Video[];
}

export function VideoPlayer({ videoList }: VideoPlayerProps) {
    return videoList.length > 0 && (
        <Player
            itemList={videoList}
            renderItem={(item) => ({
                content: (
                    <div className="fixed inset-0 w-full h-full bg-black">
                        <video
                            src={item.video}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain"
                        />
                    </div>
                ),
                backgroundImage: '/images/video-bg.jpg'
            })}
            size="medium"
        />
    );
} 