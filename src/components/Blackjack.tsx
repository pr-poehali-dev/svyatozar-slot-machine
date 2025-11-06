import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'dealer' | 'finished'>('betting');
  const [result, setResult] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const suits = ['♠️', '♥️', '♣️', '♦️'];
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

    onBalanceChange(balance - bet);
    const player = [drawCard(), drawCard()];
    const dealer = [drawCard(), drawCard()];

    setPlayerCards(player);
    setDealerCards(dealer);
    setGameState('playing');
    setShowResult(false);
    setResult('');

    if (calculateScore(player) === 21) {
      endGame(player, dealer);
    }
  };

  const hit = () => {
    const newPlayerCards = [...playerCards, drawCard()];
    setPlayerCards(newPlayerCards);

    if (calculateScore(newPlayerCards) > 21) {
      endGame(newPlayerCards, dealerCards);
    }
  };

  const stand = () => {
    setGameState('dealer');
    const newDealerCards = [...dealerCards];

    while (calculateScore(newDealerCards) < 17) {
      newDealerCards.push(drawCard());
    }

    setDealerCards(newDealerCards);
    setTimeout(() => endGame(playerCards, newDealerCards), 1000);
  };

  const endGame = (playerHand: CardType[], dealerHand: CardType[]) => {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    let resultText = '';
    let winAmount = 0;

    if (playerScore > 21) {
      resultText = '💀 ПЕРЕБОР, ЛОХ! 💀';
    } else if (dealerScore > 21) {
      resultText = '🎉 ДИЛЕР ПРОЕБАЛ! 🎉';
      winAmount = bet * 2;
    } else if (playerScore > dealerScore) {
      resultText = '🎉 ЕБАТЬ ВЫИГРАЛ! 🎉';
      winAmount = bet * 2;
    } else if (playerScore === dealerScore) {
      resultText = '😐 НИЧЬЯ, ЗАБИРАЙ';
      winAmount = bet;
    } else {
      resultText = '💀 ПРОЕБАЛ, ПИДОР! 💀';
    }

    setResult(resultText);
    setGameState('finished');
    setShowResult(true);

    if (winAmount > 0) {
      onBalanceChange(balance + winAmount);
    }

    setTimeout(() => setShowResult(false), 4000);
  };

  const changeBet = (amount: number) => {
    const newBet = bet + amount;
    if (newBet >= 10000 && newBet <= 10000000) {
      setBet(newBet);
    }
  };

  const reset = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setGameState('betting');
    setResult('');
    setShowResult(false);
  };

  return (
    <>
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center px-4">
            <div className="text-9xl mb-8 animate-bounce">
              {result.includes('ВЫИГРАЛ') || result.includes('ПРОЕБАЛ') ? '🎰' : result.includes('НИЧЬЯ') ? '😐' : '💀'}
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl animate-pulse ${
              result.includes('ВЫИГРАЛ') ? 'text-green-500' : result.includes('НИЧЬЯ') ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {result}
            </h1>
            <div className="text-3xl md:text-5xl font-bold text-white mb-4">
              Твои очки: <span className="text-yellow-400">{calculateScore(playerCards)}</span>
            </div>
            <div className="text-3xl md:text-5xl font-bold text-white mb-4">
              Дилер: <span className="text-yellow-400">{calculateScore(dealerCards)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-4">
        <Card className="bg-gradient-to-br from-green-800 to-green-900 border-8 border-yellow-600 p-4 md:p-6">
          <div className="text-center mb-6">
            <h2 className="text-white text-3xl md:text-4xl font-black mb-2">♠️ БЛЭКДЖЕК 21 ♥️</h2>
            <p className="text-yellow-400 text-lg font-bold">Набери 21 или больше дилера!</p>
          </div>

          <div className="space-y-6">
            <div className="bg-green-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-lg">ДИЛЕР</span>
                <span className="text-yellow-400 font-black text-2xl">
                  {gameState === 'playing' ? '?' : calculateScore(dealerCards)}
                </span>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                {dealerCards.map((card, i) => (
                  <div
                    key={i}
                    className={`w-16 h-24 md:w-20 md:h-32 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center border-4 border-gray-300 ${
                      gameState === 'playing' && i === 1 ? 'bg-gradient-to-br from-red-600 to-red-800' : ''
                    }`}
                  >
                    {gameState === 'playing' && i === 1 ? (
                      <div className="text-4xl">🎴</div>
                    ) : (
                      <>
                        <div className={`text-3xl md:text-4xl ${['♥️', '♦️'].includes(card.suit) ? 'text-red-600' : 'text-black'}`}>
                          {card.suit}
                        </div>
                        <div className="text-xl md:text-2xl font-black text-gray-900">{card.value}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-lg">ТЫ</span>
                <span className="text-yellow-400 font-black text-2xl">{calculateScore(playerCards)}</span>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                {playerCards.map((card, i) => (
                  <div
                    key={i}
                    className="w-16 h-24 md:w-20 md:h-32 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center border-4 border-gray-300 animate-fade-in"
                  >
                    <div className={`text-3xl md:text-4xl ${['♥️', '♦️'].includes(card.suit) ? 'text-red-600' : 'text-black'}`}>
                      {card.suit}
                    </div>
                    <div className="text-xl md:text-2xl font-black text-gray-900">{card.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#0f1419] border border-gray-800 p-4">
          {gameState === 'betting' && (
            <div className="space-y-4">
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
                onClick={startGame}
                disabled={balance < bet}
                className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-black text-xl disabled:opacity-50"
              >
                <Icon name="PlayCircle" className="mr-2" />
                РАЗДАТЬ КАРТЫ
              </Button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={hit}
                className="h-16 bg-orange-600 hover:bg-orange-500 text-white font-black text-lg"
              >
                <Icon name="Plus" className="mr-2" />
                ЕЩЁ КАРТУ
              </Button>
              <Button
                onClick={stand}
                className="h-16 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg"
              >
                <Icon name="HandMetal" className="mr-2" />
                ХВАТИТ
              </Button>
            </div>
          )}

          {gameState === 'finished' && (
            <Button
              onClick={reset}
              className="w-full h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-black text-xl"
            >
              <Icon name="RotateCcw" className="mr-2" />
              ЕЩЁ ПАРТИЮ
            </Button>
          )}
        </Card>
      </div>
    </>
  );
};

export default Blackjack;
