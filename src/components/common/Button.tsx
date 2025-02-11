import React from 'react';

interface ButtonProps {
    onClick: () => void;
    title: string;
    icon: React.ReactNode;
    isPlaying?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, title, icon, isPlaying, className }) => {
    const sizeClass = 'w-10 h-10'; // Fixed medium size

    return (
        <button
            onClick={onClick}
            className={`relative rounded-full 
                ${isPlaying ? 'bg-red-500 hover:bg-red-400' : 'pl-1 bg-gradient-to-r from-blue-500/80 to-cyan-400/80 \
                transform hover:scale-105 active:scale-95 \
                transition-all duration-300 ease-in-out \
                shadow-lg hover:shadow-cyan-500/30 hover:from-blue-400 hover:to-cyan-300'}
                text-white font-medium
                transition-all duration-300 ease-in-out
                shadow-lg
                backdrop-blur-md
                flex items-center justify-center text-center
                group
                disabled:opacity-50 disabled:cursor-not-allowed
                ${sizeClass} ${className}`}
            title={title}
        >
            <span className="relative group-hover:scale-110 transition-transform duration-300">
                {icon}
            </span>
        </button>
    );
}; 