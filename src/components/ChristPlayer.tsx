import { useState, useEffect } from 'react';
import { Player } from './common/Player';

interface BibleVerse {
    chapter: string;
    verse: string;
    content: string;
    image?: string;
}

export function ChristPlayer() {
    const [verseList, setVerseList] = useState<BibleVerse[]>([]);

    const images = ['/images/bible/耶稣.jpg', 
            '/images/bible/耶稣2.jpg',
             "/images/bible/耶稣3.jpg", 
             "/images/bible/耶稣4.jpg"
        ]

    useEffect(() => {
        import('../assets/bible.json')
            .then(module => {
                setVerseList(module.default);
            })
            .catch(error => {
                console.error('Error loading bible verses:', error);
            });
    }, []);

    return verseList.length > 0 && (
        <Player
            itemList={verseList}
            renderItem={(verse) => ({
                title: verse.chapter,
                subtitle: verse.verse,
                content: <>{verse.content}</>,
                audioSource: verse.content,
                backgroundImage: verse.image || images[Math.floor(Math.random() * images.length)]
            })}
            isTTS={true}
        />
    );
} 