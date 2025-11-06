import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RouletteProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

type BetType = 'number' | 'red' | 'black' | 'even' | 'odd' | 'green';

interface Bet {
  type: BetType;
  value?: number;
  amount: number;
}

const Roulette = ({ balance, onBalanceChange }: RouletteProps) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [bets, setBets] = useState<Bet[]>([]);
  const [currentBetAmount, setCurrentBetAmount] = useState(10000);
  const [showResult, setShowResult] = useState(false);
  const [totalWin, setTotalWin] = useState(0);

  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

  const getNumberColor = (num: number): string => {
    if (num === 0) return 'green';
    if (redNumbers.includes(num)) return 'red';
    return 'black';
  };

  const placeBet = (type: BetType, value?: number) => {
    if (balance < currentBetAmount) return;
    
    const newBet: Bet = { type, amount: currentBetAmount };
    if (value !== undefined) newBet.value = value;
    
    setBets([...bets, newBet]);
    onBalanceChange(balance - currentBetAmount);
  };

  const clearBets = () => {
    const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);
    setBets([]);
    onBalanceChange(balance + totalBet);
  };

  const spin = () => {
    if (bets.length === 0 || spinning) return;

    setSpinning(true);
    setShowResult(false);
    setTotalWin(0);

    const spinResult = Math.floor(Math.random() * 37);
    const spinRotations = 5 + Math.random() * 3;
    const degreePerNumber = 360 / 37;
    const finalRotation = spinRotations * 360 + spinResult * degreePerNumber;

    setRotation(finalRotation);
    setResult(spinResult);

    setTimeout(() => {
      setSpinning(false);
      calculateWinnings(spinResult);
    }, 4000);
  };

  const calculateWinnings = (resultNum: number) => {
    let totalWinAmount = 0;

    bets.forEach(bet => {
      let won = false;
      let multiplier = 0;

      switch (bet.type) {
        case 'number':
          if (bet.value === resultNum) {
            won = true;
            multiplier = 36;
          }
          break;
        case 'red':
          if (redNumbers.includes(resultNum)) {
            won = true;
            multiplier = 2;
          }
          break;
        case 'black':
          if (blackNumbers.includes(resultNum)) {
            won = true;
            multiplier = 2;
          }
          break;
        case 'green':
          if (resultNum === 0) {
            won = true;
            multiplier = 36;
          }
          break;
        case 'even':
          if (resultNum > 0 && resultNum % 2 === 0) {
            won = true;
            multiplier = 2;
          }
          break;
        case 'odd':
          if (resultNum > 0 && resultNum % 2 === 1) {
            won = true;
            multiplier = 2;
          }
          break;
      }

      if (won) {
        totalWinAmount += bet.amount * multiplier;
      }
    });

    if (totalWinAmount > 0) {
      onBalanceChange(balance + totalWinAmount);
      setTotalWin(totalWinAmount);
    }

    setShowResult(true);
    setBets([]);
  };

  const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);

  return (
    <>
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4">
            <div className={`text-9xl mb-6 ${
              result === 0 ? 'text-green-500' : 
              redNumbers.includes(result!) ? 'text-red-500' : 
              'text-gray-300'
            }`}>
              {result}
            </div>
            <h2 className={`text-5xl md:text-7xl font-black mb-4 ${
              totalWin > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {totalWin > 0 ? 'ВЫИГРЫШ!' : 'ПРОИГРАЛ!'}
            </h2>
            {totalWin > 0 && (
              <p className="text-4xl md:text-5xl font-bold text-white mb-6">
                +{(totalWin / 1000000).toFixed(1)}M₽
              </p>
            )}
            <Button
              onClick={() => setShowResult(false)}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 text-lg"
            >
              Продолжить
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl md:text-3xl font-black">🎰 РУЛЕТКА</h2>
          <div className="text-white text-lg">
            Ставки: <span className="text-orange-500 font-bold">{(totalBetAmount / 1000000).toFixed(1)}M₽</span>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-red-900 via-green-900 to-black p-6 md:p-8 border-4 border-yellow-600">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-900 p-4">
              <div 
                className="w-full h-full rounded-full relative transition-transform duration-[4000ms] ease-out"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: 'conic-gradient(from 0deg, #ef4444 0deg, #000 9.73deg, #ef4444 19.46deg, #000 29.19deg, #ef4444 38.92deg, #000 48.65deg, #ef4444 58.38deg, #000 68.11deg, #ef4444 77.84deg, #000 87.57deg, #ef4444 97.3deg, #000 107.03deg, #ef4444 116.76deg, #000 126.49deg, #ef4444 136.22deg, #000 145.95deg, #ef4444 155.68deg, #000 165.41deg, #ef4444 175.14deg, #22c55e 180deg, #000 189.73deg, #ef4444 199.46deg, #000 209.19deg, #ef4444 218.92deg, #000 228.65deg, #ef4444 238.38deg, #000 248.11deg, #ef4444 257.84deg, #000 267.57deg, #ef4444 277.3deg, #000 287.03deg, #ef4444 296.76deg, #000 306.49deg, #ef4444 316.22deg, #000 325.95deg, #ef4444 335.68deg, #000 345.41deg, #ef4444 355.14deg)'
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-yellow-600 z-10"></div>
              </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-400 z-20"></div>
          </div>

          {result !== null && !spinning && (
            <div className="text-center mb-4">
              <div className={`inline-block px-6 py-3 rounded-lg text-4xl font-black ${
                result === 0 ? 'bg-green-600' :
                redNumbers.includes(result) ? 'bg-red-600' : 'bg-gray-800'
              } text-white`}>
                {result}
              </div>
            </div>
          )}
        </Card>

        <Card className="bg-[#0f1419] border border-gray-800 p-4">
          <div className="mb-4">
            <h3 className="text-white font-bold mb-3">Размер ставки</h3>
            <div className="grid grid-cols-4 gap-2">
              {[10000, 50000, 100000, 500000].map(amount => (
                <Button
                  key={amount}
                  onClick={() => setCurrentBetAmount(amount)}
                  className={`${
                    currentBetAmount === amount 
                      ? 'bg-orange-600 hover:bg-orange-500' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  } text-white text-xs md:text-sm font-bold`}
                >
                  {amount >= 1000000 ? `${(amount / 1000000).toFixed(0)}M` : `${(amount / 1000).toFixed(0)}K`}₽
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              onClick={() => placeBet('red')}
              disabled={spinning || balance < currentBetAmount}
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-6 text-lg disabled:opacity-50"
            >
              КРАСНОЕ x2
            </Button>
            <Button
              onClick={() => placeBet('black')}
              disabled={spinning || balance < currentBetAmount}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 text-lg disabled:opacity-50"
            >
              ЧЁРНОЕ x2
            </Button>
            <Button
              onClick={() => placeBet('even')}
              disabled={spinning || balance < currentBetAmount}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 text-lg disabled:opacity-50"
            >
              ЧЁТНОЕ x2
            </Button>
            <Button
              onClick={() => placeBet('odd')}
              disabled={spinning || balance < currentBetAmount}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-6 text-lg disabled:opacity-50"
            >
              НЕЧЁТНОЕ x2
            </Button>
            <Button
              onClick={() => placeBet('green', 0)}
              disabled={spinning || balance < currentBetAmount}
              className="col-span-2 bg-green-600 hover:bg-green-500 text-white font-bold py-6 text-lg disabled:opacity-50"
            >
              ЗЕЛЁНОЕ (0) x36
            </Button>
          </div>

          <div className="grid grid-cols-6 gap-1 mb-4">
            {Array.from({ length: 36 }, (_, i) => i + 1).map(num => (
              <Button
                key={num}
                onClick={() => placeBet('number', num)}
                disabled={spinning || balance < currentBetAmount}
                className={`${
                  redNumbers.includes(num) ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-800 hover:bg-gray-700'
                } text-white font-bold py-3 text-xs disabled:opacity-50`}
              >
                {num}
              </Button>
            ))}
          </div>

          {bets.length > 0 && (
            <div className="mb-4 p-3 bg-gray-900 rounded-lg">
              <h4 className="text-white text-sm font-bold mb-2">Ваши ставки:</h4>
              <div className="flex flex-wrap gap-2">
                {bets.map((bet, idx) => (
                  <div key={idx} className="bg-gray-800 px-2 py-1 rounded text-white text-xs">
                    {bet.type === 'number' ? `№${bet.value}` : 
                     bet.type === 'red' ? 'Красное' :
                     bet.type === 'black' ? 'Чёрное' :
                     bet.type === 'green' ? 'Зелёное' :
                     bet.type === 'even' ? 'Чётное' : 'Нечётное'} - {(bet.amount / 1000).toFixed(0)}K₽
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={spin}
              disabled={spinning || bets.length === 0}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black py-6 text-xl disabled:opacity-50"
            >
              {spinning ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" />
                  КРУТИМ...
                </>
              ) : (
                <>
                  <Icon name="Play" className="mr-2" />
                  КРУТИТЬ
                </>
              )}
            </Button>
            {bets.length > 0 && (
              <Button
                onClick={clearBets}
                disabled={spinning}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-6 px-6"
              >
                <Icon name="X" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Roulette;
