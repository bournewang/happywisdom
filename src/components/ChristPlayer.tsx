import { AudioPlayer } from './common/AudioPlayer';
import { config } from '../config/';

export function ChristPlayer() {
    const images = ['bible:耶稣.jpg',
        'bible:耶稣2.jpg',
        "bible:耶稣3.jpg",
        "bible:耶稣4.jpg"
    ]

    return (
        <div className='w-full h-screen'>
            <AudioPlayer
                // itemList={verseList}
                jsonPath="/assets/bible.json"
                renderItem={(verse) => ({
                    title: verse?.chapter,
                    subtitle: verse?.verse,
                    content: <>{verse?.content}</>,
                    audioSource: verse?.content,
                    backgroundImage: config.imagePrefix + (verse?.image || images[Math.floor(Math.random() * images.length)])
                })}
                isTTS={true}
                voice="zh-CN-YunjianNeural"
            />
        </div>
    )
} 