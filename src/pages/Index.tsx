import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [userClickNumber, setUserClickNumber] = useState<number | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Загружаем состояние при инициализации
  useEffect(() => {
    const savedTotalClicks = localStorage.getItem('totalClicks') || '0';
    const savedUserClicked = localStorage.getItem('userHasClicked');
    const savedUserNumber = localStorage.getItem('userClickNumber');
    const savedTheme = localStorage.getItem('isDarkMode');
    
    setTotalClicks(parseInt(savedTotalClicks));
    setHasClicked(savedUserClicked === 'true');
    setUserClickNumber(savedUserNumber ? parseInt(savedUserNumber) : null);
    setIsDarkMode(savedTheme === 'true');
  }, []);

  // Применяем тёмную тему к документу
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleButtonClick = () => {
    if (hasClicked) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);

    const newTotalClicks = totalClicks + 1;
    setTotalClicks(newTotalClicks);
    setUserClickNumber(newTotalClicks);
    setHasClicked(true);

    // Сохраняем в localStorage
    localStorage.setItem('totalClicks', newTotalClicks.toString());
    localStorage.setItem('userHasClicked', 'true');
    localStorage.setItem('userClickNumber', newTotalClicks.toString());
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', newTheme.toString());
  };

  const resetCounter = () => {
    setTotalClicks(0);
    setHasClicked(false);
    setUserClickNumber(null);
    localStorage.removeItem('totalClicks');
    localStorage.removeItem('userHasClicked');
    localStorage.removeItem('userClickNumber');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Переключатель темы */}
      <div className="absolute top-6 right-6">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={`transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700' 
              : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
        </Button>
      </div>

      {/* Основной контент */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center w-full flex flex-col items-center">


          {/* Главная кнопка */}
          <div className="mb-8">
            <Button
              onClick={handleButtonClick}
              disabled={hasClicked}
              size="lg"
              className={`
                w-80 h-80 rounded-lg text-xl font-semibold
                transform transition-all duration-200
                ${isAnimating ? 'scale-95' : 'scale-100'}
                ${hasClicked 
                  ? 'bg-cyan-700 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
                }
                shadow-lg hover:shadow-xl
                disabled:hover:scale-100 disabled:hover:shadow-lg
                flex flex-col items-center justify-center
              `}
            >
              {hasClicked ? (
                <div className="text-center space-y-6">
                  <div className="text-5xl font-extrabold text-lime-400 drop-shadow-2xl animate-pulse">#{userClickNumber}</div>
                  <div className="text-3xl font-bold text-orange-300">Всего кликов</div>
                  <div className="text-7xl font-black text-yellow-200 drop-shadow-2xl glow">{totalClicks}</div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Icon name="MousePointer" size={48} className="mx-auto text-white" />
                  <div className="text-3xl font-bold text-orange-300">Всего кликов</div>
                  <div className="text-6xl font-black text-yellow-200 drop-shadow-2xl glow">{totalClicks}</div>
                </div>
              )}
            </Button>
          </div>

          {/* YouTube кнопка */}
          <div className="mt-6">
            <Button
              onClick={() => window.open('https://youtube.com', '_blank')}
              size="lg"
              variant="outline"
              className={`
                px-8 py-4 text-lg font-semibold
                border-2 transition-all duration-200
                hover:scale-105 active:scale-95
                ${
                  isDarkMode 
                    ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 hover:border-red-600' 
                    : 'bg-red-600 border-red-500 text-white hover:bg-red-700 hover:border-red-600'
                }
                shadow-lg hover:shadow-xl
              `}
            >
              <Icon name="Youtube" size={24} className="mr-2" />
              Мой YouTube канал
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;