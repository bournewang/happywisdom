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
            {/* <div className="h-90%"> */}
                {children}
            {/* </div> */}

            <div className="fixed bottom-5 bg-white/80 flex items-center justify-center w-full p-4 mt-12 gap-4">
                <p className="text-black-500">上下轻滑切换</p>
            </div>            
        </div>
    );
} 