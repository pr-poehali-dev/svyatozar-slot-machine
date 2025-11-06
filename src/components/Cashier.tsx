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
    { id: 'sber', name: 'Сбербанк Онлайн', icon: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/sber-logo.svg', color: 'bg-[#21A038]' },
    { id: 'tinkoff', name: 'Тинькофф', icon: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/tinkoff-logo.svg', color: 'bg-[#FFDD2D]' },
    { id: 'alfa', name: 'Альфа-Банк', icon: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/alfa-logo.svg', color: 'bg-[#EF3124]' },
    { id: 'vtb', name: 'ВТБ', icon: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/vtb-logo.svg', color: 'bg-[#0078D2]' },
    { id: 'qiwi', name: 'QIWI Кошелёк', icon: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/qiwi-logo.svg', color: 'bg-[#FF8C00]' },
    { id: 'yoomoney', name: 'ЮMoney', icon: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/yoomoney-logo.svg', color: 'bg-[#8B3FFD]' },
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
      {showPayment && selectedMethod === 'sber' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F5] p-4">
          <div className="w-full max-w-lg bg-white shadow-xl">
            <div className="bg-[#21A038] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                <div className="text-white text-xl font-medium">СберБанк Онлайн</div>
              </div>
              <div className="text-white text-sm">09:47</div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="text-[#9E9E9E] text-sm mb-2">Перевод</div>
                <div className="text-[#333333] text-3xl font-medium">{(parseInt(amount) / 1000000).toFixed(2)} ₽</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-[#757575] text-sm">Откуда</span>
                  <span className="text-[#333333] text-sm font-medium">•• 4276</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-[#757575] text-sm">Куда</span>
                  <span className="text-[#333333] text-sm font-medium">СВЯТОЗАР</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-[#757575] text-sm">Комиссия</span>
                  <span className="text-[#333333] text-sm font-medium">0 ₽</span>
                </div>
              </div>
              
              <div className="bg-[#F5F5F5] rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-[#21A038] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <div className="text-[#333333] text-sm font-medium mb-1">Безопасная оплата</div>
                  <div className="text-[#757575] text-xs leading-relaxed">Ваши данные защищены технологией 3-D Secure</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-2 h-2 bg-[#21A038] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#21A038] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-[#21A038] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayment && selectedMethod === 'tinkoff' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F6F7F8] p-4">
          <div className="w-full max-w-lg bg-white shadow-xl">
            <div className="bg-[#FFDD2D] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full"></div>
                <div className="text-black text-xl font-bold">Тинькофф</div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="text-[#9299A2] text-sm mb-2">Оплата</div>
                <div className="text-[#333333] text-3xl font-bold">{(parseInt(amount) / 1000000).toFixed(2)} ₽</div>
              </div>
              
              <div className="bg-[#F6F7F8] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#9299A2] text-sm">Карта</span>
                  <span className="text-[#333333] text-sm font-medium">•• 5536</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9299A2] text-sm">Получатель</span>
                  <span className="text-[#333333] text-sm font-medium">СВЯТОЗАР</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-2 h-2 bg-[#FFDD2D] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#FFDD2D] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-[#FFDD2D] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayment && !['sber', 'tinkoff'].includes(selectedMethod || '') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 ${paymentMethods.find(m => m.id === selectedMethod)?.color} rounded-2xl flex items-center justify-center`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-[#333333] text-xl font-semibold mb-1">{paymentMethods.find(m => m.id === selectedMethod)?.name}</div>
              <div className="text-[#9E9E9E] text-sm">Подтверждение операции</div>
            </div>
            
            <div className="bg-[#F5F5F5] rounded-xl p-5 mb-6">
              <div className="text-[#757575] text-xs mb-1">Сумма</div>
              <div className="text-[#333333] text-3xl font-semibold">{(parseInt(amount) / 1000000).toFixed(2)} ₽</div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-[#757575]">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
                    className={`p-5 rounded-xl bg-white border-2 hover:shadow-lg transition-all ${
                      selectedMethod === method.id ? 'border-green-500 shadow-lg' : 'border-gray-700'
                    }`}
                  >
                    <div className={`${method.color} w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                      <div className="w-8 h-8 bg-white/90 rounded"></div>
                    </div>
                    <div className="text-white font-semibold text-sm">{method.name}</div>
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