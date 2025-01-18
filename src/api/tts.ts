export const textToSpeech = async (text: string, voice?: string) => {
  const response = await fetch('https://azure-tts-worker.xiaopei0206.workers.dev/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, voice }),
  });

  if (!response.ok) {
    throw new Error('TTS request failed');
  }

  return response.blob();
};
