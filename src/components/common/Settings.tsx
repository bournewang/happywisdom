import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface SettingOption {
    label: string;
    value: string;
}

interface SettingVariable {
    name: string;
    label: string;
    currentSetting: string;
    options: SettingOption[];
    onChange: (newSetting: string) => void;
}

interface SettingsProps {
    variables: SettingVariable[];
}

export function Settings({ variables }: SettingsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localSettings, setLocalSettings] = useState(() =>
        variables.reduce((acc, variable) => {
            acc[variable.name] = variable.currentSetting;
            return acc;
        }, {} as Record<string, string>)
    );

    const handleSave = () => {
        variables.forEach(variable => {
            const val = localSettings[variable.name];
            variable.onChange(val);
            localStorage.setItem(variable.name, val);
        });
        setIsOpen(false);
    };

    const handleChange = (name: string, value: string) => {
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
            >
                <FaCog className="w-6 h-6" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 relative overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">设置</h2>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <IoMdClose className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Settings Content */}
                        <div className="px-6 py-4">
                            {variables.map(variable => (
                                <div key={variable.name} className="mb-6 last:mb-0">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                        {variable.label}
                                    </h3>
                                    <div className="space-y-2">
                                        {variable.options.map(option => (
                                            <label 
                                                key={option.value}
                                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                <input
                                                    type="radio"
                                                    name={variable.name}
                                                    value={option.value}
                                                    checked={localSettings[variable.name] === option.value}
                                                    onChange={() => handleChange(variable.name, option.value)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-3 text-gray-700">
                                                    {option.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 