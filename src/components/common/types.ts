interface VideoVerse {
    title: string;
    videoUrl: string;
}

interface AudioVerse {
    title: string;
    subtitle?: string;
    author?: string;
    audioUrl: string;
    content?: string;
    paragraphs?: string[];
    image?: string;
    videoUrl?: string;
}

export type { VideoVerse, AudioVerse };