import { devConfig } from './config.dev'
import { prodConfig } from './config.prod'

export const config = import.meta.env.MODE === 'production' ? prodConfig : devConfig

// Type definition for the config
export interface Config {
    serverUrl: string;
    audioUrl: string;
    endpoints: {
        songs: string;
        // add other endpoints as needed
    };
} 