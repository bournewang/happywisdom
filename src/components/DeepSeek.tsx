import { useState } from 'react';

export function DeepSeek() {
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="w-full h-full">
            {!showChat ? (
                <div className="flex flex-col items-center gap-4 p-8">
                    <a 
                        href="https://ppinfra.com/user/register?invited_by=E9GL4W"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </a>
                    <button
                        onClick={() => setShowChat(true)}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Go Chat
                    </button>
                </div>
            ) : (
                <iframe
                    src="https://ppinfra.com/llm/deepseek-deepseek-r1-community"
                    style={{ width: '100%', height: '100vh', border: 'none' }}
                    title="DeepSeek"
                />
            )}
        </div>
    );
}

// export default DeepSeek;