import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CrashGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const CrashGame = ({ balance, onBalanceChange }: CrashGameProps) => {
  const [bet, setBet] = useState(100000);
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [crashPoint, setCrashPoint] = useState(0);
  const [currentWin, setCurrentWin] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const generateCrashPoint = () => {
    const rand = Math.random();
    if (rand < 0.33) return 1 + Math.random() * 1.5;
    if (rand < 0.66) return 1.5 + Math.random() * 3;
    return 3 + Math.random() * 7;
  };

  const startGame = () => {
    if (balance < bet) return;
    
    onBalanceChange(balance - bet);
    setIsFlying(true);
    setCrashed(false);
    setCashedOut(false);
    setMultiplier(1.00);
    setShowResult(false);
    
    const targetCrash = generateCrashPoint();
    setCrashPoint(targetCrash);

    const interval = setInterval(() => {
      setMultiplier(prev => {
        const next = prev + 0.01;
        if (next >= targetCrash) {
          clearInterval(interval);
          setIsFlying(false);
          setCrashed(true);
          setTimeout(() => setShowResult(true), 500);
          return targetCrash;
        }
        return next;
      });
    }, 50);
  };

  const cashOut = () => {
    if (!isFlying || cashedOut) return;
    
    setCashedOut(true);
    setIsFlying(false);
    const winAmount = Math.floor(bet * multiplier);
    setCurrentWin(winAmount);
    onBalanceChange(balance + winAmount);
    setTimeout(() => setShowResult(true), 500);
  };

  const reset = () => {
    setMultiplier(1.00);
    setCrashed(false);
    setCashedOut(false);
    setShowResult(false);
    setCurrentWin(0);
  };

  return (
    <>
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4">
            <div className="text-9xl mb-6 animate-bounce">
              {cashedOut ? '🚀' : '💥'}
            </div>
            <h2 className={`text-5xl md:text-7xl font-black mb-4 animate-pulse ${
              cashedOut ? 'text-green-500' : 'text-red-500'
            }`}>
              {cashedOut ? '🎉 ВЫВЕЛ! 🎉' : '💀 ВЗОРВАЛСЯ! 💀'}
            </h2>
            <div className="text-4xl font-bold text-white mb-6">
              {cashedOut ? (
                <p className="text-green-400">+{(currentWin / 1000000).toFixed(1)}M₽</p>
              ) : (
                <p className="text-red-400">Взорвалось на x{crashPoint.toFixed(2)}</p>
              )}
            </div>
            <Button
              onClick={() => { reset(); setShowResult(false); }}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 text-lg"
            >
              ЕЩЁ РАЗ
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl md:text-3xl font-black">🚀 КРАШ</h2>
        </div>

        <Card className="bg-gradient-to-br from-purple-900 to-black p-6 md:p-8 border-4 border-purple-600">
          <div className="relative h-64 md:h-80 bg-black/50 rounded-lg mb-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-8xl md:text-9xl font-black transition-all duration-100 ${
                isFlying ? 'text-green-400 animate-pulse scale-110' : 
                crashed ? 'text-red-500 scale-150' : 
                'text-white/50'
              }`}>
                {multiplier.toFixed(2)}x
              </div>
            </div>
            {isFlying && (
              <div className="absolute bottom-4 left-4 text-6xl animate-bounce">
                🚀
              </div>
            )}
            {crashed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl animate-ping">💥</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Ставка:</span>
                <span className="text-white text-xl font-black">{(bet / 1000000).toFixed(1)}M₽</span>
              </div>
              <div className="flex gap-2">
                {[50000, 100000, 500000, 1000000].map(amount => (
                  <Button
                    key={amount}
                    onClick={() => setBet(amount)}
                    disabled={isFlying}
                    className={`flex-1 ${
                      bet === amount ? 'bg-purple-600' : 'bg-gray-800'
                    } hover:bg-purple-500 text-xs md:text-sm`}
                  >
                    {amount >= 1000000 ? `${(amount / 1000000)}M` : `${(amount / 1000)}K`}₽
                  </Button>
                ))}
              </div>
            </div>

            {!isFlying && !crashed && !cashedOut && (
              <Button
                onClick={startGame}
                disabled={balance < bet}
                className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-black text-xl disabled:opacity-50"
              >
                <Icon name="Rocket" className="mr-2" />
                ЗАПУСТИТЬ
              </Button>
            )}

            {isFlying && !cashedOut && (
              <Button
                onClick={cashOut}
                className="w-full h-16 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black text-xl animate-pulse"
              >
                <Icon name="HandMetal" className="mr-2" />
                ВЫВЕСТИ {(bet * multiplier / 1000000).toFixed(1)}M₽
              </Button>
            )}

            {(crashed || cashedOut) && (
              <Button
                onClick={reset}
                className="w-full h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-black text-xl"
              >
                <Icon name="RotateCcw" className="mr-2" />
                ЕЩЁ ПАРТИЮ
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default CrashGame;
