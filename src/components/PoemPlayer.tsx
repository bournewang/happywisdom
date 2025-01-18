import { useState, useEffect } from 'react'
import { Audio } from './common/Audio'
import { config } from '../config'

interface Poem {
  id?: number;
  title: string;
  author: string;
  dynasty: string;
  paragraphs: string[];
  notes: string[];
  imageUrl: string;
}

export function PoemPlayer() {
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null);
  const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    fetch(`${config.serverUrl}/assets/poem.json`)
      .then(response => response.json())
      .then(data => {
        setPoems(data);
        nextPoem(data);
      });
  }, []);

  const nextPoem = (poemList: Poem[] = poems) => {
    if (poemList.length > 0) {
      const newIndex = Math.floor(Math.random() * poemList.length);
      const randomPoem = poemList[newIndex];
      setCurrentPoem(randomPoem);
    }
  };

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
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${currentPoem?.imageUrl || '/images/poem.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-3xl">
        {currentPoem && (
          <div className="backdrop-blur-sm bg-black/20 rounded-xl p-4 shadow-2xl border border-white/10">
            <div className="mb-6 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-amber-200">
                {currentPoem.title}
              </h2>
              <p className="text-gray-300">
                {currentPoem.dynasty} · {currentPoem.author}
              </p>
            </div>
            
            <div className="space-y-4 text-gray-100">
                {/* if the first paragraphs item length > 10, then show the text size to xl */}
              <div className={` md:text-xl leading-relaxed space-y-2 ${currentPoem.paragraphs[0].length > 12 ? 'text-xl' : 'text-2xl'}`}>
                {currentPoem.paragraphs.map((line, index) => (
                  <p key={index} className="text-center">{line}</p>
                  
                ))}
              </div>
              
              {currentPoem.notes && currentPoem.notes.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-amber-200 mb-2">注释：</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {currentPoem.notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-4">
            {currentPoem && <Audio source={getFullText(currentPoem)} isTTS={true} />}
        </div>
      </div>

      <div className="fixed bottom-8 flex justify-center gap-4">
        {/* <button
          onClick={() => nextPoem()}
          className="group px-6 py-3 rounded-full 
                  bg-gradient-to-r from-amber-500/50 to-amber-600/50
                  hover:from-amber-400 hover:to-amber-500
                  text-white font-medium 
                  transform hover:scale-105 active:scale-95
                  transition-all duration-300 ease-in-out
                  shadow-lg hover:shadow-amber-500/50
                  backdrop-blur-sm
                  flex items-center gap-2"
        >
          <span>换一首</span>
          <span className="text-xl">🔄</span>
        </button> */}

      </div>
    </div>
  );
} 