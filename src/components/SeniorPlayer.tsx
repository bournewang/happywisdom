import { useNavigate } from 'react-router-dom';
import { VideoPlayer } from './common/VideoPlayer';
import { useState, useEffect } from 'react';
import { Menu } from './common/Menu';
import { Settings } from './common/Settings';
import { AudioPlayer } from './common/AudioPlayer';

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

    const [streamMode, setStreamMode] = useState(() => {
        return localStorage.getItem('streamMode') || 'audio';
    })

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
    ];
    if (streamMode === 'video') {
        menuItems.push({ value: 'exercise', label: '养生操' });
    }

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
        },
        {
            name: 'streamMode',
            label: '节流模式',
            currentSetting: 'audio',
            options: [
                { value: 'audio', label: '节流模式' },
                { value: 'video', label: '视频模式' }
            ],
            onChange: (value: string) => {
                setStreamMode(value);
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
                    streamMode === 'video' ? 
                        <VideoPlayer
                            key={`opera_${operaType}`}
                            category={`opera_${operaType}`}
                            jsonPath={`/assets/opera/${operaType}.json`}
                        />
                        : 
                        <AudioPlayer
                            jsonPath={`/assets/opera/${operaType}.json`}
                            renderItem={(poem) => ({
                                title: poem?.title,
                                subtitle: poem?.author,
                                content: poem?.content,
                                audioSource: poem?.audioUrl,
                                backgroundImage: (poem?.image || 'dj1.jpg')
                            })}
                            isTTS={false}
                        />    
                )}
                {seniorView === 'dance' && 
                    <AudioPlayer
                        jsonPath="/assets/dj.json"
                        renderItem={(poem) => ({
                            title: poem?.title,
                            subtitle: poem?.author,
                            content: null,
                            audioSource: poem?.audioUrl,
                            backgroundImage: (poem?.image || 'dj1.jpg')
                        })}
                        isTTS={false}
                    />
                }
                {seniorView === 'buddhism' && 
                    (streamMode === 'video' ? 
                        <VideoPlayer 
                            category="buddhism" 
                            jsonPath='/assets/buddhism.json' 
                        /> 
                        :
                        <AudioPlayer
                            jsonPath="/assets/buddhism.json"
                            renderItem={(poem) => ({
                                title: poem?.title,
                                subtitle: poem?.author,
                                content: poem?.content,
                                audioSource: poem?.audioUrl,
                                backgroundImage: poem?.image || 'poem.jpg'
                            })}
                            isTTS={false}
                        />
                    )
                }
                {seniorView === 'health' && 
                    <AudioPlayer
                        jsonPath="/assets/health-tips.json"
                        renderItem={(poem) => ({
                            title: poem?.title,
                        // subtitle: poem?.author,
                        content: poem?.content,
                        audioSource: poem?.content,
                        backgroundImage: poem?.image || 'poem.jpg'
                    })}
                        isTTS={true}
                    />
                }
                {seniorView === 'exercise' && 
                    <VideoPlayer category="exercise" jsonPath='/assets/exercise.json' />
                }
            </div>
        </div>
    );
} 