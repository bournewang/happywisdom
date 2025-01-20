import { useState } from 'react';
import { Player } from './common/Player';
import bibleVerses from '../assets/bible.json';

interface BibleVerse {
    chapter: string;
    verse: string;
    content: string;
    image?: string;
}

export function ChristPlayer() {
    const [currentVerse] = useState<BibleVerse>(() => {
        const verse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
        return {
            chapter: verse.chapter,
            verse: verse.verse,
            content: verse.content,
            image: verse.image || undefined
        };
    });

    const images = ['/images/bible/耶稣.jpg', 
            '/images/bible/耶稣2.jpg',
             "/images/bible/耶稣3.jpg", 
             "/images/bible/耶稣4.jpg"
        ]

    return (
        <Player
            title={currentVerse.chapter}
            subtitle={currentVerse.verse}
            backgroundImage={currentVerse.image || images[Math.floor(Math.random() * images.length)]}
            audioSource={currentVerse.content}
            isTTS={true}
            content={
                <>
                    {currentVerse.content}
                </>
            }
        />
    );
} 