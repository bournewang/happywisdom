import { useState, useEffect } from 'react'
import { Player } from './common/AudioPlayer'

interface BuddhismVerse {
    title: string;
    content: string;
    paragraphs?: string[];
    audioUrl: string;
    videoUrl: string;
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
            renderItem={(verse: BuddhismVerse) => ({
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
                videoUrl: verse.videoUrl,
                backgroundImage: verse.image
            })}            
            isTTS={false}
            size="medium"
        />
    );
} 