import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { playSound } from '@/utils/sounds';

interface BlackjackProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

type CardType = {
  suit: string;
  value: string;
  points: number;
};

const Blackjack = ({ balance, onBalanceChange }: BlackjackProps) => {
  const [playerCards, setPlayerCards] = useState<CardType[]>([]);
  const [dealerCards, setDealerCards] = useState<CardType[]>([]);
  const [bet, setBet] = useState(100000);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'finished'>('betting');
  const [result, setResult] = useState<string>('');
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number}>>([]);

  const suits = ['♠', '♥', '♣', '♦'];
  const suitColors: Record<string, string> = {
    '♠': 'text-black',
    '♣': 'text-black',
    '♥': 'text-red-600',
    '♦': 'text-red-600',
  };
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const getCardPoints = (value: string): number => {
    if (value === 'A') return 11;
    if (['J', 'Q', 'K'].includes(value)) return 10;
    return parseInt(value);
  };

  const drawCard = (): CardType => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value, points: getCardPoints(value) };
  };

  const calculateScore = (cards: CardType[]): number => {
    let score = cards.reduce((sum, card) => sum + card.points, 0);
    let aces = cards.filter(card => card.value === 'A').length;

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  const startGame = () => {
    if (balance < bet) return;

    playSound('deal');
    onBalanceChange(balance - bet);
    const player = [drawCard(), drawCard()];
    const dealer = [drawCard(), drawCard()];

    setPlayerCards(player);
    setDealerCards(dealer);
    setGameState('playing');
    setResult('');

    if (calculateScore(player) === 21) {
      endGame(player, dealer);
    }
  };

  const hit = () => {
    playSound('card');
    const newPlayerCards = [...playerCards, drawCard()];
    setPlayerCards(newPlayerCards);

    if (calculateScore(newPlayerCards) > 21) {
      endGame(newPlayerCards, dealerCards);
    }
  };

  const stand = () => {
    let newDealerCards = [...dealerCards];

    while (calculateScore(newDealerCards) < 17) {
      newDealerCards = [...newDealerCards, drawCard()];
    }

    setDealerCards(newDealerCards);
    endGame(playerCards, newDealerCards);
  };

  const endGame = (playerFinal: CardType[], dealerFinal: CardType[]) => {
    const playerScore = calculateScore(playerFinal);
    const dealerScore = calculateScore(dealerFinal);

    let resultText = '';
    let winAmount = 0;

    if (playerScore > 21) {
      resultText = 'BUST - DEALER WINS';
    } else if (dealerScore > 21) {
      resultText = 'DEALER BUST - YOU WIN!';
      winAmount = bet * 2;
    } else if (playerScore === 21 && playerFinal.length === 2) {
      resultText = 'BLACKJACK! YOU WIN!';
      winAmount = bet * 2.5;
    } else if (playerScore > dealerScore) {
      resultText = 'YOU WIN!';
      winAmount = bet * 2;
    } else if (playerScore === dealerScore) {
      resultText = 'PUSH - TIE';
      winAmount = bet;
    } else {
      resultText = 'DEALER WINS';
    }

    if (winAmount > 0) {
      if (resultText.includes('WIN')) {
        playSound('win');
        
        for (let i = 0; i < 25; i++) {
          setTimeout(() => {
            setParticles(prev => [...prev, {
              id: Date.now() + Math.random(),
              x: Math.random() * 100,
              y: Math.random() * 100
            }]);
          }, i * 50);
        }
        setTimeout(() => setParticles([]), 3000);
      }
      onBalanceChange(balance + winAmount);
    } else {
      playSound('lose');
    }

    setResult(resultText);
    setGameState('finished');
    setShowResultPopup(true);
    setTimeout(() => setShowResultPopup(false), 3500);
  };

  const resetGame = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setGameState('betting');
    setResult('');
  };

  const betOptions = [10000, 50000, 100000, 500000, 1000000];

  const renderCard = (card: CardType, hidden: boolean = false) => (
    <div className="relative w-24 h-36 bg-white rounded-lg shadow-2xl border-2 border-gray-300">
      {hidden ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4d2e] to-[#0d3b2a] rounded-lg flex items-center justify-center">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjIiIGZpbGw9IiNmZmQ3MDAiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>
      ) : (
        <div className="absolute inset-0 p-2 flex flex-col justify-between">
          <div className={`text-2xl font-bold ${suitColors[card.suit]}`}>
            {card.value}
          </div>
          <div className={`text-4xl ${suitColors[card.suit]} text-center`}>
            {card.suit}
          </div>
          <div className={`text-2xl font-bold ${suitColors[card.suit]} text-right transform rotate-180`}>
            {card.value}
          </div>
        </div>
      )}
    </div>
  );

  const playerScore = calculateScore(playerCards);
  const dealerScore = calculateScore(dealerCards);

  const loseMessages = [
    '😂 ПРОЕБАЛ СУКА!',
    '💀 ХА-ХА ЛОХ!',
    '🤡 ПИДОРАС НЕУДАЧНИК!',
    '🖕 ИДИ НАХУЙ!'
  ];

  const winMessages = [
    '🎉 ОХУЕТЬ ВЫИГРАЛ!',
    '💰 ПИЗДАТЫЙ ВЫИГРЫШ!',
    '🚀 ЗАЕБИСЬ БЛЯТЬ!',
    '🔥 ЕБАТЬ КРАСАВЧИК!'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a4d2e] via-[#0d5c38] to-[#0a4d2e] p-4 relative overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-4xl animate-ping pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        >
          🎴
        </div>
      ))}

      {showResultPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4">
            {result.includes('WIN') ? (
              <>
                <div className="text-9xl mb-8 animate-bounce">🎉🎴🎉</div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-green-400 animate-pulse drop-shadow-2xl">
                  {winMessages[Math.floor(Math.random() * winMessages.length)]}
                </h1>
                <div className="text-6xl md:text-8xl font-black text-[#FFD700] mb-4 animate-pulse">
                  +{((bet * (result.includes('BLACKJACK') ? 2.5 : 2)) / 1000000).toFixed(1)}M₽
                </div>
              </>
            ) : result.includes('PUSH') ? (
              <>
                <div className="text-9xl mb-8">🤝</div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-blue-400">
                  НИЧЬЯ - ВЕРНУЛИ СТАВКУ
                </h1>
              </>
            ) : (
              <>
                <div className="text-9xl mb-8 animate-bounce">💀🤡💀</div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-red-500 animate-pulse drop-shadow-2xl">
                  {loseMessages[Math.floor(Math.random() * loseMessages.length)]}
                </h1>
                <div className="text-4xl text-red-400 font-bold">Проебал: {(bet / 1000000).toFixed(1)}M₽</div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#1a1a1a] border border-[#2d5f3f] rounded-lg p-6 mb-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#c9b037] text-sm font-medium mb-1">BLACKJACK</div>
              <div className="text-white text-2xl font-bold">Evolution Gaming</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs mb-1">BALANCE</div>
              <div className="text-[#c9b037] text-2xl font-bold">{balance.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0d5c38] to-[#0a4d2e] rounded-2xl p-8 border-4 border-[#c9b037] shadow-2xl">
          <div className="mb-8">
            <div className="text-center mb-4">
              <div className="text-[#c9b037] text-sm uppercase tracking-wider mb-2">Dealer's Hand</div>
              <div className="text-white text-3xl font-bold mb-1">
                {gameState === 'betting' ? '--' : gameState === 'playing' ? '?' : dealerScore}
              </div>
            </div>
            <div className="flex justify-center gap-3 mb-8">
              {dealerCards.map((card, idx) => (
                <div key={idx}>
                  {renderCard(card, gameState === 'playing' && idx === 1)}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-[#c9b037]/30 pt-8">
            <div className="text-center mb-4">
              <div className="text-[#c9b037] text-sm uppercase tracking-wider mb-2">Your Hand</div>
              <div className="text-white text-3xl font-bold mb-1">
                {gameState === 'betting' ? '--' : playerScore}
              </div>
            </div>
            <div className="flex justify-center gap-3 mb-8">
              {playerCards.map((card, idx) => (
                <div key={idx}>
                  {renderCard(card)}
                </div>
              ))}
            </div>
          </div>

          {result && (
            <div className="text-center mb-6">
              <div className={`text-4xl font-black ${result.includes('WIN') ? 'text-[#c9b037]' : result.includes('PUSH') ? 'text-blue-400' : 'text-red-500'}`}>
                {result}
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto">
            {gameState === 'betting' && (
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] border border-[#2d5f3f] rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-3">SELECT BET</div>
                  <div className="grid grid-cols-5 gap-2">
                    {betOptions.map(amount => (
                      <button
                        key={amount}
                        onClick={() => setBet(amount)}
                        className={`py-3 px-2 rounded-lg font-bold transition-all text-sm ${
                          bet === amount
                            ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black scale-105'
                            : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
                        } border-2 ${bet === amount ? 'border-[#c9b037]' : 'border-[#2d5f3f]'}`}
                      >
                        {amount >= 1000000 ? `${amount/1000000}M` : `${amount/1000}K`}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={startGame}
                  disabled={balance < bet}
                  className="w-full h-16 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-black font-black text-xl disabled:opacity-50"
                >
                  DEAL CARDS ({bet.toLocaleString('ru-RU')} ₽)
                </Button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={hit}
                  className="h-16 bg-[#2d5f3f] hover:bg-[#3a7550] text-white font-black text-lg border-2 border-[#c9b037]"
                >
                  HIT
                </Button>
                <Button
                  onClick={stand}
                  className="h-16 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-black font-black text-lg"
                >
                  STAND
                </Button>
              </div>
            )}

            {gameState === 'finished' && (
              <Button
                onClick={resetGame}
                className="w-full h-16 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-black font-black text-xl"
              >
                NEW GAME
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blackjack;