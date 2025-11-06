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
      <div className="w-64 bg-[#0f1419] border-r border-gray-800 p-4 space-y-4 h-screen overflow-y-auto sticky top-0">
        <div className="space-y-3">
          <Card className="bg-gradient-to-br from-green-600 to-green-700 p-4 border-0 rounded-lg">
            <div className="text-green-100 text-xs mb-1 font-semibold uppercase tracking-wide">Баланс</div>
            <div className="text-white text-3xl font-black">{balance.toLocaleString()}₽</div>
          </Card>

          <Button 
            onClick={() => setShowDeposit(true)}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 text-sm rounded-lg border-0"
          >
            <Icon name="Plus" className="mr-2" size={18} />
            Пополнить
          </Button>

          <Button 
            onClick={() => setShowWithdraw(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 text-sm rounded-lg border-0"
          >
            <Icon name="ArrowDownToLine" className="mr-2" size={18} />
            Вывести
          </Button>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">Меню</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-gray-800/50 text-sm py-2">
              <Icon name="User" className="mr-2" size={16} />
              Профиль
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-gray-800/50 text-sm py-2">
              <Icon name="History" className="mr-2" size={16} />
              История
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-gray-800/50 text-sm py-2">
              <Icon name="Gift" className="mr-2" size={16} />
              Бонусы
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-gray-800/50 text-sm py-2">
              <Icon name="Trophy" className="mr-2" size={16} />
              Турниры
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">Быстрое пополнение</h3>
          <div className="space-y-2">
            {quickAmounts.map((amt) => (
              <Button
                key={amt}
                onClick={() => onBalanceChange(balance + amt)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-2 rounded-lg"
              >
                +{(amt / 1000000).toFixed(0)}M₽
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
        <DialogContent className="bg-[#0f1419] text-white border border-gray-700">
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
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-orange-500"
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
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.slice(0, 6).map((amt) => (
                <Button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="bg-gray-800 hover:bg-gray-700 border-0 text-sm"
                >
                  {amt >= 1000000 ? `${(amt / 1000000).toFixed(0)}M` : `${(amt / 1000).toFixed(0)}K`}₽
                </Button>
              ))}
            </div>
            <Button
              onClick={handleDeposit}
              disabled={!amount || !cardNumber}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 text-base rounded-lg disabled:opacity-50"
            >
              Пополнить счёт
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent className="bg-[#0f1419] text-white border border-gray-700">
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
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-orange-500"
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
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-blue-500"
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
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 text-base rounded-lg disabled:opacity-50"
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