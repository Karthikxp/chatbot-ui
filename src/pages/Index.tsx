
import React, { useState } from 'react';
import VehicleSelector from '@/components/VehicleSelector';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 gradient-text">Vehicle Info Bot</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Select a vehicle from our collection and ask any questions about its features, specifications, and capabilities.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left side - Vehicle Selection */}
          <div className={`${selectedVehicle ? 'md:col-span-5' : 'md:col-span-12'}`}>
            <VehicleSelector 
              onSelectVehicle={setSelectedVehicle} 
              selectedVehicleId={selectedVehicle?.id || null} 
            />
          </div>

          {/* Right side - Chat Interface */}
          {selectedVehicle && (
            <div className="md:col-span-7 h-[600px]">
              <ChatInterface selectedVehicle={selectedVehicle} />
            </div>
          )}
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 Vehicle Info Bot. All vehicle information is simulated for demonstration purposes.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
