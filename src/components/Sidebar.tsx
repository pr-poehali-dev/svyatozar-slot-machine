import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Cashier from './Cashier';

interface SidebarProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const Sidebar = ({ balance, onBalanceChange }: SidebarProps) => {
  const [showCashier, setShowCashier] = useState(false);

  const quickAmounts = [50000, 100000, 500000, 1000000, 5000000];

  return (
    <>
      {showCashier && (
        <Cashier
          balance={balance}
          onBalanceChange={onBalanceChange}
          onClose={() => setShowCashier(false)}
        />
      )}

      <div className="w-64 bg-[#0f1419] border-r border-gray-800 p-4 space-y-4 h-screen overflow-y-auto sticky top-0">
        <div className="space-y-3">
          <Card className="bg-gradient-to-br from-green-600 to-green-700 p-4 border-0 rounded-lg">
            <div className="text-green-100 text-xs mb-1 font-semibold uppercase tracking-wide">Баланс</div>
            <div className="text-white text-3xl font-black">{balance.toLocaleString()}₽</div>
          </Card>

          <Button 
            onClick={() => setShowCashier(true)}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3 text-sm rounded-lg border-0"
          >
            <Icon name="Wallet" className="mr-2" size={18} />
            КАССА
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
    </>
  );
};

export default Sidebar;
