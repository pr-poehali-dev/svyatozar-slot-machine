import { Card } from '@/components/ui/card';

interface GameCardProps {
  title: string;
  provider: string;
  bgGradient: string;
  icon: string;
  onClick: () => void;
}

const GameCard = ({ title, provider, bgGradient, icon, onClick }: GameCardProps) => {
  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-yellow-400/50 ${bgGradient} h-48 group`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative h-full p-4 flex flex-col justify-between">
        <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-black text-lg mb-1 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-white/80 text-sm font-bold">
            {provider}
          </p>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        LIVE
      </div>
    </Card>
  );
};

export default GameCard;
