import React from 'react';

interface MenuItem {
    value: string;
    label: string;
}

interface CommonMenuProps {
    items: MenuItem[];
    selectedItem: string;
    onSelect: (value: string) => void;
}

export function Menu({ items, selectedItem, onSelect }: CommonMenuProps) {
    return (
        <div className="z-20 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
            <div className="flex justify-center gap p-3">
                {items.map(item => (
                    <button
                        key={item.value}
                        onClick={() => onSelect(item.value)}
                        className={`px-3 py-1 rounded-full text-white font-semibold transition-transform transform hover:scale-105 ${
                            selectedItem === item.value ? 'bg-white text-blue-500' : 'bg-transparent'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
} 