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
      className="relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 border-0 h-32 md:h-40 group rounded-lg"
      onClick={onClick}
    >
      <img 
        src={imageUrl} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      <div className="relative h-full p-2 flex flex-col justify-between">
        <div>
          {isLive && (
            <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              LIVE
            </div>
          )}
        </div>
        <div>
          <p className="text-white/70 text-[10px] font-medium mb-0.5 hidden md:block">
            {provider}
          </p>
          <h3 className="text-white font-bold text-xs md:text-sm drop-shadow-lg line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;