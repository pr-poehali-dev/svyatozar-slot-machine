import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SidebarProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const Sidebar = ({ balance, onBalanceChange }: SidebarProps) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleDeposit = () => {
    const depositAmount = parseInt(amount);
    if (depositAmount > 0) {
      onBalanceChange(balance + depositAmount);
      setAmount('');
      setCardNumber('');
      setShowDeposit(false);
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseInt(amount);
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      onBalanceChange(balance - withdrawAmount);
      setAmount('');
      setCardNumber('');
      setShowWithdraw(false);
    }
  };

  const quickAmounts = [50000, 100000, 500000, 1000000, 5000000];

  return (
    <>
      <div className="w-64 bg-slate-900/95 border-r-2 border-orange-500/50 p-4 space-y-4 h-screen overflow-y-auto sticky top-0">
        <div className="space-y-3">
          <Card className="bg-gradient-to-br from-green-600 to-green-700 p-4 border-2 border-green-400/50">
            <div className="text-green-100 text-sm mb-1 font-medium">Баланс</div>
            <div className="text-white text-2xl font-black">{balance.toLocaleString()}₽</div>
          </Card>

          <Button 
            onClick={() => setShowDeposit(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6 text-base border-2 border-orange-400/50"
          >
            <Icon name="Plus" className="mr-2" />
            Пополнить
          </Button>

          <Button 
            onClick={() => setShowWithdraw(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 text-base border-2 border-blue-400/50"
          >
            <Icon name="ArrowDownToLine" className="mr-2" />
            Вывести
          </Button>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Icon name="Settings" size={18} />
            Меню
          </h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
              <Icon name="User" className="mr-2" size={18} />
              Профиль
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
              <Icon name="History" className="mr-2" size={18} />
              История
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
              <Icon name="Gift" className="mr-2" size={18} />
              Бонусы
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
              <Icon name="Trophy" className="mr-2" size={18} />
              Турниры
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
              <Icon name="Headphones" className="mr-2" size={18} />
              Поддержка
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-bold mb-3">Быстрый доступ</h3>
          <div className="space-y-2">
            {quickAmounts.map((amt) => (
              <Button
                key={amt}
                onClick={() => onBalanceChange(balance + amt)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-sm"
              >
                +{(amt / 1000).toFixed(0)}K₽
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
        <DialogContent className="bg-slate-900 text-white border-2 border-orange-500/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black flex items-center gap-2">
              <Icon name="CreditCard" />
              Пополнение счёта
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70 mb-2 block">Номер карты</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-slate-800 border-2 border-white/20 rounded-lg px-4 py-3 text-white font-mono text-lg"
                maxLength={19}
              />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-2 block">Сумма пополнения</label>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-800 border-2 border-white/20 rounded-lg px-4 py-3 text-white text-xl font-bold"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.slice(0, 6).map((amt) => (
                <Button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="bg-slate-800 hover:bg-slate-700 border border-orange-500/30"
                >
                  {amt >= 1000000 ? `${(amt / 1000000).toFixed(0)}M` : `${(amt / 1000).toFixed(0)}K`}₽
                </Button>
              ))}
            </div>
            <Button
              onClick={handleDeposit}
              disabled={!amount || !cardNumber}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black py-6 text-lg"
            >
              Пополнить счёт
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent className="bg-slate-900 text-white border-2 border-blue-500/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black flex items-center gap-2">
              <Icon name="Banknote" />
              Вывод средств
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
              <div className="text-sm text-blue-200">Доступно для вывода</div>
              <div className="text-2xl font-black text-white">{balance.toLocaleString()}₽</div>
            </div>
            <div>
              <label className="text-sm text-white/70 mb-2 block">Номер карты</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-slate-800 border-2 border-white/20 rounded-lg px-4 py-3 text-white font-mono text-lg"
                maxLength={19}
              />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-2 block">Сумма вывода</label>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-800 border-2 border-white/20 rounded-lg px-4 py-3 text-white text-xl font-bold"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.slice(0, 6).map((amt) => (
                <Button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  disabled={amt > balance}
                  className="bg-slate-800 hover:bg-slate-700 border border-blue-500/30 disabled:opacity-30"
                >
                  {amt >= 1000000 ? `${(amt / 1000000).toFixed(0)}M` : `${(amt / 1000).toFixed(0)}K`}₽
                </Button>
              ))}
            </div>
            <Button
              onClick={handleWithdraw}
              disabled={!amount || !cardNumber || parseInt(amount) > balance}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-6 text-lg"
            >
              Вывести средства
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
