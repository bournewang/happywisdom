export const textToSpeech = async (text: string, voice: string = 'zh-CN-XiaoxiaoNeural') => {
  // Encode text and voice parameters
  const params = new URLSearchParams({
    text: encodeURIComponent(text),
    voice: encodeURIComponent(voice)
  });

  const response = await fetch(`https://azure-tts-worker.xiaopei0206.workers.dev/?${params}`, {
    method: 'GET',
    headers: {
      'Accept': 'audio/mp3',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TTS request failed: ${errorText}`);
  }

  return response.blob();
};


export const ttsUrl = (text: string) => {
  const params = new URLSearchParams({
    text: encodeURIComponent(text),
    // voice: encodeURIComponent(voice)
  });
  return `https://azure-tts-worker.xiaopei0206.workers.dev/?${params}`;
}