import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ClassicSlotMachineProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const ClassicSlotMachine = ({ balance, onBalanceChange }: ClassicSlotMachineProps) => {
  const [reels, setReels] = useState<string[]>(['🍒', '🍒', '🍒']);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(1000);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [showJackpot, setShowJackpot] = useState(false);
  const [showLose, setShowLose] = useState(false);
  const [loseMessage, setLoseMessage] = useState({ title: '', text: '', emoji: '' });
  const [lights, setLights] = useState<boolean[]>(Array(20).fill(false));

  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];

  const animateLights = () => {
    let interval: NodeJS.Timeout;
    let counter = 0;
    interval = setInterval(() => {
      setLights(prev => {
        const newLights = [...prev];
        newLights[counter % 20] = !newLights[counter % 20];
        return newLights;
      });
      counter++;
    }, 100);
    return interval;
  };

  const spin = () => {
    if (spinning) return;
    if (balance < bet) {
      return;
    }

    setSpinning(true);
    setLastWin(null);
    onBalanceChange(balance - bet);

    const lightInterval = animateLights();
    const spinDuration = 2000;
    const spinInterval = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);

      elapsed += spinInterval;

      if (elapsed >= spinDuration) {
        clearInterval(interval);
        clearInterval(lightInterval);
        setLights(Array(20).fill(false));
        
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        setReels(finalReels);
        setSpinning(false);
        checkWin(finalReels);
      }
    }, spinInterval);
  };

  const checkWin = (finalReels: string[]) => {
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      if (finalReels[0] === '7️⃣') {
        const jackpotWin = bet * 10000;
        setLastWin(jackpotWin);
        onBalanceChange(balance + jackpotWin);
        setShowJackpot(true);
        setTimeout(() => setShowJackpot(false), 8000);
      } else {
        const normalWin = bet * 1000;
        setLastWin(normalWin);
        onBalanceChange(balance + normalWin);
      }
    } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
      const smallWin = bet * 100;
      setLastWin(smallWin);
      onBalanceChange(balance + smallWin);
    } else {
      setLoseMessage(getRandomLoseMessage());
      setShowLose(true);
      setTimeout(() => setShowLose(false), 5000);
    }
  };

  const getRandomLoseMessage = () => {
    const messages = [
      { title: '💩 ЛОХ! 💩', text: 'ПРОЕБАЛ ДЕНЬГИ!', emoji: '😂' },
      { title: '🤡 ДЕБИЛ! 🤡', text: 'СЛИЛ ВСЁ НАХУЙ!', emoji: '👎' },
      { title: '💀 ОТСОСАЛ! 💀', text: 'ИДИ НАХУЙ ОТСЮДА!', emoji: '🖕' },
      { title: '🤮 ЧМО! 🤮', text: 'ЗАСРАЛ ВСЁ НА ХУЙ!', emoji: '😤' },
      { title: '😈 ПИЗДЕЦ! 😈', text: 'ТЫ ТУПОЙ КАК ПРОБКА!', emoji: '🤬' },
      { title: '👺 ДАУН! 👺', text: 'СЛИВАЙ ДАЛЬШЕ, УЕБАН!', emoji: '👊' },
      { title: '💩 ГОВНО! 💩', text: 'ПОШЁЛ НАХУЙ, ЛОХ!', emoji: '👎' },
      { title: '🤯 ХУЙНЯ! 🤯', text: 'ТЫ ПРОСРАЛ ВСЁ!', emoji: '😭' },
      { title: '👎 НУБ! 👎', text: 'УЧИСЬ ИГРАТЬ, ОТСОС!', emoji: '😡' },
      { title: '🔥 ПИЗДА! 🔥', text: 'ВСЁ ПРОСРАЛ НАХУЙ!', emoji: '😬' }
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const changeBet = (amount: number) => {
    const newBet = bet + amount;
    if (newBet >= 10 && newBet <= 10000000) {
      setBet(newBet);
    }
  };

  return (
    <>
      {showJackpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4 animate-jackpot">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-secondary mb-4 leading-tight">
              🎰 ДЖЕКПОТ! 🎰
            </h1>
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-6 leading-snug">
              СВЯТОЗАР И МАКСИМ -<br />ПИЗДУЙТЕ РАБОТАТЬ<br />НА УЛИЦУ!
            </p>
            <p className="text-3xl sm:text-4xl md:text-6xl font-black text-secondary animate-pulse">
              +{lastWin}₽
            </p>
          </div>
        </div>
      )}
      {showLose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4 animate-jackpot">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-destructive mb-4 leading-tight">
              {loseMessage.title}
            </h1>
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-6 leading-snug">
              {loseMessage.text}
            </p>
            <p className="text-6xl sm:text-7xl md:text-9xl animate-pulse">
              {loseMessage.emoji}
            </p>
          </div>
        </div>
      )}

      <div className="relative max-w-2xl mx-auto">
        <div className="relative bg-gradient-to-b from-red-700 via-red-800 to-red-900 rounded-3xl shadow-2xl border-8 border-yellow-600 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-transparent pointer-events-none"></div>
          
          <div className="relative bg-gradient-to-b from-yellow-600 to-yellow-700 py-4 border-b-4 border-yellow-800">
            <h2 className="text-center text-2xl md:text-4xl font-black text-red-900 tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              СВЯТОЗАР
            </h2>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-600 rounded-full border-4 border-yellow-500 shadow-lg"></div>
          </div>

          <div className="relative p-6 md:p-8">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {lights.slice(0, 10).map((isOn, i) => (
                <div
                  key={`left-${i}`}
                  className={`w-4 h-4 md:w-6 md:h-6 rounded-full transition-all duration-200 ${
                    isOn || spinning ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]' : 'bg-yellow-900'
                  }`}
                ></div>
              ))}
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {lights.slice(10, 20).map((isOn, i) => (
                <div
                  key={`right-${i}`}
                  className={`w-4 h-4 md:w-6 md:h-6 rounded-full transition-all duration-200 ${
                    isOn || spinning ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]' : 'bg-yellow-900'
                  }`}
                ></div>
              ))}
            </div>

            <div className="bg-black/90 rounded-2xl p-4 md:p-6 border-4 border-yellow-700 shadow-inner mx-4 md:mx-8">
              <div className="flex justify-center gap-3 md:gap-4 mb-6">
                {reels.map((symbol, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-xl"></div>
                    <div
                      className={`
                        relative w-20 h-32 md:w-28 md:h-40 bg-white
                        rounded-xl border-4 border-yellow-600
                        flex items-center justify-center
                        shadow-2xl overflow-hidden
                        ${spinning ? 'animate-spin-slot' : ''}
                      `}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100"></div>
                      <span className="relative text-6xl md:text-7xl drop-shadow-lg">
                        {symbol}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {lastWin && !spinning && (
                <div className="text-center mb-4 animate-fade-in">
                  <p className="text-3xl md:text-4xl font-black text-yellow-400" style={{ textShadow: '0 0 20px rgba(250,204,21,0.8), 2px 2px 4px rgba(0,0,0,0.5)' }}>
                    ВЫИГРЫШ: {lastWin}₽
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-b from-red-800 to-red-900 rounded-lg p-4 border-2 border-yellow-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-yellow-400 font-bold text-sm md:text-base">Ставка:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => changeBet(-1000)}
                      disabled={spinning || bet <= 10}
                      className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold h-8 w-8 p-0"
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="text-yellow-400 text-xl md:text-2xl font-black min-w-[100px] text-center">
                      {bet.toLocaleString()}₽
                    </span>
                    <Button
                      size="sm"
                      onClick={() => changeBet(1000)}
                      disabled={spinning || bet >= 10000000}
                      className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold h-8 w-8 p-0"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={spin}
                  disabled={spinning || balance < bet}
                  className="w-full bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-yellow-400 text-xl md:text-2xl font-black py-6 md:py-8 border-4 border-yellow-600 shadow-lg"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {spinning ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-6 w-6 md:h-8 md:w-8 animate-spin" />
                      ВРАЩАЕТСЯ...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="mr-2 h-6 w-6 md:h-8 md:w-8" />
                      КРУТИТЬ
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-red-900 to-black py-3 border-t-4 border-yellow-800">
            <div className="flex justify-center gap-2 md:gap-4 px-4">
              <div className="bg-black/50 px-3 py-1 rounded border border-yellow-600">
                <span className="text-yellow-400 text-xs md:text-sm font-bold">7️⃣7️⃣7️⃣ = x10000</span>
              </div>
              <div className="bg-black/50 px-3 py-1 rounded border border-yellow-600">
                <span className="text-yellow-400 text-xs md:text-sm font-bold">3 одинак. = x1000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassicSlotMachine;
