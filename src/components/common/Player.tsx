import { ReactNode } from 'react';
import { Audio } from './Audio';

interface PlayerProps {
    title?: string;
    subtitle?: string;
    content: ReactNode;
    audioSource?: string;
    isTTS?: boolean;
    backgroundImage?: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    actions?: ReactNode;
}

export function Player({ 
    title,
    subtitle,
    content,
    audioSource,
    isTTS = false,
    backgroundImage = '/images/common-bg.jpg',
    className = '',
    size = 'medium',
    actions
}: PlayerProps) {
    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-1000"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={`w-full max-w-3xl ${className}`}>
                <div className="backdrop-blur-sm bg-black/20 rounded-xl p-6 md:p-8 shadow-2xl border border-white/10">
                    {(title || subtitle) && (
                        <div className="mb-6 text-center">
                            {title && (
                                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-amber-200 
                                    tracking-wide drop-shadow-lg">
                                    {title}
                                </h1>
                            )}
                            {subtitle && (
                                <h2 className="text-lg md:text-xl text-gray-300 
                                    tracking-wider font-medium">
                                    {subtitle}
                                </h2>
                            )}
                        </div>
                    )}
                    
                    <div className="text-white text-xl md:text-xl leading-relaxed text-center space-y-2">
                        {content}
                    </div>

                    {(audioSource || actions) && (
                        <div className="flex items-center justify-center gap-4 mt-6">
                            {audioSource && <Audio source={audioSource} isTTS={isTTS} size={size}/>}
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 