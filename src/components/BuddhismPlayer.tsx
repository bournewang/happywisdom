import { useState, useEffect } from 'react'
import { config } from '../config'
import { Audio } from './common/Audio'

interface BuddhismTrack {
  id: number;
  title: string;
  audioUrl: string;
  description: string;
  imageUrl: string;
}

export function BuddhismPlayer() {
  const [currentTrack, setCurrentTrack] = useState<BuddhismTrack | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<BuddhismTrack[]>([]);
//   const audioRef = useRef<HTMLAudioElement>(null);

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

//   const refreshSong = () => playRandomTrack();


  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-center p-4 md:p-8 transition-all duration-1000"
      style={{
        backgroundImage: currentTrack 
          ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3)), url('${currentTrack.imageUrl}')`
          : 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4))'
      }}
    >
      <div className="w-full max-w-3xl mx-auto ">
        {currentTrack && (
          <div className="bg-black/50 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-4 mb-4 text-center ">
              <h2 className="text-2xl md:text-2xl font-semibold text-amber-200 flex-1">
                {currentTrack.title}
              </h2>
            </div>
            
            <div className="text-2xl rounded-2xl p-5 ">
              <p className="text-white leading-relaxed">
                {currentTrack.description}
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 ">
              <Audio source={currentTrack.audioUrl} />
            </div>            
          </div>
        )}
      </div>
    </div>
  );
} 