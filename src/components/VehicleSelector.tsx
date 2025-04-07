
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import VehicleCard from './VehicleCard';
import { cn } from '@/lib/utils';

// Sample vehicle data
const sampleVehicles = [
  { id: '1', name: 'Tesla Model S', category: 'Electric Sedan', image: '' },
  { id: '2', name: 'BMW iX', category: 'Electric SUV', image: '' },
  { id: '3', name: 'Mercedes EQS', category: 'Electric Luxury', image: '' },
  { id: '4', name: 'Ford F-150 Lightning', category: 'Electric Truck', image: '' },
  { id: '5', name: 'Rivian R1T', category: 'Electric Truck', image: '' },
  { id: '6', name: 'Audi e-tron GT', category: 'Electric Sedan', image: '' },
];

type VehicleSelectorProps = {
  onSelectVehicle: (vehicle: any) => void;
  selectedVehicleId: string | null;
};

const VehicleSelector = ({ onSelectVehicle, selectedVehicleId }: VehicleSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [resultsToShow, setResultsToShow] = useState(sampleVehicles);
  
  useEffect(() => {
    if (searchQuery.length > 0) {
      setShowResults(true);
      const filtered = sampleVehicles.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResultsToShow(filtered);
    } else {
      setShowResults(false);
      setResultsToShow(sampleVehicles);
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
      
      {showResults && resultsToShow.length > 0 ? (
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
          "animate-fade-in"
        )}>
          {resultsToShow.map((vehicle, index) => (
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
      ) : showResults && resultsToShow.length === 0 ? (
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
