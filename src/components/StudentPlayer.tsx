import { useNavigate } from 'react-router-dom';
import { PoemPlayer } from './PoemPlayer';
import { NurseryRhymePlayer } from './NurseryRhymePlayer';
import { VocabularyPlayer } from './VocabularyPlayer';
import { useState, useEffect } from 'react';

type StudentView = 'poem' | 'nursery' | 'vocabulary';

export function StudentPlayer() {
    const navigate = useNavigate();
    const [studentView, setStudentView] = useState<StudentView>(() => {
        const saved = localStorage.getItem('studentView');
        return (saved as StudentView) || 'poem';
    });

    useEffect(() => {
        localStorage.setItem('studentView', studentView);
        navigate(`/student/${studentView}`);
    }, [studentView, navigate]);

    const handleViewChange = (view: StudentView) => {
        setStudentView(view);
    };

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm">
                <div className="flex justify-center gap-4 p-2">
                    <button 
                        onClick={() => handleViewChange('poem')}
                        className={`px-4 py-2 rounded text-white ${studentView === 'poem' ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                        诗词
                    </button>
                    <button 
                        onClick={() => handleViewChange('nursery')}
                        className={`px-4 py-2 rounded text-white ${studentView === 'nursery' ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                        儿歌
                    </button>
                    <button 
                        onClick={() => handleViewChange('vocabulary')}
                        className={`px-4 py-2 rounded text-white ${studentView === 'vocabulary' ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                        单词
                    </button>
                </div>
            </div>

            <div className="pt-16">
                {studentView === 'poem' && <PoemPlayer />}
                {studentView === 'nursery' && <NurseryRhymePlayer />}
                {studentView === 'vocabulary' && <VocabularyPlayer />}
            </div>
        </div>
    );
} 