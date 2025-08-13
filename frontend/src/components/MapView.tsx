import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your Mapbox token

interface MarkerData {
    lat: number;
    lng: number;
    label?: string;
    description?: string;
}

interface MapViewProps {
    latitude?: number;
    longitude?: number;
    markers?: MarkerData[];
    showUserLocation?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
    latitude = 40.7128,
    longitude = -74.006,
    markers = [],
    showUserLocation = false
}) => {
    const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
    const [popup, setPopup] = useState<{ lat: number; lng: number; label?: string; description?: string } | null>(null);

    useEffect(() => {
        if (showUserLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                () => setUserLoc(null)
            );
        }
    }, [showUserLocation]);

    return (
        <div className="w-full h-96 rounded shadow overflow-hidden">
            <Map
                initialViewState={{
                    longitude: userLoc?.lng ?? longitude,
                    latitude: userLoc?.lat ?? latitude,
                    zoom: 12
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {markers.map((m, i) => (
                    <Marker key={i} longitude={m.lng} latitude={m.lat} color="#22c55e" onClick={() => setPopup(m)}>
                        {m.label && (
                            <div className="bg-white text-xs rounded px-1 py-0.5 shadow cursor-pointer">{m.label}</div>
                        )}
                    </Marker>
                ))}
                {userLoc && (
                    <Marker longitude={userLoc.lng} latitude={userLoc.lat} color="#2563eb">
                        <div className="bg-blue-600 text-white text-xs rounded px-1 py-0.5 shadow">You</div>
                    </Marker>
                )}
                {popup && (
                    <Popup longitude={popup.lng} latitude={popup.lat} anchor="top" onClose={() => setPopup(null)}>
                        <div className="text-sm font-bold mb-1">{popup.label}</div>
                        <div className="text-xs text-gray-600">{popup.description}</div>
                    </Popup>
                )}
            </Map>
        </div>
    );
};

export default MapView;
