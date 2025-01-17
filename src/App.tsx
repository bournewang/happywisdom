import { useState, useEffect } from 'react'
import { BuddhismPlayer } from './components/BuddhismPlayer'
import { VocabularyPlayer } from './components/VocabularyPlayer'
import { PoemPlayer } from './components/PoemPlayer'

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    }
  ];

  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

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
      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen relative overflow-hidden bg-green-300`}
    >
      {/* Animated background gradients */}
      {!selectedCategory && (
        <>
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-amber-900/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-900/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-pink-900/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/3 left-1/3 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-3xl animate-blob animation-delay-6000"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </>
      )}

      {/* Category Switcher */}
      {selectedCategory && (
        <div className="fixed top-0 right-0 z-50">
          <button
            onClick={() => {
              setSelectedCategory(null);
              localStorage.removeItem('selectedCategory');
            }}
            className="group px-4 py-2 rounded-full 
                     backdrop-blur-md bg-black/30
                     border border-white/10 hover:border-amber-500/50
                     text-amber-200 hover:text-amber-400 
                     transform hover:scale-105 
                     transition-all duration-300
                     flex items-center gap-2"
          >
            {/* <span>切换类别</span> */}
            {/* show the icon bigger */}
            <span className="text-3xl">☰</span>
          </button>
        </div>
      )}

      {!selectedCategory ? (
        // Category Selection Menu with enhanced backdrop
        <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">
                智慧之声
              </span>
              <div className="text-lg md:text-xl text-gray-300 mt-4 font-normal">
                选择您想聆听的内容
              </div>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                  className="group backdrop-blur-md bg-white/5 rounded-xl p-8 
                           border border-white/10 hover:border-amber-500/50
                           transform hover:scale-105 transition-all duration-300
                           hover:bg-white/10"
                >
                  <div className="text-5xl mb-6 transform group-hover:scale-110 
                               transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-amber-200 mb-3">
                    {category.name}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Render selected category player
        <div>
          {renderPlayer()}
        </div>
      )}
    </div>
  );
}

export default App
