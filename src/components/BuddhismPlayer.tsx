import { useState, useEffect } from 'react'
import { Player } from './common/Player'

interface BuddhismVerse {
    title: string;
    content: string;
    audioUrl: string;
    image?: string;
}

export function BuddhismPlayer() {
    const [verseList, setVerseList] = useState<BuddhismVerse[]>([]);

    useEffect(() => {
        import('../assets/buddhism.json')
            .then(module => {
                setVerseList(module.default);
            })
            .catch(error => {
                console.error('Error loading buddhism verses:', error);
            });
    }, []);

    return verseList.length > 0 && (
        <Player
            itemList={verseList}
            renderItem={(verse) => ({
                title: verse.title,
                // subtitle: verse.source,
                content: <>
                    <div className="text-center">{verse.content}</div>
                </>,
                audioSource: verse.audioUrl,
                backgroundImage: verse.image || '/images/buddhism.jpg'
            })}
            isTTS={false}
            size="medium"
        />
    );
} 