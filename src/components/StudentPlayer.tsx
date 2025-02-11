import { useNavigate } from 'react-router-dom';
import { VocabularyPlayer } from './VocabularyPlayer';
import { useState, useEffect } from 'react';
import { Menu } from './common/Menu';
import { AudioPlayer } from './common/AudioPlayer';
import { AudioVerse } from './common/types';
import { DeepSeek } from './DeepSeek';
import { config } from '../config';

type StudentView = 'poem' | 'nursery' | 'nursery-en' | 'vocabulary' | 'deepseek';

export function StudentPlayer() {
    const navigate = useNavigate();
    // const [poemList, setPoemList] = useState<AudioVerse[]>([]);
    const [studentView, setStudentView] = useState<StudentView>(() => {
        const saved = localStorage.getItem('studentView');
        return (saved as StudentView) || 'poem';
    });

    useEffect(() => {
        localStorage.setItem('studentView', studentView);
        // navigate(`/student/${studentView}`);
    }, [studentView, navigate]);

    const handleViewChange = (view: string) => {
        setStudentView(view as StudentView);
    };

    const menuItems = [
        { value: 'poem', label: '诗词' },
        { value: 'nursery', label: '儿歌' },
        { value: 'nursery-en', label: '英文歌' },
        { value: 'vocabulary', label: '单词' },
        // Uncomment if you want to include deepseek
        { value: 'deepseek', label: 'DeepSeek' }
    ];

    const getFullText = (poem: AudioVerse) => {
        if (!poem) {
            return '';
        }
        // addd title and author
        return `${poem.title} ${poem.author} ${poem.paragraphs?.join('。')}`;
    }
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <div className="h-15">
                <Menu items={menuItems} selectedItem={studentView} onSelect={handleViewChange} />
            </div>
            <div className="flex-1 overflow-hidden">
                {studentView === 'poem' && <AudioPlayer
                    jsonPath="../../assets/poems.json"
                    renderItem={(poem: AudioVerse) => ({
                        title: poem?.title,
                        subtitle: poem?.author,
                        content: (
                            <>
                                {poem?.paragraphs?.map((line: string, index: number) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </>
                        ),
                        audioSource: getFullText(poem),
                        backgroundImage: config.imagePrefix + (poem?.image || 'poem.jpg')
                    })}
                    isTTS={true}
                />}

                {studentView === 'nursery' &&
                    <AudioPlayer
                        jsonPath="../../assets/nursery-rhyme.json"
                        renderItem={(poem: AudioVerse) => ({
                            title: poem?.title,
                            //   subtitle: poem?.author,
                            content: (
                                <>
                                    {poem?.content}
                                </>
                            ),
                            audioSource: config.meidaPrefix + poem?.audioUrl,
                            backgroundImage: config.imagePrefix + (poem?.image || 'poem.jpg')
                        })}
                        isTTS={false}
                    />
                }
                {studentView === 'nursery-en' && <AudioPlayer
                    jsonPath="../../assets/nursery-rhyme-en.json"
                    renderItem={(poem: AudioVerse) => ({
                        title: poem?.title,
                        //   subtitle: poem?.author,
                        content: (
                            <div className="text-white text-xl space-y-2">
                                {poem?.content}
                            </div>
                        ),
                        audioSource: config.meidaPrefix + poem?.audioUrl,
                        backgroundImage: config.imagePrefix + (poem?.image || 'poem.jpg')
                    })}
                    isTTS={false}
                    showRefresh={true}
                />}
                {studentView === 'vocabulary' && <VocabularyPlayer />}
                {/* Uncomment if you want to include deepseek */}
                {studentView === 'deepseek' && <DeepSeek />}
            </div>
        </div>
    );
} 