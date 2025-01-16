import { useState, useEffect, useRef } from 'react'
import './App.css'

interface ChantTrack {
  id: number;
  title: string;
  audioUrl: string;
  description: string;
  imageUrl: string;
}

function App() {
  const [currentTrack, setCurrentTrack] = useState<ChantTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const chants: ChantTrack[] = [
    {
      id: 1,
      title: "唵嘛呢叭咪吽大明咒",
      audioUrl: "/唵嘛呢叭咪吽大明咒.mp3",
      description: "六字大明咒，是观世音菩萨的心咒，具有无量功德",
      imageUrl: "/images/om-mani.jpg"
    },
    {
      id: 2,
      title: "梵音大悲咒",
      audioUrl: "/梵音大悲咒.mp3",
      description: "大悲咒是观世音菩萨的根本咒语，具有不可思议的力量",
      imageUrl: "/images/avalokiteshvara.jpg"
    },
    {
      id: 3,
      title: "地藏王菩萨超度心咒",
      audioUrl: "/地藏王菩萨超度心咒.mp3",
      description: "地藏菩萨的心咒，大愿地藏王，誓度众生",
      imageUrl: "/images/ksitigarbha.jpg"
    },
    {
      id: 4,
      title: "消灾吉祥神咒",
      audioUrl: "/消灾吉祥神咒.mp3",
      description: "消除灾难，带来吉祥的佛教咒语",
      imageUrl: "/images/auspicious.jpg"
    },
    {
      id: 5,
      title: "文殊师利祈请颂",
      audioUrl: "/文殊师利祈请颂-莫尔根.mp3",
      description: "祈请大智文殊师利菩萨的庄严颂词",
      imageUrl: "/images/manjushri.jpg"
    },
    {
      id: 6,
      title: "般若波罗蜜多心经",
      audioUrl: "/般若菠萝蜜多心经诵读.mp3",
      description: "佛教最精髓的经典之一，诠释空性智慧",
      imageUrl: "/images/heart-sutra.jpg"
    }
  ];

  useEffect(() => {
    if (chants.length > 0) {
      const randomTrack = chants[Math.floor(Math.random() * chants.length)];
      setCurrentTrack(randomTrack);
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const handleEnded = () => {
    const nextTrack = chants[Math.floor(Math.random() * chants.length)];
    setCurrentTrack(nextTrack);
  };

  const togglePlay = () => {
    if (isFirstVisit) {
      setIsFirstVisit(false);
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-end p-4 md:p-8 transition-all duration-1000"
      style={{
        backgroundImage: currentTrack 
          ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url('${currentTrack.imageUrl}')`
          : 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))'
      }}
    >
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          autoPlay
          playsInline
          muted={false}
          onCanPlay={() => {
            console.log("onCanPlay === ");
            if (audioRef.current) {
              audioRef.current.play().catch(console.error);
            }
          }}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
          className="fixed bottom-0 left-0 w-full hidden"
        />
      )}

      <div className="w-full max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">
          佛教音乐
        </h1>
        
        {currentTrack && (
          <div className="backdrop-blur-sm bg-black/20 rounded-xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-amber-200">
              {currentTrack.title}
            </h2>
            
            <div className="mb-6">
              <button
                onClick={togglePlay}
                className="w-full md:w-auto px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-600 
                         text-gray-900 font-medium transition-all duration-300 
                         transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                {isFirstVisit ? '开始聆听' : (isPlaying ? '⏸️ 暂停' : '▶️ 播放')}
              </button>
            </div>
            
            <div className="text-gray-100 leading-relaxed">
              <p className="text-base md:text-lg">{currentTrack.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
