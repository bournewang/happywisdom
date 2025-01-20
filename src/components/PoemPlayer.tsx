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
  const [poemList, setPoemList] = useState<Poem[]>([]);

  useEffect(() => {
    import('../assets/poems.json')
      .then(module => {
        setPoemList(module.default);
      })
      .catch(error => {
        console.error('Error loading poems:', error);
      });
  }, []);

  return poemList.length > 0 && (
    <Player
      itemList={poemList}
      renderItem={(poem) => ({
        title: poem.title,
        subtitle: `${poem.author}`,
        content: (
          <>
            <div className={`${poem.paragraphs[0].length > 10 ? 'text-xl' : ''}`}>
              {poem.paragraphs.map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            {poem.notes?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-amber-200 mb-2">注释：</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  {poem.notes.map((note: string, index: number) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ),
        audioSource: poem.paragraphs.join('。'),
        backgroundImage: poem.image || '/images/poem.jpg'
      })}
      isTTS={true}
    />
  );
} 