import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface CashierProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onClose: () => void;
}

const Cashier = ({ balance, onBalanceChange, onClose }: CashierProps) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('1000000');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const paymentMethods = [
    { id: 'sber', name: 'Сбербанк', icon: '🟢', color: 'from-green-600 to-green-700' },
    { id: 'tinkoff', name: 'Тинькофф', icon: '💛', color: 'from-yellow-500 to-yellow-600' },
    { id: 'alfa', name: 'Альфа-Банк', icon: '🔴', color: 'from-red-600 to-red-700' },
    { id: 'vtb', name: 'ВТБ', icon: '🔵', color: 'from-blue-600 to-blue-700' },
    { id: 'qiwi', name: 'QIWI', icon: '🟠', color: 'from-orange-500 to-orange-600' },
    { id: 'yoomoney', name: 'ЮMoney', icon: '🟣', color: 'from-purple-600 to-purple-700' },
  ];

  const quickAmounts = [100000, 500000, 1000000, 5000000, 10000000, 50000000];

  const handleDeposit = () => {
    if (!selectedMethod) return;
    setShowPayment(true);

    setTimeout(() => {
      onBalanceChange(balance + parseInt(amount));
      setShowPayment(false);
      setAmount('1000000');
      setSelectedMethod(null);
    }, 3000);
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseInt(amount);
    if (balance < withdrawAmount || !selectedMethod) return;

    setShowPayment(true);

    setTimeout(() => {
      onBalanceChange(balance - withdrawAmount);
      setShowPayment(false);
      setAmount('1000000');
      setSelectedMethod(null);
    }, 3000);
  };

  return (
    <>
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{paymentMethods.find(m => m.id === selectedMethod)?.icon}</div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{paymentMethods.find(m => m.id === selectedMethod)?.name}</div>
                  <div className="text-sm text-gray-500">Онлайн-банк</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Сумма операции</div>
                <div className="text-3xl font-bold text-gray-900">{(parseInt(amount) / 1000000).toFixed(1)}M ₽</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Shield" size={16} className="text-blue-600" />
                  <div className="text-xs font-semibold text-blue-900">Безопасная транзакция</div>
                </div>
                <div className="text-xs text-blue-700">Данные защищены по стандарту PCI DSS</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span className="text-sm font-medium">Обработка платежа...</span>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <Card className="w-full max-w-2xl bg-[#0f1419] border-2 border-gray-800 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#0f1419] border-b border-gray-800 p-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-white">💰 КАССА</h2>
            <Button
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-700 p-2 h-10 w-10"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4">
              <div className="text-white/80 text-sm mb-1">Текущий баланс:</div>
              <div className="text-white text-3xl font-black">
                {(balance / 1000000).toFixed(1)}M₽
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setActiveTab('deposit')}
                className={`h-14 font-black text-lg ${
                  activeTab === 'deposit'
                    ? 'bg-green-600 hover:bg-green-500'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <Icon name="ArrowDownToLine" className="mr-2" />
                ПОПОЛНИТЬ
              </Button>
              <Button
                onClick={() => setActiveTab('withdraw')}
                className={`h-14 font-black text-lg ${
                  activeTab === 'withdraw'
                    ? 'bg-orange-600 hover:bg-orange-500'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <Icon name="ArrowUpFromLine" className="mr-2" />
                ВЫВЕСТИ
              </Button>
            </div>

            <div className="space-y-3">
              <label className="text-white font-semibold text-sm">Сумма:</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 bg-gray-900 border-gray-700 text-white text-2xl font-bold text-center focus:border-green-500 focus:ring-green-500"
                placeholder="Введите сумму"
              />

              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold"
                  >
                    {amt >= 1000000 ? `${amt / 1000000}M` : `${amt / 1000}K`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-white font-semibold text-sm">Выберите способ:</label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg bg-gradient-to-r ${method.color} hover:opacity-90 transition-all ${
                      selectedMethod === method.id ? 'ring-4 ring-yellow-400 scale-105' : ''
                    }`}
                  >
                    <div className="text-4xl mb-2">{method.icon}</div>
                    <div className="text-white font-bold text-sm">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={activeTab === 'deposit' ? handleDeposit : handleWithdraw}
              disabled={!selectedMethod || parseInt(amount) <= 0 || (activeTab === 'withdraw' && balance < parseInt(amount))}
              className={`w-full h-16 font-black text-xl ${
                activeTab === 'deposit'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600'
                  : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600'
              } disabled:opacity-50`}
            >
              {activeTab === 'deposit' ? (
                <>
                  <Icon name="ArrowDownToLine" className="mr-2" />
                  ПОПОЛНИТЬ {(parseInt(amount) / 1000000).toFixed(1)}M₽
                </>
              ) : (
                <>
                  <Icon name="ArrowUpFromLine" className="mr-2" />
                  ВЫВЕСТИ {(parseInt(amount) / 1000000).toFixed(1)}M₽
                </>
              )}
            </Button>

            {activeTab === 'withdraw' && balance < parseInt(amount) && (
              <div className="text-red-500 text-center font-bold">
                Недостаточно средств
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Cashier;