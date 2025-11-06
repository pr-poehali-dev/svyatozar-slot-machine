import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { playSound } from '@/utils/sounds';

interface RouletteProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

type BetType = 'number' | 'red' | 'black' | 'even' | 'odd' | 'green' | '1-18' | '19-36';

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
  const [currentBetAmount, setCurrentBetAmount] = useState(100000);
  const [history, setHistory] = useState<number[]>([]);

  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

  const getNumberColor = (num: number): string => {
    if (num === 0) return 'bg-green-600';
    if (redNumbers.includes(num)) return 'bg-red-600';
    return 'bg-black';
  };

  const getColorClass = (num: number): string => {
    if (num === 0) return 'green';
    if (redNumbers.includes(num)) return 'red';
    return 'black';
  };

  const placeBet = (type: BetType, value?: number) => {
    if (balance < currentBetAmount) return;
    
    playSound('click');
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
    playSound('spin');
    const spinResult = Math.floor(Math.random() * 37);
    const spinRotations = 8 + Math.random() * 4;
    const degreePerNumber = 360 / 37;
    const finalRotation = rotation + spinRotations * 360 + (360 - spinResult * degreePerNumber);

    setRotation(finalRotation);
    
    setTimeout(() => {
      setResult(spinResult);
      setHistory([spinResult, ...history.slice(0, 9)]);
      calculateWinnings(spinResult);
      setSpinning(false);
      setBets([]);
    }, 5000);
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
          if (resultNum !== 0 && resultNum % 2 === 0) {
            won = true;
            multiplier = 2;
          }
          break;
        case 'odd':
          if (resultNum % 2 === 1) {
            won = true;
            multiplier = 2;
          }
          break;
        case '1-18':
          if (resultNum >= 1 && resultNum <= 18) {
            won = true;
            multiplier = 2;
          }
          break;
        case '19-36':
          if (resultNum >= 19 && resultNum <= 36) {
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
      playSound('win');
      onBalanceChange(balance + totalWinAmount);
    } else {
      playSound('lose');
    }
  };

  const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
  const betChips = [10000, 50000, 100000, 500000, 1000000];

  const wheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
    5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a4d2e] via-[#0d5c38] to-[#0a4d2e] p-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-[#1a1a1a] border border-[#2d5f3f] rounded-lg p-6 mb-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[#c9b037] text-sm font-medium mb-1">EUROPEAN ROULETTE</div>
              <div className="text-white text-2xl font-bold">Evolution Gaming</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs mb-1">BALANCE</div>
              <div className="text-[#c9b037] text-2xl font-bold">{(balance).toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">History:</span>
              <div className="flex gap-1">
                {history.map((num, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getNumberColor(num)} border-2 border-[#c9b037]/30`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#1a1a1a] border border-[#2d5f3f] rounded-lg p-6 shadow-2xl">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8b4513] via-[#a0522d] to-[#654321] shadow-2xl">
                <div className="absolute inset-4 rounded-full border-8 border-[#c9b037]">
                  <div 
                    className="absolute inset-0 rounded-full" 
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: spinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                    }}
                  >
                    {wheelNumbers.map((num, idx) => {
                      const angle = (idx * 360) / wheelNumbers.length;
                      return (
                        <div
                          key={num}
                          className="absolute top-1/2 left-1/2 origin-left"
                          style={{
                            transform: `rotate(${angle}deg) translateX(90px)`,
                            width: '40px',
                            marginTop: '-20px',
                            marginLeft: '-20px',
                          }}
                        >
                          <div className={`w-10 h-10 ${getNumberColor(num)} rounded flex items-center justify-center text-white text-sm font-bold border-2 border-[#c9b037]`}>
                            {num}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-xl flex items-center justify-center">
                      <div className="text-black text-xs font-bold text-center">ROULETTE</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#c9b037] drop-shadow-lg z-10"></div>
                </div>
              </div>
            </div>

            {result !== null && !spinning && (
              <div className="text-center mt-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getNumberColor(result)} border-4 border-[#c9b037] shadow-xl mx-auto`}>
                  <span className="text-white text-3xl font-bold">{result}</span>
                </div>
                <div className="text-[#c9b037] text-lg font-bold mt-2 uppercase">{getColorClass(result)}</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-[#1a1a1a] border border-[#2d5f3f] rounded-lg p-4 shadow-2xl">
              <div className="text-gray-400 text-sm mb-2">SELECT CHIP VALUE</div>
              <div className="grid grid-cols-5 gap-2">
                {betChips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => setCurrentBetAmount(chip)}
                    className={`relative w-full aspect-square rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      currentBetAmount === chip 
                        ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black scale-110 ring-4 ring-[#c9b037]' 
                        : 'bg-gradient-to-br from-[#4a4a4a] to-[#2a2a2a] text-white hover:scale-105'
                    }`}
                  >
                    {chip >= 1000000 ? `${chip/1000000}M` : `${chip/1000}K`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0d5c38] border-2 border-[#c9b037] rounded-lg p-4 shadow-2xl">
              <div className="grid grid-cols-3 gap-1 mb-2">
                {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map(num => (
                  <button
                    key={num}
                    onClick={() => placeBet('number', num)}
                    disabled={spinning}
                    className={`h-12 ${getNumberColor(num)} text-white font-bold border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <button onClick={() => placeBet('red')} disabled={spinning} className="h-14 bg-red-600 hover:bg-red-500 text-white font-bold border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50">
                  RED
                </button>
                <button onClick={() => placeBet('black')} disabled={spinning} className="h-14 bg-black hover:bg-gray-900 text-white font-bold border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50">
                  BLACK
                </button>
                <button onClick={() => placeBet('even')} disabled={spinning} className="h-14 bg-[#1a1a1a] hover:bg-gray-800 text-white font-bold border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50">
                  EVEN
                </button>
                <button onClick={() => placeBet('odd')} disabled={spinning} className="h-14 bg-[#1a1a1a] hover:bg-gray-800 text-white font-bold border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50">
                  ODD
                </button>
                <button onClick={() => placeBet('1-18')} disabled={spinning} className="h-14 bg-[#1a1a1a] hover:bg-gray-800 text-white font-bold border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50">
                  1-18
                </button>
                <button onClick={() => placeBet('19-36')} disabled={spinning} className="h-14 bg-[#1a1a1a] hover:bg-gray-800 text-white font-bold border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50">
                  19-36
                </button>
              </div>

              <button onClick={() => placeBet('green', 0)} disabled={spinning} className="w-full h-14 bg-green-600 hover:bg-green-500 text-white font-bold mt-2 border-2 border-[#c9b037]/50 hover:border-[#c9b037] transition-all disabled:opacity-50">
                ZERO (36x)
              </button>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2d5f3f] rounded-lg p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">TOTAL BET:</span>
                <span className="text-[#c9b037] text-xl font-bold">{totalBetAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={clearBets}
                  disabled={bets.length === 0 || spinning}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold h-12 disabled:opacity-50"
                >
                  CLEAR BETS
                </Button>
                <Button
                  onClick={spin}
                  disabled={bets.length === 0 || spinning}
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-black font-black h-12 text-lg disabled:opacity-50"
                >
                  {spinning ? 'SPINNING...' : 'SPIN'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roulette;