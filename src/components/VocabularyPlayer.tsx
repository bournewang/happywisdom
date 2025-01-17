// import { useState, useEffect, useRef } from 'react'
// import { config } from '../config'
import Vocabulary from './Vocabulary'
import vocabularyData from '../assets/中考英语词汇表.json'

// interface VocabularyTrack {
//   id: number;
//   title: string;
//   audioUrl: string;
//   description: string;
//   imageUrl: string;
//   words?: string[];  // Add specific vocabulary properties
// }

export function VocabularyPlayer() {
  // Similar structure but with vocabulary-specific features
  // Add word list display, repeat options, etc.
  return (
    <div className="">
      <Vocabulary words={vocabularyData} />
    </div>
  );
} 