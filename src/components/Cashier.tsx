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
    { id: 'sber', name: 'Сбербанк', color: '#21A038' },
    { id: 'tinkoff', name: 'Тинькофф', color: '#FFDD2D' },
    { id: 'alfa', name: 'Альфа-Банк', color: '#EF3124' },
    { id: 'vtb', name: 'ВТБ', color: '#0078D2' },
    { id: 'qiwi', name: 'QIWI', color: '#FF8C00' },
    { id: 'yoomoney', name: 'ЮMoney', color: '#8B3FFD' },
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
          <div className="w-full max-w-md bg-white shadow-2xl">
            <div className="bg-[#21A038] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="white"/>
                  <path d="M28 15l-10 10-6-6" stroke="#21A038" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-white text-lg font-normal tracking-wide">СберБанк Онлайн</div>
              </div>
              <div className="text-white text-sm font-light">09:47</div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="text-[#9E9E9E] text-xs uppercase tracking-wider mb-2">Перевод</div>
                <div className="text-[#000000] text-4xl font-light">{(parseInt(amount)).toLocaleString('ru-RU')} ₽</div>
              </div>
              
              <div className="space-y-0">
                <div className="flex items-center justify-between py-4 border-b border-[#E0E0E0]">
                  <span className="text-[#757575] text-sm">Откуда</span>
                  <span className="text-[#000000] text-sm">•• 4276</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-[#E0E0E0]">
                  <span className="text-[#757575] text-sm">Куда</span>
                  <span className="text-[#000000] text-sm">СВЯТОЗАР</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-[#E0E0E0]">
                  <span className="text-[#757575] text-sm">Комиссия</span>
                  <span className="text-[#000000] text-sm">0 ₽</span>
                </div>
              </div>
              
              <div className="bg-[#F5F5F5] p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-[#21A038] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <div className="text-[#000000] text-sm font-normal mb-1">Безопасная оплата</div>
                  <div className="text-[#757575] text-xs leading-relaxed">Данные защищены технологией 3-D Secure</div>
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
          <div className="w-full max-w-md bg-white shadow-2xl">
            <div className="bg-[#FFDD2D] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#000000] rounded-full flex items-center justify-center text-[#FFDD2D] font-black text-xl">Т</div>
                <div className="text-[#000000] text-lg font-bold">Тинькофф</div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="text-[#9299A2] text-sm mb-2">Оплата</div>
                <div className="text-[#000000] text-4xl font-bold">{(parseInt(amount)).toLocaleString('ru-RU')} ₽</div>
              </div>
              
              <div className="bg-[#F6F7F8] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#9299A2] text-sm">Карта</span>
                  <span className="text-[#000000] text-sm font-medium">•• 5536</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9299A2] text-sm">Получатель</span>
                  <span className="text-[#000000] text-sm font-medium">СВЯТОЗАР</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-2 h-2 bg-[#000000] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#000000] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-[#000000] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayment && selectedMethod === 'alfa' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md bg-white shadow-2xl border border-[#E5E5E5]">
            <div className="bg-[#EF3124] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-10 h-10" viewBox="0 0 40 40" fill="white">
                  <path d="M20 5L35 35H5L20 5Z"/>
                </svg>
                <div className="text-white text-lg font-semibold">Альфа-Банк</div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="text-[#808080] text-sm mb-2">Сумма операции</div>
                <div className="text-[#000000] text-4xl font-semibold">{(parseInt(amount)).toLocaleString('ru-RU')} ₽</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
                  <span className="text-[#808080] text-sm">Счёт списания</span>
                  <span className="text-[#000000] text-sm">•• 6390</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
                  <span className="text-[#808080] text-sm">Получатель</span>
                  <span className="text-[#000000] text-sm">СВЯТОЗАР</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-2 h-2 bg-[#EF3124] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#EF3124] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-[#EF3124] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayment && !['sber', 'tinkoff', 'alfa'].includes(selectedMethod || '') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md bg-white shadow-2xl border border-[#E0E0E0]">
            <div style={{backgroundColor: paymentMethods.find(m => m.id === selectedMethod)?.color}} className="px-6 py-5">
              <div className="text-white text-lg font-semibold">{paymentMethods.find(m => m.id === selectedMethod)?.name}</div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="text-[#757575] text-sm mb-2">Сумма</div>
                <div className="text-[#000000] text-4xl font-medium">{(parseInt(amount)).toLocaleString('ru-RU')} ₽</div>
              </div>
              
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
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
                    style={{backgroundColor: method.color}}
                    className={`p-5 hover:opacity-90 transition-all ${
                      selectedMethod === method.id ? 'ring-4 ring-white scale-105' : ''
                    }`}
                  >
                    <div className={`text-${method.id === 'tinkoff' ? 'black' : 'white'} font-bold text-base`}>{method.name}</div>
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
          </div>
        </Card>
      </div>
    </>
  );
};

export default Cashier;
