import React from 'react';
import MapView from '../components/MapView';

const MapPage: React.FC = () => {
  // Example: show two eco-friendly locations
  const ecoMarkers = [
    { lat: 40.713, lng: -74.006, label: 'Recycling Center' },
    { lat: 40.715, lng: -74.002, label: 'Eco Shop' },
  ];
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Eco Map</h2>
      <MapView latitude={40.7128} longitude={-74.006} markers={ecoMarkers} />
      <div className="mt-4 text-gray-600 text-sm">Find eco-friendly places and challenges near you!</div>
    </div>
  );
};

export default MapPage;
