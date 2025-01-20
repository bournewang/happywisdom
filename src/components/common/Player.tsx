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
        <div className="relative flex flex-col min-h-screen">
            {/* Content Section - Top */}
            <div className=" relative z-10 flex-1 flex flex-col justify-start pt-2">
                <div className={` max-w-3xl ${className}`}>
                    <div className="bg-black/10 rounded-xl p-2 md:p-8 shadow-2xl  border-white/10">
                        {(title || subtitle) && (
                            <div className="mb-2 text-center">
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
                        
                        <div className="text-white text-2xl md:text-xl leading-relaxed text-center space-y-2">
                            {content}
                        </div>

                        {(audioSource || actions) && (
                            <div className="flex items-center justify-center gap-4 mt-2">
                                {audioSource && <Audio source={audioSource} isTTS={isTTS} size={size}/>}
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Background Image - Bottom 2/3 */}
            <div className="absolute bottom-0 left-0 w-full h-2/3">
                <img 
                    src={backgroundImage}
                    alt="background"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
} 