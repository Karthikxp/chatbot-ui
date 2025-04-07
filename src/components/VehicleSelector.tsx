
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import VehicleCard from './VehicleCard';
import { cn } from '@/lib/utils';

// Expanded vehicle data with real vehicles
const actualVehicles = [
  { id: '1', name: 'Tesla Model S', category: 'Electric Sedan', image: '' },
  { id: '2', name: 'Tesla Model 3', category: 'Electric Sedan', image: '' },
  { id: '3', name: 'Tesla Model X', category: 'Electric SUV', image: '' },
  { id: '4', name: 'Tesla Model Y', category: 'Electric SUV', image: '' },
  { id: '5', name: 'BMW i4', category: 'Electric Sedan', image: '' },
  { id: '6', name: 'BMW iX', category: 'Electric SUV', image: '' },
  { id: '7', name: 'BMW i7', category: 'Electric Luxury Sedan', image: '' },
  { id: '8', name: 'Mercedes-Benz EQS', category: 'Electric Luxury Sedan', image: '' },
  { id: '9', name: 'Mercedes-Benz EQE', category: 'Electric Sedan', image: '' },
  { id: '10', name: 'Mercedes-Benz EQB', category: 'Electric SUV', image: '' },
  { id: '11', name: 'Audi e-tron GT', category: 'Electric Sports Car', image: '' },
  { id: '12', name: 'Audi Q4 e-tron', category: 'Electric SUV', image: '' },
  { id: '13', name: 'Audi Q8 e-tron', category: 'Electric Luxury SUV', image: '' },
  { id: '14', name: 'Porsche Taycan', category: 'Electric Sports Car', image: '' },
  { id: '15', name: 'Ford Mustang Mach-E', category: 'Electric SUV', image: '' },
  { id: '16', name: 'Ford F-150 Lightning', category: 'Electric Truck', image: '' },
  { id: '17', name: 'Chevrolet Bolt EV', category: 'Electric Compact', image: '' },
  { id: '18', name: 'Chevrolet Silverado EV', category: 'Electric Truck', image: '' },
  { id: '19', name: 'Rivian R1T', category: 'Electric Truck', image: '' },
  { id: '20', name: 'Rivian R1S', category: 'Electric SUV', image: '' },
  { id: '21', name: 'Lucid Air', category: 'Electric Luxury Sedan', image: '' },
  { id: '22', name: 'Hyundai IONIQ 5', category: 'Electric Crossover', image: '' },
  { id: '23', name: 'Kia EV6', category: 'Electric Crossover', image: '' },
  { id: '24', name: 'Volkswagen ID.4', category: 'Electric SUV', image: '' },
  { id: '25', name: 'Nissan Ariya', category: 'Electric Crossover', image: '' },
  { id: '26', name: 'Polestar 2', category: 'Electric Sedan', image: '' },
  { id: '27', name: 'Volvo XC40 Recharge', category: 'Electric SUV', image: '' },
  { id: '28', name: 'Volvo C40 Recharge', category: 'Electric Crossover', image: '' },
  { id: '29', name: 'Subaru Solterra', category: 'Electric SUV', image: '' },
  { id: '30', name: 'Toyota bZ4X', category: 'Electric SUV', image: '' },
];

type VehicleSelectorProps = {
  onSelectVehicle: (vehicle: any) => void;
  selectedVehicleId: string | null;
};

const VehicleSelector = ({ onSelectVehicle, selectedVehicleId }: VehicleSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsToShow, setResultsToShow] = useState<typeof actualVehicles>([]);
  
  useEffect(() => {
    // Show results only when user starts typing
    if (searchQuery.length > 0) {
      const filtered = actualVehicles.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResultsToShow(filtered);
    } else {
      setResultsToShow([]);
    }
  }, [searchQuery]);

  return (
    <div className="w-full glass-card rounded-xl shadow-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-display font-semibold mb-6 gradient-text">Select Your Vehicle</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Type to search vehicles..."
          className="pl-10 bg-black/30 backdrop-blur-md text-white border-white/10 h-12 focus:ring-autoblue"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {searchQuery.length > 0 && resultsToShow.length > 0 ? (
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
          "animate-fade-in"
        )}>
          {resultsToShow.map((vehicle) => (
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
      ) : searchQuery.length > 0 && resultsToShow.length === 0 ? (
        <div className="text-center py-8 text-gray-400 animate-fade-in">
          No vehicles found matching your search.
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400 animate-pulse">
          Start typing to see available vehicles...
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;
