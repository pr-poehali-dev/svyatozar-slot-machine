import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ClassicSlotMachine from '@/components/ClassicSlotMachine';
import Roulette from '@/components/Roulette';
import Blackjack from '@/components/Blackjack';
import Dice from '@/components/Dice';
import CrashGame from '@/components/CrashGame';
import Plinko from '@/components/Plinko';
import Mines from '@/components/Mines';
import Sidebar from '@/components/Sidebar';
import GameCard from '@/components/GameCard';

const Index = () => {
  const [balance, setBalance] = useState(50000000);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Все игры', icon: '🎰' },
    { id: 'slots', name: 'Слоты', icon: '🎰' },
    { id: 'roulette', name: 'Рулетка', icon: '🎡' },
    { id: 'cards', name: 'Карты', icon: '🃏' },
    { id: 'dice', name: 'Кости', icon: '🎲' },
    { id: 'crash', name: 'Краш', icon: '🚀' },
  ];

  const games = [
    { id: 'roulette', title: 'Ебашит Рулетка', category: 'roulette', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/e2a9681f-18f6-41e1-8a68-cbfbd785ecbb.jpg', isLive: true },
    { id: 'blackjack', title: 'Блядский Джек', category: 'cards', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/25deaa11-a1ff-488a-9b68-1db0cb25f66e.jpg', isLive: true },
    { id: 'dice', title: 'Кости Пиздец', category: 'dice', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/7ce949fa-006f-438b-b232-b211ef4ac6aa.jpg', isLive: true },
    { id: 'slot', title: 'Слот Заебись', category: 'slots', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/b1ce5d51-e82c-45c0-9074-5b4c0d49527f.jpg', isLive: false },
    { id: 'crash', title: 'Краш Пиздатый', category: 'crash', provider: 'BC.Game', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/0e9fb18a-fa9e-4fb8-8225-51123e38c9ce.jpg', isLive: true },
    { id: 'plinko', title: 'Плинко Охуенное', category: 'crash', provider: 'Stake', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/0b57bd73-b8e7-489c-b1a9-fa02a8447af5.jpg', isLive: true },
    { id: 'mines', title: 'Мины Блядские', category: 'crash', provider: 'Stake', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/91bee567-7958-4cb5-b33c-866fd0b3edc1.jpg', isLive: true },
    { id: 'fruits', title: 'Фрукты Ебаные', category: 'slots', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/6ecc00d4-0b71-4f13-a015-6b76097410a3.jpg', isLive: false },
    { id: 'jungle', title: 'Джунгли Пизда', category: 'slots', provider: 'NetEnt', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/13798fae-6698-4066-8639-2e97093285a2.jpg', isLive: false },
    { id: 'poker1', title: 'Покер Ебаный', category: 'cards', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/8cec84ba-62f1-46d0-8b72-dba398199798.jpg', isLive: true },
    { id: 'baccarat', title: 'Баккара Пиздатая', category: 'cards', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/cdbc16e1-9a76-48f1-bf45-ca2a33f6a913.jpg', isLive: true },
    { id: 'vip1', title: 'VIP Охуенный', category: 'cards', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/58aa6dbb-da4e-4a73-a5bc-c150122d7f9a.jpg', isLive: true },
    { id: 'wheel1', title: 'Колесо Фортуны', category: 'roulette', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/adc0e105-2e4f-4032-b955-06e96cc90d08.jpg', isLive: true },
    { id: 'craps1', title: 'Крэпс Пизда', category: 'dice', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/1eb77034-053f-4b70-9c7f-8b42a43a71e1.jpg', isLive: true },
    { id: 'slot1', title: 'Ебать Золото', category: 'slots', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/e68b4ba2-b80d-4e75-8eb5-08b457039c5d.jpg', isLive: false },
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const renderGame = () => {
    switch (currentGame) {
      case 'slot':
      case 'fruits':
      case 'jungle':
      case 'slot1':
        return <div className="max-w-4xl mx-auto"><ClassicSlotMachine balance={balance} onBalanceChange={setBalance} /></div>;
      case 'roulette':
      case 'wheel1':
        return <div className="max-w-6xl mx-auto"><Roulette balance={balance} onBalanceChange={setBalance} /></div>;
      case 'blackjack':
      case 'poker1':
      case 'baccarat':
      case 'vip1':
        return <div className="max-w-5xl mx-auto"><Blackjack balance={balance} onBalanceChange={setBalance} /></div>;
      case 'dice':
      case 'craps1':
        return <div className="max-w-5xl mx-auto"><Dice balance={balance} onBalanceChange={setBalance} /></div>;
      case 'crash':
        return <CrashGame balance={balance} onBalanceChange={setBalance} />;
      case 'plinko':
        return <Plinko balance={balance} onBalanceChange={setBalance} />;
      case 'mines':
        return <Mines balance={balance} onBalanceChange={setBalance} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] relative overflow-hidden">
      
      <div className={`hidden lg:block fixed left-0 top-0 z-40`}>
        <Sidebar balance={balance} onBalanceChange={setBalance} />
      </div>
      
      {showSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="fixed left-0 top-0 z-50 lg:hidden animate-fade-in">
            <Sidebar balance={balance} onBalanceChange={setBalance} />
          </div>
        </>
      )}
      
      <div className="lg:ml-64">
        <div className="bg-[#0f1419] border-b border-gray-800 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden bg-gray-800 hover:bg-gray-700 p-2 h-9 w-9"
              >
                <Icon name="Menu" size={18} />
              </Button>
              <div className="text-orange-500 font-black text-lg md:text-2xl tracking-tight">
                🎰 СВЯТОЗАР
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-green-600 rounded-md">
                <span className="text-white text-sm font-bold">{(balance / 1000000).toFixed(0)}M₽</span>
              </div>
              <Button
                onClick={() => setCurrentGame(null)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 h-auto text-sm"
              >
                <Icon name="Home" size={16} />
              </Button>
            </div>
          </div>
        </div>

        <main className="relative max-w-7xl mx-auto px-3 py-4">
          {currentGame ? (
            renderGame()
          ) : (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-green-500 to-green-600 h-40 md:h-52">
                <img 
                  src="https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/6f73716c-38f0-482c-9097-a14c1fbb88d9.jpg" 
                  alt="Bonus"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
                  <div className="max-w-md">
                    <h2 className="text-xl md:text-3xl font-black text-white mb-2 leading-tight">
                      БОНУС НА ПЕРВЫЙ ДЕПОЗИТ
                    </h2>
                    <p className="text-2xl md:text-4xl font-black text-yellow-400 mb-3">
                      150 000 000₽ + 150 FS
                    </p>
                    <Button className="bg-green-500 hover:bg-green-400 text-white font-black text-sm md:text-base px-6 py-2 rounded-lg">
                      ПОПОЛНИТЬ СЧЁТ
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-orange-600 hover:bg-orange-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    } text-white font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap`}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                  </Button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white text-lg md:text-xl font-bold flex items-center gap-2">
                    <span className="text-orange-500">🔥</span> 
                    {selectedCategory === 'all' ? 'Все игры' : categories.find(c => c.id === selectedCategory)?.name}
                  </h3>
                  <input 
                    type="text" 
                    placeholder="Поиск..."
                    className="bg-[#0f1419] text-white px-3 py-2 rounded-lg border border-gray-700 text-sm w-32 md:w-48 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      title={game.title}
                      provider={game.provider}
                      imageUrl={game.imageUrl}
                      isLive={game.isLive}
                      onClick={() => setCurrentGame(game.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-white/70 text-sm md:text-base mb-4">Нас рекомендуют:</p>
                <div className="flex flex-wrap justify-center gap-6 items-center opacity-50">
                  <div className="text-white font-bold text-lg">CASINO GURU AWARDS</div>
                  <div className="text-white font-bold text-lg">⚡ LCB</div>
                  <div className="text-white font-bold text-lg">💎 LatestCasino Bonuses</div>
                  <div className="text-white font-bold text-lg">🎯 GECOGRA</div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="relative border-t-2 border-orange-500/50 mt-20 py-8 bg-slate-900/80">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/80 font-bold">
              © 2024 СВЯТОЗАР СЛОТ ЕБЁТ ВСЕХ В РОТ
            </p>
            <p className="text-sm text-white/50 mt-2">
              Играйте ответственно. 18+
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
