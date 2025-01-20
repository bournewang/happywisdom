import { useState, useEffect } from 'react'
import { Player } from './common/Player'

interface NurseryRhyme {
    id: number;
    title: string;
    audioUrl: string;
    image?: string;
    content: string;
}

export function NurseryRhymePlayer() {
    const [rhymeList, setRhymeList] = useState<NurseryRhyme[]>([]);

    useEffect(() => {
        import('../assets/nursery-rhyme.json')
            .then(module => {
                setRhymeList(module.default);
            })
            .catch(error => {
                console.error('Error loading nursery rhymes:', error);
            });
    }, []);

    return rhymeList.length > 0 && (
        <Player
            itemList={rhymeList}
            renderItem={(rhyme) => ({
                title: rhyme.title,
                content: <div className="text-center">{rhyme.content}</div>,
                audioSource: rhyme.audioUrl,
                backgroundImage: rhyme.image || '/images/nursery-rhyme.jpg'
            })}
            isTTS={false}
            size="medium"
        />
    );
} 