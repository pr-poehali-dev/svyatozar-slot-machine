import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PlinkoProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const Plinko = ({ balance, onBalanceChange }: PlinkoProps) => {
  const [bet, setBet] = useState(100000);
  const [dropping, setDropping] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalWin, setTotalWin] = useState(0);

  const multipliers = [10, 5, 3, 2, 1.5, 1, 0.5, 1, 1.5, 2, 3, 5, 10];

  const dropBall = () => {
    if (balance < bet || dropping) return;

    onBalanceChange(balance - bet);
    setDropping(true);
    setShowResult(false);

    setTimeout(() => {
      const slot = Math.floor(Math.random() * multipliers.length);
      setLastResult(slot);
      
      const winAmount = Math.floor(bet * multipliers[slot]);
      setTotalWin(winAmount);
      
      if (winAmount > 0) {
        onBalanceChange(balance - bet + winAmount);
      }
      
      setDropping(false);
      setTimeout(() => setShowResult(true), 500);
    }, 2000);
  };

  return (
    <>
      {showResult && lastResult !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4">
            <div className="text-9xl mb-6 animate-bounce">
              {multipliers[lastResult] >= 1 ? '🎯' : '💀'}
            </div>
            <h2 className={`text-5xl md:text-7xl font-black mb-4 animate-pulse ${
              totalWin >= bet ? 'text-green-500' : 'text-red-500'
            }`}>
              {totalWin >= bet ? '🎉 ВЫИГРАЛ! 🎉' : '💀 ПРОЕБАЛ! 💀'}
            </h2>
            <div className="text-6xl font-black text-yellow-400 mb-4">
              x{multipliers[lastResult]}
            </div>
            <p className="text-4xl font-bold mb-6">
              {totalWin >= bet ? (
                <span className="text-green-400">+{((totalWin - bet) / 1000000).toFixed(1)}M₽</span>
              ) : (
                <span className="text-red-400">-{((bet - totalWin) / 1000000).toFixed(1)}M₽</span>
              )}
            </p>
            <Button
              onClick={() => setShowResult(false)}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 text-lg"
            >
              ЕЩЁ РАЗ
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl md:text-3xl font-black">🎯 ПЛИНКО</h2>
        </div>

        <Card className="bg-gradient-to-br from-blue-900 to-black p-6 md:p-8 border-4 border-blue-600">
          <div className="relative h-96 bg-blue-950/50 rounded-lg mb-6 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-13 gap-1 p-4">
              {Array.from({ length: 13 * 10 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white/20 rounded-full"></div>
              ))}
            </div>
            
            {dropping && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg shadow-yellow-500/50"></div>
            )}

            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-13 gap-0.5 p-2">
              {multipliers.map((mult, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center p-2 text-xs font-black rounded ${
                    mult >= 5 ? 'bg-gradient-to-b from-yellow-500 to-orange-600 text-white' :
                    mult >= 2 ? 'bg-gradient-to-b from-green-500 to-green-700 text-white' :
                    mult >= 1 ? 'bg-gradient-to-b from-blue-500 to-blue-700 text-white' :
                    'bg-gradient-to-b from-red-500 to-red-700 text-white'
                  } ${lastResult === i ? 'ring-4 ring-yellow-400 scale-110 animate-pulse' : ''}`}
                >
                  {mult}x
                </div>
              ))}
            </div>
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
                    disabled={dropping}
                    className={`flex-1 ${
                      bet === amount ? 'bg-blue-600' : 'bg-gray-800'
                    } hover:bg-blue-500 text-xs md:text-sm`}
                  >
                    {amount >= 1000000 ? `${(amount / 1000000)}M` : `${(amount / 1000)}K`}₽
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={dropBall}
              disabled={dropping || balance < bet}
              className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xl disabled:opacity-50"
            >
              {dropping ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" />
                  ПАДАЕТ...
                </>
              ) : (
                <>
                  <Icon name="ArrowDown" className="mr-2" />
                  БРОСИТЬ ШАР
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Plinko;
