import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DiceProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const Dice = ({ balance, onBalanceChange }: DiceProps) => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [bet, setBet] = useState(100000);
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  const roll = () => {
    if (rolling || !selectedBet || balance < bet) return;

    setRolling(true);
    setLastWin(null);
    setShowResult(false);
    onBalanceChange(balance - bet);

    let rollCount = 0;
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      rollCount++;

      if (rollCount > 15) {
        clearInterval(interval);
        const finalDice1 = Math.floor(Math.random() * 6) + 1;
        const finalDice2 = Math.floor(Math.random() * 6) + 1;
        setDice1(finalDice1);
        setDice2(finalDice2);
        setRolling(false);
        checkWin(finalDice1, finalDice2);
      }
    }, 100);
  };

  const checkWin = (d1: number, d2: number) => {
    const sum = d1 + d2;
    let winAmount = 0;

    if (selectedBet === 'high' && sum >= 8) {
      winAmount = bet * 2;
    } else if (selectedBet === 'low' && sum <= 6) {
      winAmount = bet * 2;
    } else if (selectedBet === 'seven' && sum === 7) {
      winAmount = bet * 5;
    } else if (selectedBet === 'double' && d1 === d2) {
      winAmount = bet * 10;
    } else if (selectedBet === 'even' && sum % 2 === 0) {
      winAmount = bet * 2;
    } else if (selectedBet === 'odd' && sum % 2 === 1) {
      winAmount = bet * 2;
    }

    if (winAmount > 0) {
      setLastWin(winAmount);
      onBalanceChange(balance + winAmount);
    }

    setShowResult(true);
    setTimeout(() => setShowResult(false), 4000);
  };

  const changeBet = (amount: number) => {
    const newBet = bet + amount;
    if (newBet >= 10000 && newBet <= 10000000) {
      setBet(newBet);
    }
  };

  return (
    <>
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4">
            <div className="text-9xl mb-8 animate-bounce">
              {lastWin ? '🎲' : '💀'}
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl animate-pulse ${
              lastWin ? 'text-green-500' : 'text-red-500'
            }`}>
              {lastWin ? '🎉 НАХУЙ ВЫИГРАЛ! 🎉' : '💀 ПРОЕБАЛ, СУКА! 💀'}
            </h1>
            <div className="text-4xl md:text-6xl font-bold text-white mb-4">
              Выпало: <span className="text-yellow-400 font-black">{dice1 + dice2}</span>
            </div>
            {lastWin ? (
              <p className="text-3xl md:text-5xl font-bold text-green-400 animate-pulse">
                +{(lastWin / 1000000).toFixed(1)}M₽
              </p>
            ) : (
              <p className="text-xl md:text-2xl text-white/70 font-semibold">
                Проебал: {(bet / 1000000).toFixed(1)}M₽
              </p>
            )}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-4">
        <Card className="bg-gradient-to-br from-red-900 to-red-950 border-8 border-yellow-600 p-4 md:p-6">
          <div className="text-center mb-6">
            <h2 className="text-white text-3xl md:text-4xl font-black mb-2">🎲 КОСТИ 🎲</h2>
            <p className="text-yellow-400 text-lg font-bold">Угадай сумму на костях!</p>
          </div>

          <div className="flex justify-center gap-6 mb-6">
            <div className={`w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-2xl flex items-center justify-center border-4 border-gray-300 ${
              rolling ? 'animate-spin' : ''
            }`}>
              <span className="text-6xl md:text-7xl">{diceEmojis[dice1 - 1]}</span>
            </div>
            <div className={`w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-2xl flex items-center justify-center border-4 border-gray-300 ${
              rolling ? 'animate-spin' : ''
            }`}>
              <span className="text-6xl md:text-7xl">{diceEmojis[dice2 - 1]}</span>
            </div>
          </div>

          {!rolling && (
            <div className="text-center">
              <div className="inline-block bg-yellow-500 px-6 py-3 rounded-lg">
                <span className="text-black text-3xl md:text-4xl font-black">
                  СУММА: {dice1 + dice2}
                </span>
              </div>
            </div>
          )}
        </Card>

        <Card className="bg-[#0f1419] border border-gray-800 p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setSelectedBet('high')}
                className={`h-16 text-lg font-black ${
                  selectedBet === 'high' ? 'ring-4 ring-yellow-400 bg-green-600' : 'bg-green-700'
                } hover:bg-green-600`}
              >
                БОЛЬШЕ 7<br/>
                <span className="text-sm">x2</span>
              </Button>
              <Button
                onClick={() => setSelectedBet('low')}
                className={`h-16 text-lg font-black ${
                  selectedBet === 'low' ? 'ring-4 ring-yellow-400 bg-blue-600' : 'bg-blue-700'
                } hover:bg-blue-600`}
              >
                МЕНЬШЕ 7<br/>
                <span className="text-sm">x2</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setSelectedBet('even')}
                className={`h-16 text-lg font-black ${
                  selectedBet === 'even' ? 'ring-4 ring-yellow-400 bg-purple-600' : 'bg-purple-700'
                } hover:bg-purple-600`}
              >
                ЧЁТНОЕ<br/>
                <span className="text-sm">x2</span>
              </Button>
              <Button
                onClick={() => setSelectedBet('odd')}
                className={`h-16 text-lg font-black ${
                  selectedBet === 'odd' ? 'ring-4 ring-yellow-400 bg-pink-600' : 'bg-pink-700'
                } hover:bg-pink-600`}
              >
                НЕЧЁТНОЕ<br/>
                <span className="text-sm">x2</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setSelectedBet('seven')}
                className={`h-16 text-lg font-black ${
                  selectedBet === 'seven' ? 'ring-4 ring-yellow-400 bg-orange-600' : 'bg-orange-700'
                } hover:bg-orange-600`}
              >
                РОВНО 7<br/>
                <span className="text-sm">x5</span>
              </Button>
              <Button
                onClick={() => setSelectedBet('double')}
                className={`h-16 text-lg font-black ${
                  selectedBet === 'double' ? 'ring-4 ring-yellow-400 bg-red-600' : 'bg-red-700'
                } hover:bg-red-600`}
              >
                ДУБЛЬ<br/>
                <span className="text-sm">x10</span>
              </Button>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Ставка:</span>
                <span className="text-white text-xl font-black">{(bet / 1000000).toFixed(1)}M₽</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => changeBet(-100000)} className="flex-1 bg-gray-800 hover:bg-gray-700">
                  <Icon name="Minus" size={18} />
                </Button>
                <Button onClick={() => changeBet(100000)} className="flex-1 bg-gray-800 hover:bg-gray-700">
                  <Icon name="Plus" size={18} />
                </Button>
              </div>
            </div>

            <Button
              onClick={roll}
              disabled={rolling || !selectedBet || balance < bet}
              className="w-full h-16 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black text-xl disabled:opacity-50"
            >
              {rolling ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" />
                  КАТЯТСЯ...
                </>
              ) : (
                <>
                  <Icon name="Dices" className="mr-2" />
                  БРОСИТЬ КОСТИ
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dice;
