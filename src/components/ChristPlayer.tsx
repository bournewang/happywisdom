import { useState } from 'react';
import { Audio } from './common/Audio';
import bibleVerses from '../assets/bible.json';

interface BibleVerse {
    content: string;
    verse: string;
}

export function ChristPlayer() {
    const [currentVerse] = useState<BibleVerse>(() => {
        return bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    });

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-center p-4 md:p-8"
            style={{
                backgroundImage: `url('/images/bible.jpg')`
            }}
        >
            <div className="w-full max-w-3xl mx-auto">
                <div className="bg-black/50 rounded-3xl p-6 md:p-8 text-white">
                    <h2 className="text-2xl md:text-2xl font-semibold text-amber-200 text-center mb-4">
                        {currentVerse.verse}
                    </h2>
                    
                    <div className="rounded-2xl p-5">
                        <p className="leading-relaxed text-2xl md:text-3xl">
                            {currentVerse.content}
                        </p>
                    </div>

                    <div className="flex items-center justify-center mt-4 gap-4">
                        <Audio source={currentVerse.content} isTTS={true} />
                    </div>
                </div>
            </div>
        </div>
    );
} 