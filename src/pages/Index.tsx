import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SlotMachine from '@/components/SlotMachine';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [balance, setBalance] = useState(1000);
  const [showRules, setShowRules] = useState(false);

  const addBalance = () => {
    setBalance(balance + 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">🎰</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                СВЯТОЗАР
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Card className="px-4 py-2 md:px-6 md:py-3 bg-card/80 backdrop-blur-sm border-primary/30">
                <div className="flex items-center gap-2">
                  <Icon name="Wallet" size={18} className="text-secondary md:w-5 md:h-5" />
                  <span className="text-xl md:text-2xl font-bold text-foreground">
                    {balance}₽
                  </span>
                </div>
              </Card>
              <Button
                variant="outline"
                size="sm"
                onClick={addBalance}
                className="border-secondary/50 hover:bg-secondary/10"
              >
                <Icon name="Plus" size={16} className="mr-1 md:mr-2" />
                <span className="hidden sm:inline">Пополнить</span>
                <span className="sm:hidden">+500₽</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="text-center space-y-2 md:space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              Онлайн Казино
            </h2>
            <p className="text-base md:text-xl text-muted-foreground">
              Испытай удачу и сорви джекпот! 777 = x100
            </p>
          </div>

          <div className="flex justify-center gap-2 md:gap-4 animate-fade-in flex-wrap">
            <Dialog open={showRules} onOpenChange={setShowRules}>
              <DialogTrigger asChild>
                <Button variant="outline" size="default" className="gap-2 md:text-base">
                  <Icon name="BookOpen" size={18} className="md:w-5 md:h-5" />
                  Правила игры
                </Button>
              </DialogTrigger>
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

            <Button variant="outline" size="default" className="gap-2 md:text-base">
              <Icon name="Sparkles" size={18} className="md:w-5 md:h-5" />
              Турниры
            </Button>
          </div>

          <div className="flex justify-center animate-fade-in">
            <SlotMachine balance={balance} onBalanceChange={setBalance} />
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
            <Card className="p-6 text-center space-y-3 bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold">Быстрая игра</h3>
              <p className="text-muted-foreground text-sm">
                Моментальные результаты и выплаты
              </p>
            </Card>

            <Card className="p-6 text-center space-y-3 bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Trophy" size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Большие выигрыши</h3>
              <p className="text-muted-foreground text-sm">
                Джекпот умножает ставку в 100 раз!
              </p>
            </Card>

            <Card className="p-6 text-center space-y-3 bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Shield" size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold">Честная игра</h3>
              <p className="text-muted-foreground text-sm">
                Прозрачная система генерации результатов
              </p>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Святозар. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground/60 mt-2">
            Играйте ответственно. Только для развлечения.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;