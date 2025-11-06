import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ClassicSlotMachine from '@/components/ClassicSlotMachine';
import Sidebar from '@/components/Sidebar';
import GameCard from '@/components/GameCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [balance, setBalance] = useState(50000000);
  const [showRules, setShowRules] = useState(false);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const faceUrl = 'https://cdn.poehali.dev/files/531d6c39-e90b-4aa4-b66e-12b444f697fd.jpg';

  const games = [
    { id: 'slot', title: 'Хуяк Олимпус', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/f814daab-841f-425b-8b54-ff8c3d7cad82.jpg', isLive: true },
    { id: 'starlight', title: 'Пиздатая Принцесса', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/fb615e4e-328d-45b7-80ad-615bf82496fa.jpg', isLive: false },
    { id: 'sweet', title: 'Сладкий Пиздец', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/9a1780f8-7bb6-4b07-8992-0ebc07212e25.jpg', isLive: false },
    { id: 'wolf', title: 'Ебать Золото', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/e68b4ba2-b80d-4e75-8eb5-08b457039c5d.jpg', isLive: false },
    { id: 'book', title: 'Хуйня Фиеста', provider: 'Play\'n GO', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/45968cc9-544c-47f7-940e-a940ef3704c0.jpg', isLive: false },
    { id: 'razor', title: 'Дикий Пиздюк', provider: 'Push Gaming', imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop', isLive: true },
    { id: 'wanted', title: 'Заебатый Мертвец', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=400&h=300&fit=crop', isLive: false },
    { id: 'olympus', title: 'Охуенный Олимп', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop', isLive: false },
    { id: 'gorilla', title: 'Ебашит Горилла', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?w=400&h=300&fit=crop', isLive: false },
    { id: 'fire', title: 'Пиздатый Огонь', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', isLive: true },
    { id: 'mega', title: 'Мега Ебанько', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=300&fit=crop', isLive: false },
    { id: 'starburst', title: 'Звёздный Пиздос', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', isLive: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
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
        <div className="bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 py-4 md:py-6 sticky top-0 z-30 shadow-2xl border-b-4 border-yellow-400">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden bg-white/20 hover:bg-white/30 p-2 h-10 w-10"
              >
                <Icon name="Menu" size={20} />
              </Button>
              <div className="lg:hidden px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <span className="text-white text-sm font-bold">{(balance / 1000000).toFixed(0)}M₽</span>
              </div>
              <Button
                onClick={() => setCurrentGame(null)}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-2 backdrop-blur-sm"
              >
                <Icon name="Home" size={18} />
              </Button>
            </div>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white text-center tracking-tight drop-shadow-2xl uppercase">
              🎰 СВЯТОЗАР СЛОТ ЕБЁТ ВСЕХ В РОТ 🎰
            </h1>
          </div>
        </div>

        <main className="relative container mx-auto px-4 py-6 md:py-8">
          {currentGame ? (
            <div className="max-w-4xl mx-auto">
              <ClassicSlotMachine balance={balance} onBalanceChange={setBalance} />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="relative text-center space-y-3 md:space-y-5 animate-fade-in overflow-hidden rounded-2xl">
                <div className="relative bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 text-white px-6 md:px-12 py-6 md:py-8 border-4 border-yellow-400/80 shadow-2xl">
                  <div className="absolute top-4 left-4 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img src={faceUrl} alt="Bonus" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img src={faceUrl} alt="Bonus" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-xl md:text-3xl font-black uppercase tracking-wide mb-2">
                    🎰 БОНУС ЗА РЕГИСТРАЦИЮ 🎰
                  </h2>
                  <p className="text-3xl md:text-5xl font-black">
                    150 000 000 ₽ + 150 ФРИСПИНОВ
                  </p>
                  <Button className="mt-4 bg-white text-red-600 hover:bg-gray-100 font-black text-lg md:text-xl px-8 py-6">
                    КАССА
                  </Button>
                </div>
              </div>

              <div className="flex justify-center gap-2 md:gap-4 animate-fade-in flex-wrap">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-blue-400/50 shadow-lg px-8 py-6 text-lg">
                  <Icon name="Medal" size={20} />
                  Лобби
                </Button>
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-400/50 shadow-lg px-8 py-6 text-lg">
                  <Icon name="Gamepad2" size={20} />
                  Провайдеры
                </Button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-2xl font-black">🎰 Популярные игры</h3>
                  <input 
                    type="text" 
                    placeholder="Поиск игр..."
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg border-2 border-white/20 w-64"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {games.map((game) => (
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
              <Dialog open={false}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold flex items-center gap-2">
                    <Icon name="BookOpen" size={28} />
                    Правила игры
                  </DialogTitle>
                  <DialogDescription className="text-base mt-4">
                    Узнайте, как играть в Святозар и выигрывать!
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 mt-6">
                  <Card className="p-6 bg-primary/5 border-primary/20">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Icon name="Target" size={22} className="text-primary" />
                      Цель игры
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Собрать одинаковые комбинации чисел на трёх барабанах игрового автомата. 
                      Чем реже комбинация, тем выше выигрыш!
                    </p>
                  </Card>

                  <Card className="p-6 bg-secondary/5 border-secondary/20">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Icon name="Gamepad2" size={22} className="text-secondary" />
                      Как играть
                    </h3>
                    <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                      <li className="leading-relaxed">
                        <strong>Выберите ставку</strong> — от 10₽ до 1000₽ с шагом 10₽
                      </li>
                      <li className="leading-relaxed">
                        <strong>Нажмите кнопку "Крутить"</strong> — барабаны начнут вращаться
                      </li>
                      <li className="leading-relaxed">
                        <strong>Дождитесь результата</strong> — барабаны остановятся через 2 секунды
                      </li>
                      <li className="leading-relaxed">
                        <strong>Получите выигрыш</strong> — если выпала выигрышная комбинация
                      </li>
                    </ol>
                  </Card>

                  <Card className="p-6 bg-accent/5 border-accent/20">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Trophy" size={22} className="text-accent" />
                      Таблица выплат
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-secondary">7️⃣ 7️⃣ 7️⃣</span>
                          <span className="font-semibold">ДЖЕКПОТ!</span>
                        </div>
                        <span className="text-xl font-bold text-secondary">×100 ставки</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">🔢 🔢 🔢</span>
                          <span className="font-medium">Три одинаковых</span>
                        </div>
                        <span className="text-lg font-bold text-primary">×10 ставки</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">🔢 🔢 ❓</span>
                          <span className="font-medium">Два одинаковых</span>
                        </div>
                        <span className="text-lg font-bold">×2 ставки</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-destructive/5 border-destructive/20">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Icon name="AlertCircle" size={22} className="text-destructive" />
                      Важно знать
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Минимальная ставка — 10₽, максимальная — 1000₽</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Невозможно сделать ставку, если на балансе недостаточно средств</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Все выигрыши зачисляются на баланс автоматически</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Комбинация 7-7-7 — самая редкая и приносит максимальный выигрыш</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground">
                    🎲 Играйте ответственно! Это развлекательная игра.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

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