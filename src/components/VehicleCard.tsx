
import React from 'react';
import { cn } from '@/lib/utils';
import { Car } from 'lucide-react';

type VehicleCardProps = {
  id: string;
  name: string;
  image: string;
  category: string;
  selected: boolean;
  onClick: () => void;
};

const VehicleCard = ({ id, name, category, selected, onClick }: VehicleCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card flex flex-col items-center p-6 rounded-xl transition-all duration-300 cursor-pointer",
        "hover:scale-105 animate-fade-in",
        selected 
          ? "bg-gradient-blue border-autoblue border-2" 
          : "hover:border-white/30 border-transparent border"
      )}
      onClick={onClick}
    >
      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-autoblue to-autoblue-dark flex items-center justify-center">
        <Car className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-display text-base font-medium text-white mb-1">{name}</h3>
      <span className="text-xs text-gray-400">{category}</span>
    </div>
  );
};

export default VehicleCard;
