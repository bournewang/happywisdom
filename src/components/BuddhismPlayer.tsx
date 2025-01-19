import { useState, useEffect } from 'react'
import { config } from '../config'
import { Player } from './common/Player'

interface BuddhismTrack {
  id: number;
  title: string;
  audioUrl: string;
  description: string;
  imageUrl: string;
}

export function BuddhismPlayer() {
  const [currentTrack, setCurrentTrack] = useState<BuddhismTrack | null>(null);
//   const [tracks, setTracks] = useState<BuddhismTrack[]>([]);

  useEffect(() => {
    import('../assets/buddhism.json')
      .then(module => {
        const buddhismTracks: BuddhismTrack[] = module.default;
        const index = Math.floor(Math.random() * buddhismTracks.length)
        const audioUrl = `${config.audioUrl}${buddhismTracks[index].audioUrl}`
        const track = {
            ...buddhismTracks[index],
            audioUrl
        }
        setCurrentTrack(track);
      })
      .catch(error => {
        console.error('Error loading buddhism tracks:', error);
      });
  }, []);

  return (
    currentTrack && (
    <Player
      title={currentTrack.title}
      backgroundImage={currentTrack.imageUrl}
      audioSource={currentTrack.audioUrl}
      content={
        <>  
            {currentTrack.description}
        </>
      }
    />
    )
  );
} 