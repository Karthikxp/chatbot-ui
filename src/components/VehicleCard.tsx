
import React from 'react';
import { cn } from '@/lib/utils';

type VehicleCardProps = {
  id: string;
  name: string;
  image: string;
  category: string;
  selected: boolean;
  onClick: () => void;
};

const VehicleCard = ({ id, name, image, category, selected, onClick }: VehicleCardProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center p-4 rounded-lg transition-all duration-200 cursor-pointer border-2",
        selected 
          ? "border-autoblue bg-autoblue/10" 
          : "border-gray-200 hover:border-autoblue/50 hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-40 h-24 object-contain mb-3"
      />
      <h3 className="font-medium text-sm">{name}</h3>
      <span className="text-xs text-gray-500">{category}</span>
    </div>
  );
};

export default VehicleCard;
