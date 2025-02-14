import { useNavigate } from 'react-router-dom';
import { VideosPlayer } from './common/VideosPlayer';
import { useState, useEffect } from 'react';
import { Menu } from './common/Menu';
import { Settings } from './common/Settings';
import { AudioPlayer } from './common/AudioPlayer';
import { config } from '../config';

type SeniorView = 'opera' | 'dance' | 'buddhism' | 'health' | 'exercise';

export function SeniorPlayer() {
    const navigate = useNavigate();
    const [seniorView, setSeniorView] = useState<SeniorView>(() => {
        const saved = localStorage.getItem('seniorView');
        return (saved as SeniorView) || 'opera';
    });
    const [operaType, setOperaType] = useState(() => {
        return localStorage.getItem('operaType') || 'yuju';
    });

    useEffect(() => {
        localStorage.setItem('seniorView', seniorView);
    }, [seniorView, navigate]);

    const handleViewChange = (value: string) => {
        setSeniorView(value as SeniorView);
        localStorage.setItem('seniorView', seniorView);
    };

    const menuItems = [
        { value: 'opera', label: '戏曲' },
        { value: 'dance', label: '舞曲' },
        { value: 'buddhism', label: '佛乐' },
        { value: 'health', label: '健康' },
        { value: 'exercise', label: '养生操' }
    ];

    const settingsVariables = [
        {
            name: 'operaType',
            label: '戏剧',
            currentSetting: operaType,
            options: [
                { value: 'yuju', label: '豫剧' },
                { value: 'jingju', label: '京剧' },
                { value: 'yueju', label: '越剧' }
            ],
            onChange: (value: string) => {
                setOperaType(value);
            }
        }
    ];

    return (
        <div className="h-screen w-screen bg-black/50 overflow-hidden fixed">
            <div className="h-[7vh]">
                <Menu items={menuItems} selectedItem={seniorView} onSelect={handleViewChange} />

                <div className="fixed top-16 right-4 z-50">
                    <Settings variables={settingsVariables} />
                </div>
            </div>

            <div className="h-[93vh] overflow-hidden">
                {seniorView === 'opera' && (
                    <VideosPlayer
                        key={`opera_${operaType}`}
                        category={`opera_${operaType}`}
                        jsonPath={`/assets/opera/${operaType}.json`}
                    />
                )}
                {seniorView === 'dance' && <AudioPlayer
                    jsonPath="/assets/dj.json"
                    renderItem={(poem) => ({
                        title: poem?.title,
                        // subtitle: poem?.author,
                        content: null,
                        audioSource: config.meidaPrefix + poem?.audioUrl,
                        backgroundImage: config.imagePrefix + (poem?.image || 'dj1.jpg')
                    })}
                    isTTS={false}
                />}
                {seniorView === 'buddhism' && <VideosPlayer category="buddhism" jsonPath='/assets/buddhism.json' />}
                {seniorView === 'health' && <AudioPlayer
                    jsonPath="/assets/health-tips.json"
                    renderItem={(poem) => ({
                        title: poem?.title,
                        // subtitle: poem?.author,
                        content: poem?.content,
                        audioSource: poem?.content,
                        backgroundImage: config.imagePrefix + poem?.image || 'poem.jpg'
                    })}
                    isTTS={true}
                />}
                {seniorView === 'exercise' && <VideosPlayer category="exercise" jsonPath='/assets/exercise.json' />}
            </div>
        </div>
    );
} 