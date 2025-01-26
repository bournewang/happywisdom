import { useState, useEffect } from 'react'
import { Player } from './common/Player'

interface OperaVerse {
    title: string;
    content?: string;
    paragraphs?: string[];
    audioUrl: string;
    image: string;
    scrollDelay?: number;
}

export function OperaPlayer() {
    const [verseList, setVerseList] = useState<OperaVerse[]>([]);

    useEffect(() => {
        import('../assets/opera.json')
            .then(module => {
                setVerseList(module.default);
            })
            .catch(error => {
                console.error('Error loading opera verses:', error);
            });
    }, []);

    return verseList.length > 0 && (
        <Player
            itemList={verseList}
            renderItem={(verse: OperaVerse) => ({
                title: verse.title,
                content: (
                    <div className="text-center">
                        {verse.content && (
                            <div className="whitespace-pre-line">{verse.content}</div>
                        )}
                        {verse.paragraphs?.map((paragraph: string, index: number) => (
                            <div key={index} className="whitespace-pre-line mb-4">{paragraph}</div>
                        ))}
                    </div>
                ),
                audioSource: verse.audioUrl,
                backgroundImage: verse.image
            })}
            isTTS={false}
            size="medium"
        />
    );
} 