import { ReactNode } from 'react';
import { useSwipeable } from 'react-swipeable';

interface SwipeContainerProps {
    onSwipeUp: () => void;
    onSwipeDown: () => void;
    children: ReactNode;
    className?: string;
}

export function SwipeContainer({ onSwipeUp, onSwipeDown, children, className = '' }: SwipeContainerProps) {
    const swipeHandlers = useSwipeable({
        onSwipedUp: onSwipeUp,
        onSwipedDown: onSwipeDown,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    return (
        <div {...swipeHandlers} className={`${className}`}>
            {children}

            <div className="fixed bottom-0 bg-white/80 text-center w-full p-2">
                <p className="text-black-500">上下轻滑切换</p>
            </div>            
        </div>
    );
} 