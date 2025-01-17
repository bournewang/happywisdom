import { useState, useEffect, useRef } from 'react'
import { config } from '../config'

interface BuddhismTrack {
  id: number;
  title: string;
  audioUrl: string;
  description: string;
  imageUrl: string;
}

export function BuddhismPlayer() {
  const [currentTrack, setCurrentTrack] = useState<BuddhismTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<BuddhismTrack[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch(`${config.serverUrl}${config.endpoints.songs}`)
      .then(response => response.json())
      .then(data => {
        const buddhismTracks = data.tracks
        //   .filter((track: any) => track.category === 'buddhism')
          .map((track: any) => ({
            id: track.id,
            title: track.title,
            audioUrl: `${config.audioUrl}${track.audioUrl}`,
            description: track.description,
            imageUrl: `${track.imageUrl}`,
          }));
        setTracks(buddhismTracks);
        playRandomTrack(buddhismTracks);
      });
  }, []);

  const playRandomTrack = (trackList: BuddhismTrack[] = tracks) => {
    if (trackList.length > 0) {
      const randomTrack = trackList[Math.floor(Math.random() * trackList.length)];
      setCurrentTrack(randomTrack);
    }
  };

  const handleEnded = () => playRandomTrack();
  const refreshSong = () => playRandomTrack();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-end p-4 md:p-8 transition-all duration-1000"
      style={{
        backgroundImage: currentTrack 
          ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3)), url('${currentTrack.imageUrl}')`
          : 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4))'
      }}
    >
      <div className="w-full max-w-3xl mx-auto">
        {currentTrack && (
          <div className="backdrop-blur-md bg-white/30 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={currentTrack.imageUrl} 
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex-1">
                {currentTrack.title}
              </h2>
            </div>
            
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={togglePlay}
                className="group relative px-8 py-3 rounded-full 
                        bg-gradient-to-r from-amber-400/90 to-amber-500/90
                        hover:from-amber-400 hover:to-amber-500
                        text-white font-medium 
                        transform hover:scale-105 active:scale-95
                        transition-all duration-300 ease-in-out
                        shadow-lg hover:shadow-amber-500/30
                        flex items-center gap-3"
              >
                <span className="text-2xl">{isPlaying ? '⏸' : '▶️'}</span>
                <span>{isPlaying ? '暂停' : '播放'}</span>
              </button>

              <button
                onClick={refreshSong}
                className="p-3 rounded-full 
                        bg-white/50 hover:bg-white/70
                        transform hover:scale-105 active:scale-95
                        transition-all duration-300 ease-in-out
                        shadow-lg hover:shadow-amber-500/20
                        flex items-center justify-center
                        w-12 h-12"
                title="换首歌"
              >
                <span className="text-xl">🔄</span>
              </button>
            </div>
            
            <div className="bg-white/40 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-gray-700 leading-relaxed">
                {currentTrack.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          autoPlay
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
          className="fixed bottom-0 left-0 w-full hidden"
        />
      )}
    </div>
  );
} 