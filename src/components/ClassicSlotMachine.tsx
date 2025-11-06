import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { playSound } from '@/utils/sounds';

interface ClassicSlotMachineProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const ClassicSlotMachine = ({ balance, onBalanceChange }: ClassicSlotMachineProps) => {
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<string[]>(['💎', '💎', '💎']);
  const [bet, setBet] = useState(100000);
  const [lastWin, setLastWin] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  const symbols = ['💎', '⭐', '🍒', '🔔', '7️⃣', '🍋', '🍊', 'BAR'];
  const symbolValues: Record<string, number> = {
    '💎': 50,
    '⭐': 30,
    '7️⃣': 20,
    '🔔': 15,
    '🍒': 10,
    '🍋': 8,
    '🍊': 6,
    'BAR': 5,
  };

  const betOptions = [10000, 50000, 100000, 500000, 1000000];

  const spin = () => {
    if (balance < bet || spinning) return;

    setSpinning(true);
    playSound('spin');
    setLastWin(0);
    onBalanceChange(balance - bet);

    const spinDuration = 2000;
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      
      setReels(finalReels);
      checkWin(finalReels);
      setSpinning(false);
      setSpinCount(spinCount + 1);
    }, spinDuration);
  };

  const checkWin = (finalReels: string[]) => {
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const winAmount = bet * symbolValues[finalReels[0]];
      playSound('win');
      setLastWin(winAmount);
      onBalanceChange(balance + winAmount);
    } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
      const matchSymbol = finalReels[0] === finalReels[1] ? finalReels[0] : finalReels[1];
      const winAmount = bet * (symbolValues[matchSymbol] * 0.3);
      playSound('win');
      setLastWin(winAmount);
      onBalanceChange(balance + winAmount);
    } else {
      playSound('lose');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0a2e] via-[#240046] to-[#0f0525] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-gradient-to-b from-[#2a1a4e] to-[#1a0a2e] rounded-3xl shadow-2xl border-4 border-[#FFD700] p-8">
          
          <div className="text-center mb-6">
            <div className="text-[#FFD700] text-4xl font-black mb-2 tracking-wider" style={{textShadow: '0 0 20px rgba(255,215,0,0.5)'}}>
              💎 DIAMOND FORTUNE 💎
            </div>
            <div className="text-white/70 text-sm uppercase tracking-widest">Pragmatic Play Premium Slot</div>
          </div>

          <div className="grid md:grid-cols-[1fr_300px] gap-6 mb-6">
            <div className="bg-black rounded-2xl p-8 border-4 border-[#FFD700] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none"></div>
              
              <div className="grid grid-cols-3 gap-6 mb-8 relative z-10">
                {reels.map((symbol, idx) => (
                  <div
                    key={idx}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/30 to-transparent rounded-2xl blur-xl"></div>
                    <div className={`relative bg-gradient-to-br from-[#2a1552] to-[#1a0a3e] rounded-2xl border-4 ${spinning ? 'border-[#FFD700]' : 'border-[#9370DB]'} aspect-square flex items-center justify-center shadow-2xl transition-all ${spinning ? 'animate-pulse' : ''}`}>
                      <div className={`text-8xl ${spinning ? 'animate-bounce' : ''} transition-all`} style={{textShadow: '0 0 30px rgba(255,215,0,0.8)'}}>
                        {symbol}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {lastWin > 0 && !spinning && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-sm animate-fade-in">
                  <div className="text-center">
                    <div className="text-[#FFD700] text-6xl font-black mb-4 animate-pulse" style={{textShadow: '0 0 40px rgba(255,215,0,0.8)'}}>
                      BIG WIN!
                    </div>
                    <div className="text-white text-4xl font-bold">
                      +{lastWin.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#2a1552] to-[#1a0a3e] rounded-xl p-5 border-2 border-[#9370DB]">
                <div className="text-[#FFD700] text-xs uppercase tracking-wider mb-2">Balance</div>
                <div className="text-white text-2xl font-bold">{balance.toLocaleString('ru-RU')} ₽</div>
              </div>

              <div className="bg-gradient-to-br from-[#2a1552] to-[#1a0a3e] rounded-xl p-5 border-2 border-[#9370DB]">
                <div className="text-[#FFD700] text-xs uppercase tracking-wider mb-3">Bet Amount</div>
                <div className="grid grid-cols-2 gap-2">
                  {betOptions.map(amount => (
                    <button
                      key={amount}
                      onClick={() => setBet(amount)}
                      disabled={spinning}
                      className={`py-3 px-4 rounded-lg font-bold transition-all ${
                        bet === amount
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black scale-105'
                          : 'bg-[#1a0a2e] text-white hover:bg-[#2a1a4e]'
                      } disabled:opacity-50 border-2 ${bet === amount ? 'border-[#FFD700]' : 'border-[#9370DB]/50'}`}
                    >
                      {amount >= 1000000 ? `${amount/1000000}M` : `${amount/1000}K`}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={spin}
                disabled={spinning || balance < bet}
                className="w-full h-16 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] hover:from-[#FFA500] hover:via-[#FFD700] hover:to-[#FFA500] text-black font-black text-xl disabled:opacity-50 rounded-xl border-4 border-[#FFD700] shadow-2xl transition-all disabled:cursor-not-allowed"
                style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}
              >
                {spinning ? 'SPINNING...' : 'SPIN'}
              </Button>

              <div className="bg-gradient-to-br from-[#2a1552] to-[#1a0a3e] rounded-xl p-5 border-2 border-[#9370DB]">
                <div className="text-[#FFD700] text-xs uppercase tracking-wider mb-3">Paytable</div>
                <div className="space-y-2 text-xs">
                  {Object.entries(symbolValues).map(([symbol, multiplier]) => (
                    <div key={symbol} className="flex items-center justify-between text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{symbol}</span>
                        <span className="text-lg">{symbol}</span>
                        <span className="text-base">{symbol}</span>
                      </div>
                      <span className="font-bold text-[#FFD700]">{multiplier}x</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#1a0a2e] rounded-lg p-3 border border-[#9370DB]/50">
              <div className="text-white/60 text-xs mb-1">Total Spins</div>
              <div className="text-[#FFD700] text-xl font-bold">{spinCount}</div>
            </div>
            <div className="bg-[#1a0a2e] rounded-lg p-3 border border-[#9370DB]/50">
              <div className="text-white/60 text-xs mb-1">Current Bet</div>
              <div className="text-[#FFD700] text-xl font-bold">{bet.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="bg-[#1a0a2e] rounded-lg p-3 border border-[#9370DB]/50">
              <div className="text-white/60 text-xs mb-1">Last Win</div>
              <div className="text-[#FFD700] text-xl font-bold">{lastWin.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicSlotMachine;