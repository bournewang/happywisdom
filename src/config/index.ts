
const serverUrl = import.meta.env.MODE === 'development' ? 
    'https://b.qingfan.wang' : 
    'https://b.qingfan.wang';

export const config = {
    mediaPrefix: serverUrl + '/media/',
    imagePrefix: serverUrl + '/imgs/',
    dictAudioPrefix: serverUrl + '/dict/'
}