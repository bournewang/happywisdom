import React from 'react';

export function DeepSeek() {
    return (
        <div className="w-full h-full">
            <iframe
                src="https://chat.deepseek.com/"
                style={{ width: '100%', height: '100vh', border: 'none' }}
                title="DeepSeek"
            />
        </div>
    );
}

// export default DeepSeek;