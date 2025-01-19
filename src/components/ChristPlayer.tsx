import { useState } from 'react';
import { Player } from './common/Player';
import bibleVerses from '../assets/bible.json';

interface BibleVerse {
    chapter: string;
    verse: string;
    content: string;
}

export function ChristPlayer() {
    const [currentVerse] = useState<BibleVerse>(() => {
        return bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    });

    return (
        <Player
            title={currentVerse.chapter}
            subtitle={currentVerse.verse}
            backgroundImage="/images/christ.jpg"
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