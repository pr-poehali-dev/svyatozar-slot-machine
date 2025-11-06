import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MinesProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const Mines = ({ balance, onBalanceChange }: MinesProps) => {
  const [bet, setBet] = useState(100000);
  const [minesCount, setMinesCount] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(25).fill(false));
  const [mines, setMines] = useState<number[]>([]);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [gameOver, setGameOver] = useState(false);
  const [hitMine, setHitMine] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    if (balance < bet) return;

    onBalanceChange(balance - bet);
    
    const minePositions: number[] = [];
    while (minePositions.length < minesCount) {
      const pos = Math.floor(Math.random() * 25);
      if (!minePositions.includes(pos)) {
        minePositions.push(pos);
      }
    }

    setMines(minePositions);
    setRevealed(new Array(25).fill(false));
    setGameStarted(true);
    setGameOver(false);
    setHitMine(false);
    setCurrentMultiplier(1.0);
    setShowResult(false);
  };

  const revealTile = (index: number) => {
    if (!gameStarted || gameOver || revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (mines.includes(index)) {
      setHitMine(true);
      setGameOver(true);
      revealAllMines();
      setTimeout(() => setShowResult(true), 1000);
    } else {
      const revealedCount = newRevealed.filter(r => r).length;
      const safeCount = 25 - minesCount;
      const newMultiplier = 1 + (revealedCount / safeCount) * (minesCount * 2);
      setCurrentMultiplier(newMultiplier);
    }
  };

  const revealAllMines = () => {
    const allRevealed = revealed.map((_, i) => mines.includes(i) || revealed[i]);
    setRevealed(allRevealed);
  };

  const cashOut = () => {
    if (!gameStarted || gameOver) return;

    const winAmount = Math.floor(bet * currentMultiplier);
    onBalanceChange(balance + winAmount);
    setGameOver(true);
    revealAllMines();
    setTimeout(() => setShowResult(true), 500);
  };

  const reset = () => {
    setGameStarted(false);
    setGameOver(false);
    setShowResult(false);
    setRevealed(new Array(25).fill(false));
    setMines([]);
    setCurrentMultiplier(1.0);
    setHitMine(false);
  };

  return (
    <>
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4">
            <div className="text-9xl mb-6 animate-bounce">
              {hitMine ? '💣' : '💎'}
            </div>
            <h2 className={`text-5xl md:text-7xl font-black mb-4 animate-pulse ${
              hitMine ? 'text-red-500' : 'text-green-500'
            }`}>
              {hitMine ? '💀 ВЗОРВАЛСЯ! 💀' : '🎉 ВЫВЕЛ! 🎉'}
            </h2>
            {!hitMine && (
              <p className="text-4xl font-bold text-green-400 mb-6">
                +{((bet * currentMultiplier - bet) / 1000000).toFixed(1)}M₽
              </p>
            )}
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
          <h2 className="text-white text-2xl md:text-3xl font-black">💣 МИНЫ</h2>
          {gameStarted && !gameOver && (
            <div className="text-white text-xl font-bold">
              x{currentMultiplier.toFixed(2)}
            </div>
          )}
        </div>

        <Card className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 border-4 border-gray-700">
          <div className="grid grid-cols-5 gap-2 mb-6">
            {Array.from({ length: 25 }).map((_, i) => (
              <button
                key={i}
                onClick={() => revealTile(i)}
                disabled={!gameStarted || gameOver || revealed[i]}
                className={`aspect-square rounded-lg text-4xl font-black transition-all ${
                  !revealed[i]
                    ? 'bg-gray-700 hover:bg-gray-600 active:scale-95'
                    : mines.includes(i)
                    ? 'bg-red-600 animate-pulse'
                    : 'bg-green-600'
                } disabled:cursor-not-allowed flex items-center justify-center`}
              >
                {revealed[i] && (mines.includes(i) ? '💣' : '💎')}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {!gameStarted && (
              <>
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
                        className={`flex-1 ${
                          bet === amount ? 'bg-gray-600' : 'bg-gray-800'
                        } hover:bg-gray-600 text-xs md:text-sm`}
                      >
                        {amount >= 1000000 ? `${(amount / 1000000)}M` : `${(amount / 1000)}K`}₽
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">Мин:</span>
                    <span className="text-white text-xl font-black">{minesCount}</span>
                  </div>
                  <div className="flex gap-2">
                    {[3, 5, 7, 10].map(count => (
                      <Button
                        key={count}
                        onClick={() => setMinesCount(count)}
                        className={`flex-1 ${
                          minesCount === count ? 'bg-red-600' : 'bg-gray-800'
                        } hover:bg-red-500 text-sm`}
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={startGame}
                  disabled={balance < bet}
                  className="w-full h-16 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-black text-xl disabled:opacity-50"
                >
                  <Icon name="Play" className="mr-2" />
                  НАЧАТЬ ИГРУ
                </Button>
              </>
            )}

            {gameStarted && !gameOver && (
              <Button
                onClick={cashOut}
                className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-black text-xl animate-pulse"
              >
                <Icon name="HandMetal" className="mr-2" />
                ЗАБРАТЬ {(bet * currentMultiplier / 1000000).toFixed(1)}M₽
              </Button>
            )}

            {gameOver && (
              <Button
                onClick={reset}
                className="w-full h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-black text-xl"
              >
                <Icon name="RotateCcw" className="mr-2" />
                НОВАЯ ИГРА
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Mines;
