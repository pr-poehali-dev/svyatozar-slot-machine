import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface SlotMachineProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const SlotMachine = ({ balance, onBalanceChange }: SlotMachineProps) => {
  const [reels, setReels] = useState<number[]>([7, 7, 7]);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const spin = () => {
    if (spinning) return;
    if (balance < bet) {
      toast.error('Недостаточно средств!');
      return;
    }

    setSpinning(true);
    setLastWin(null);
    onBalanceChange(balance - bet);

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
        
        const finalReels = [7, 7, 7];
        
        setReels(finalReels);
        setSpinning(false);
        checkWin(finalReels);
      }
    }, spinInterval);
  };

  const checkWin = (finalReels: number[]) => {
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      if (finalReels[0] === 7) {
        const jackpotWin = bet * 100;
        setLastWin(jackpotWin);
        onBalanceChange(balance + jackpotWin);
        toast.success('🎰 СВЯТОЗАР И МАКСИМ - ПИЗДУЙТЕ РАБОТАТЬ НА УЛИЦУ!', {
          description: `Джекпот ${jackpotWin}₽!`,
          duration: 8000
        });
      } else {
        const normalWin = bet * 10;
        setLastWin(normalWin);
        onBalanceChange(balance + normalWin);
        toast.success(`Три ${finalReels[0]}! Вы выиграли ${normalWin}₽!`);
      }
    } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
      const smallWin = bet * 2;
      setLastWin(smallWin);
      onBalanceChange(balance + smallWin);
      toast.success(`Пара! Вы выиграли ${smallWin}₽!`);
    } else {
      toast.error('Не повезло! Попробуйте еще раз');
    }
  };

  const changeBet = (amount: number) => {
    const newBet = bet + amount;
    if (newBet >= 10 && newBet <= 1000) {
      setBet(newBet);
    }
  };

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 shadow-2xl">
      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className={`
                w-24 h-32 bg-gradient-to-b from-muted to-muted/50 
                rounded-xl border-4 border-primary/50 
                flex items-center justify-center
                shadow-lg
                ${spinning ? 'animate-spin-slot' : 'animate-fade-in'}
                ${symbol === 7 && !spinning ? 'animate-pulse-glow' : ''}
              `}
            >
              <span 
                className={`
                  text-6xl font-bold
                  ${symbol === 7 ? 'text-secondary animate-jackpot' : 'text-foreground'}
                `}
              >
                {symbol}
              </span>
            </div>
          ))}
        </div>

        {lastWin && (
          <div className="text-center animate-fade-in">
            <p className="text-3xl font-bold text-secondary">
              +{lastWin}₽
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
            <span className="text-sm text-muted-foreground">Ставка:</span>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => changeBet(-10)}
                disabled={spinning || bet <= 10}
              >
                <Icon name="Minus" size={16} />
              </Button>
              <span className="text-2xl font-bold min-w-[80px] text-center">
                {bet}₽
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => changeBet(10)}
                disabled={spinning || bet >= 1000}
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full text-xl font-bold py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            onClick={spin}
            disabled={spinning || balance < bet}
          >
            {spinning ? (
              <>
                <Icon name="Loader2" className="mr-2 h-6 w-6 animate-spin" />
                Вращается...
              </>
            ) : (
              <>
                <Icon name="Play" className="mr-2 h-6 w-6" />
                Крутить
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SlotMachine;