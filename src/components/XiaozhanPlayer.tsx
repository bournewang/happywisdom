import { useState, useEffect } from 'react';
import { AudioPlayer } from './common/AudioPlayer';

interface XiaozhanItem {
    audioUrl: string;
    image: string;
}

// function getTimeBasedVoices(items: XiaozhanItem[]): XiaozhanItem[] {
//     const hour = new Date().getHours();

//     // Early morning (5-7)
//     if (hour >= 5 && hour < 8) {
//         return items.filter(item => item.audioUrl.includes('morning-call') && !item.audioUrl.includes('late'));
//     }

//     // Late morning (8)
//     if (hour === 8) {
//         return items.filter(item => item.audioUrl.includes('late-morning-call'));
//     }

//     // Work time (9-17)
//     if (hour >= 9 && hour < 18) {
//         return items.filter(item =>
//             item.audioUrl.includes('encourage') ||
//             item.audioUrl.includes('sweet') ||
//             item.audioUrl.includes('work') ||
//             item.audioUrl.includes('have-a-break')
//         );
//     }

//     // Night time (19-23)
//     if (hour >= 19 || hour < 5) {
//         return items.filter(item => item.audioUrl.includes('go-sleep'));
//     }

//     // Default: return all items
//     return items;
// }

export function XiaozhanPlayer() {
    const [items, setItems] = useState<XiaozhanItem[]>([]);

    useEffect(() => {
        import('../assets/xiaozhan.json')
            .then(module => {
                setItems(module.default);
            })
            .catch(error => {
                console.error('Error loading xiaozhan data:', error);
            });
    }, []);

    if (items.length === 0) return null;

    // const timeBasedItems = getTimeBasedVoices(items);

    return (
        <div className='w-full h-screen'>
            <AudioPlayer
                // itemList={timeBasedItems}
                jsonPath="../../assets/xiaozhan.json"
                renderItem={(item) => ({
                    title: item?.title,
                    content: <div className="text-center">{item?.content}</div>,
                    audioSource: item?.audioUrl,
                    backgroundImage: item?.image || 'nursery-rhyme.jpg'
                })}
                showRefresh={false}
                // position="middle"
                isTTS={false}
                size="medium"
            />
        </div>
    );
} 
