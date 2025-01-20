import { useState, useEffect } from 'react'
import { Player } from './common/Player'

interface BuddhismVerse {
    title: string;
    content: string;
    paragraphs: string[];
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
                    {verse.content && <div className="text-center">{verse.content}</div>}
                    {verse.paragraphs && <div className="text-center text-lg">{verse.paragraphs.map((paragraph, index) => (
                        <div key={index}>{paragraph}</div>
                    ))}</div>}
                </>,
                audioSource: verse.audioUrl,
                backgroundImage: verse.image || '/images/buddhism.jpg'
            })}
            isTTS={false}
            size="medium"
        />
    );
} 