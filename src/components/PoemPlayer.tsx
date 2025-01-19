import { useState, useEffect } from 'react'
import { Player } from './common/Player'
// import { config } from '../config'

interface Poem {
  id?: number;
  title: string;
  author: string;
  dynasty: string;
  paragraphs: string[];
  notes: string[];
  imageUrl?: string;
}

export function PoemPlayer() {
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    import('../assets/poem.json')
      .then(module => {
        const poemList: Poem[] = module.default;
        // setPoems(poemList);
        const index = Math.floor(Math.random() * poemList.length)
        // setCurrentIndex(index);
        setCurrentPoem(poemList[index]);
      })
      .catch(error => {
        console.error('Error loading poem:', error);
      });
  }, []);

  const getFullText = (poem: Poem) => {
    const parts = [
      poem.title,
      `${poem.dynasty || ''} ${poem.author || ''}`.trim(),
      ...(poem.paragraphs || []),
    ];
    return parts
      .filter(part => part && part.trim().length > 0)
      .join('。');
  };

  return (
    currentPoem && <Player
      title={currentPoem.title}
      subtitle={`${currentPoem.dynasty} · ${currentPoem.author}`}
      backgroundImage={currentPoem.imageUrl || '/images/poem.jpg'}
      audioSource={getFullText(currentPoem)}
      isTTS={true}
      content={
        <>
          <div>
            {currentPoem.paragraphs.map((line: string, index: number) => (
              <p key={index} >{line}</p>
            ))}
          </div>
          {currentPoem.notes?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-amber-200 mb-2">注释：</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {currentPoem.notes.map((note: string, index: number) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      }
    />
  );
} 