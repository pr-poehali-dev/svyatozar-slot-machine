import { Card } from '@/components/ui/card';

interface GameCardProps {
  title: string;
  provider: string;
  imageUrl: string;
  onClick: () => void;
  isLive?: boolean;
}

const GameCard = ({ title, provider, imageUrl, onClick, isLive = false }: GameCardProps) => {
  return (
    <Card 
      className="relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 h-44 group rounded-2xl"
      onClick={onClick}
    >
      <img 
        src={imageUrl} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="relative h-full p-3 flex flex-col justify-between">
        <div>
          {isLive && (
            <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              LIVE
            </div>
          )}
        </div>
        <div>
          <p className="text-white/90 text-xs font-semibold mb-1">
            {provider}
          </p>
          <h3 className="text-white font-bold text-base drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;