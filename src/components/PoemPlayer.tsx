import { useState, useEffect } from 'react'
import { config } from '../config'
import { textToSpeech } from '../api/tts'

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
    // const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);

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
        // const newIndex = currentIndex + 1;
        const newIndex = Math.floor(Math.random() * poemList.length);
      const randomPoem = poemList[newIndex]; //
      setCurrentPoem(randomPoem);
    //   setCurrentIndex(newIndex);
    }
  };

  const refreshPoem = () => nextPoem();

  const defaultBackgroundImage = "/images/common-bg.jpg";

  const getFullText = (track: Poem) => {
    const parts = [
        track.title,
        `${track.dynasty || ''} ${track.author || ''}`.trim(),
        ...(track.paragraphs || []),
        // track.description
    ];
    
    // Filter out empty strings and join with proper spacing
    return parts
        .filter(part => part && part.trim().length > 0)
        .join('。');
};

const playTTS = async () => {
    if (!currentPoem) return;
    
    try {
        setIsTTSPlaying(true);
        const fullText = getFullText(currentPoem);
        const audioBlob = await textToSpeech(fullText);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
            setIsTTSPlaying(false);
            URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
            console.error('Audio playback error');
            setIsTTSPlaying(false);
            URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
    } catch (error) {
        console.error('TTS error:', error);
        setIsTTSPlaying(false);
    }
};

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-between p-4 md:p-8 transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${currentPoem?.imageUrl || defaultBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-3xl mx-auto">
        {currentPoem && (
          <div className="backdrop-blur-sm bg-black/20 rounded-xl p-6 md:p-8 shadow-2xl border border-white/10">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-amber-200">
                {currentPoem.title}
              </h2>
              <p className="text-gray-300">
                {currentPoem.dynasty} · {currentPoem.author}
              </p>
            </div>
            
            <div className="space-y-4 text-gray-100">
              {/* Poem text */}
              <div className="text-lg md:text-xl leading-relaxed space-y-2">
                {currentPoem.paragraphs.map((line, index) => (
                  <p key={index} className="text-center">{line}</p>
                ))}
              </div>
              
              {/* Notes section if available */}
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
      </div>

      {/* Bottom button */}
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={refreshPoem}
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
        </button>

        <button
            onClick={playTTS}
            disabled={isTTSPlaying}
            className="p-3 rounded-full 
                    bg-white/50 hover:bg-white/70
                    transform hover:scale-105 active:scale-95
                    transition-all duration-300 ease-in-out
                    shadow-lg hover:shadow-amber-500/20
                    flex items-center justify-center
                    w-12 h-12
                    disabled:opacity-50 disabled:cursor-not-allowed"
            title="朗读文本"
        >
            <span className="text-xl">🔊</span>
        </button>        
      </div>
    </div>
  );
} 