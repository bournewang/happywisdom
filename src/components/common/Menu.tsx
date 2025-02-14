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
        <div className="z-20 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg h-full flex flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-4 w-full">
                {items.map(item => (
                    <button
                        key={item.value}
                        onClick={() => onSelect(item.value)}
                        className={`px-3 py-1 rounded-full font-semibold transition-transform transform hover:scale-105 ${
                            selectedItem === item.value ? 'bg-white text-blue-500' : 'text-white bg-transparent'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
} 