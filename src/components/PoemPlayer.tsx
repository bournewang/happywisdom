import { useState, useEffect } from 'react'
import { Player } from './common/Player'
// import { config } from '../config'

interface Poem {
  id?: number;
  title: string;
  author: string;
  paragraphs: string[];
//   notes: string[];
  image?: string;
}

export function PoemPlayer() {
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    import('../assets/poems.json')
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
      `${poem.author || ''}`.trim(),
      ...(poem.paragraphs || []),
    ];
    return parts
      .filter(part => part && part.trim().length > 0)
      .join('。');
  };

  return (
    currentPoem && <Player
      title={currentPoem.title}
      subtitle={`${currentPoem.author}`}
      backgroundImage={currentPoem.image || '/images/poem.jpg'}
      audioSource={getFullText(currentPoem)}
      isTTS={true}
      content={
        <>
        {/* if a line is too long, set a smaller font size */}
          <div className={`${currentPoem.paragraphs[0].length > 10 ? 'text-xl' : ''}`}>
            {currentPoem.paragraphs.map((line: string, index: number) => (
              <p key={index} >{line}</p>
            ))}
          </div>
        </>
      }
    />
  );
} 