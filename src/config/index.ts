
const serverUrl = import.meta.env.MODE === 'development' ? 
    'https://b.english-reader.com' : 
    'https://b.english-reader.com';

export const config = {
    mediaPrefix: serverUrl + '/media/',
    imagePrefix: serverUrl + '/imgs/',
    dictAudioPrefix: serverUrl + '/dict/'
}