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

      <Dialog open={showDeposit} onOpenChange={(open) => { setShowDeposit(open); if (!open) { setSelectedBank(null); setShowBankTransfer(false); } }}>
        <DialogContent className="bg-[#0f1419] text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black flex items-center gap-2">
              <Icon name="CreditCard" />
              Пополнение счёта
            </DialogTitle>
          </DialogHeader>
          {!showBankTransfer ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-3 block font-semibold">Выберите банк:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'sberbank', name: 'Сбербанк', icon: '🟢', color: 'green' },
                    { id: 'tinkoff', name: 'Тинькофф', icon: '🟡', color: 'yellow' },
                    { id: 'alfabank', name: 'Альфа', icon: '🔴', color: 'red' },
                    { id: 'vtb', name: 'ВТБ', icon: '🔵', color: 'blue' },
                  ].map(bank => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedBank === bank.id 
                          ? `border-${bank.color}-500 bg-${bank.color}-500/10` 
                          : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{bank.icon}</div>
                      <div className="text-white font-bold text-xs">{bank.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Сумма пополнения</label>
                <input
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-orange-500"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.slice(0, 6).map((amt) => (
                  <Button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="bg-gray-800 hover:bg-gray-700 border-0 text-xs"
                  >
                    {amt >= 1000000 ? `${(amt / 1000000).toFixed(0)}M` : `${(amt / 1000).toFixed(0)}K`}₽
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleDeposit}
                disabled={!amount || !selectedBank}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black py-4 text-base rounded-lg disabled:opacity-50"
              >
                Перейти к оплате
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-5 rounded-lg ${
                selectedBank === 'sberbank' ? 'bg-green-600' :
                selectedBank === 'tinkoff' ? 'bg-yellow-500' :
                selectedBank === 'alfabank' ? 'bg-red-600' :
                'bg-blue-600'
              }`}>
                <div className="text-white">
                  <div className="text-2xl mb-3 font-black">
                    {selectedBank === 'sberbank' && '🟢 СБЕРБАНК ОНЛАЙН'}
                    {selectedBank === 'tinkoff' && '🟡 ТИНЬКОФФ'}
                    {selectedBank === 'alfabank' && '🔴 АЛЬФА-БАНК'}
                    {selectedBank === 'vtb' && '🔵 ВТБ ОНЛАЙН'}
                  </div>
                  <div className="text-xs mb-2 opacity-90">К оплате:</div>
                  <div className="text-3xl font-black mb-3">{parseInt(amount).toLocaleString()} ₽</div>
                  <div className="text-xs opacity-75">Вы будете перенаправлены в банк</div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                <div className="text-gray-400 text-xs">Реквизиты:</div>
                <div className="text-white font-mono text-xs">
                  Карта: •••• {Math.floor(Math.random() * 9000 + 1000)}
                </div>
                <div className="text-white text-xs">
                  Получатель: СВЯТОЗАР СЛОТ
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => { setShowBankTransfer(false); setSelectedBank(null); }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm"
                >
                  Назад
                </Button>
                <Button
                  onClick={completeBankTransfer}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold text-sm"
                >
                  Оплачено ✓
                </Button>
              </div>
            </div>
          )}
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