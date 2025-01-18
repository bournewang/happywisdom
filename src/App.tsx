import { useState } from 'react'
import { BuddhismPlayer } from './components/BuddhismPlayer'
import { VocabularyPlayer } from './components/VocabularyPlayer'
import { PoemPlayer } from './components/PoemPlayer'
import { ChristPlayer } from './components/ChristPlayer'

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    return localStorage.getItem('selectedCategory');
  });

  const categories: Category[] = [
    {
      id: 'buddhism',
      name: '佛教音乐',
      description: '禅修冥想，净化心灵',
      icon: '🕉️'
    },
    {
      id: 'vocabulary',
      name: '英语词汇',
      description: '轻松记忆英语单词',
      icon: '📚'
    },
    {
      id: 'poems',
      name: '唐诗宋词',
      description: '感受古典诗词之美',
      icon: '📜'
    },
    {
      id: 'christ',
      name: '圣经经文',
      description: '聆听圣经经文',
      icon: '✝️'
    }
  ];

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    localStorage.setItem('selectedCategory', categoryId);
  };

  const renderPlayer = () => {
    switch (selectedCategory) {
      case 'buddhism':
        return <BuddhismPlayer />;
      case 'vocabulary':
        return <VocabularyPlayer />;
      case 'poems':
        return <PoemPlayer />;
      case 'christ':
        return <ChristPlayer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Category Switcher */}
      {selectedCategory && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => {
              setSelectedCategory(null);
              localStorage.removeItem('selectedCategory');
            }}
            className="p-2 rounded-full 
                     backdrop-blur-md bg-white/10
                     border border-white/10 hover:border-amber-500/50
                     text-white hover:text-amber-400 
                     transform hover:scale-105 
                     transition-all duration-300"
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>
      )}

      {!selectedCategory ? (
        // Category Selection Menu
        <div className="h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">
                智慧之声
              </span>
              <div className="text-base text-gray-400 mt-2 font-normal">
                选择您想聆听的内容
              </div>
            </h1>
            
            <div className="grid grid-cols-2 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                  className="group backdrop-blur-md bg-white/5 rounded-xl p-4 
                           border border-white/10 hover:border-amber-500/50
                           transform hover:scale-102 transition-all duration-300
                           hover:bg-white/10 text-left"
                >
                  <div className="text-3xl mb-3 transform group-hover:scale-110 
                               transition-transform duration-300 text-red-500">
                    {category.icon}
                  </div>
                  <h2 className="text-lg font-medium text-amber-200 mb-1">
                    {category.name}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Render selected category player
        <div className="h-screen">
          {renderPlayer()}
        </div>
      )}
    </div>
  );
}

export default App
