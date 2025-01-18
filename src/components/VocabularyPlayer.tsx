import { useState, useEffect } from 'react'
import Vocabulary from './Vocabulary'

export function VocabularyPlayer() {
  const [vocabularyData, setVocabularyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dynamic import - only loads when VocabularyPlayer is mounted
    import('../assets/中考英语词汇表.json')
      .then(module => {
        setVocabularyData(module.default);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading vocabulary:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <div className="">
      <Vocabulary words={vocabularyData} />
    </div>
  );
} 