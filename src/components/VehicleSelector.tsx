
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import VehicleCard from './VehicleCard';

// Sample vehicle data
const sampleVehicles = [
  { id: '1', name: 'Tesla Model S', category: 'Electric Sedan', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=500&h=300' },
  { id: '2', name: 'BMW iX', category: 'Electric SUV', image: 'https://images.unsplash.com/photo-1661707732852-0016d0578bbc?auto=format&fit=crop&q=80&w=500&h=300' },
  { id: '3', name: 'Mercedes EQS', category: 'Electric Luxury', image: 'https://images.unsplash.com/photo-1617813480074-a007b09ac6a7?auto=format&fit=crop&q=80&w=500&h=300' },
  { id: '4', name: 'Ford F-150 Lightning', category: 'Electric Truck', image: 'https://images.unsplash.com/photo-1670585095315-a14bac4df0ff?auto=format&fit=crop&q=80&w=500&h=300' },
  { id: '5', name: 'Rivian R1T', category: 'Electric Truck', image: 'https://images.unsplash.com/photo-1661705695366-817f9585fbe4?auto=format&fit=crop&q=80&w=500&h=300' },
  { id: '6', name: 'Audi e-tron GT', category: 'Electric Sedan', image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=500&h=300' },
];

type VehicleSelectorProps = {
  onSelectVehicle: (vehicle: any) => void;
  selectedVehicleId: string | null;
};

const VehicleSelector = ({ onSelectVehicle, selectedVehicleId }: VehicleSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredVehicles = sampleVehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-autodark">Select a Vehicle</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search vehicles..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              id={vehicle.id}
              name={vehicle.name}
              image={vehicle.image}
              category={vehicle.category}
              selected={vehicle.id === selectedVehicleId}
              onClick={() => onSelectVehicle(vehicle)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No vehicles found matching your search.
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;
