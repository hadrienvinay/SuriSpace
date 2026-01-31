"use client";

//https://console.mapbox.com/ free account 
import React,{ useState } from 'react';
import Map , { Marker,Popup } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";

const points = [
  { id: 1, lat: 48.8566, lng: 2.3522, label: "Paris" },
  { id: 2, lat: 48.8606, lng: 2.3376, label: "Louvre" },
  { id: 3, lat: 48.853, lng: 2.3499, label: "Notre-Dame" },
];

export default function MapboxMap() {
    const [selected, setSelected] = useState<any>(null);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13,
      }}
      style={{ width: "100%", height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {points.map((point) => (
        <Marker
          key={point.id}
          latitude={point.lat}
          longitude={point.lng}
          anchor="bottom"
          onClick={() => setSelected(point)}
        >
        <div className="bg-red-600 text-white px-2 py-1 rounded">
          🐣
        </div>
        </Marker>
        
      ))}
      {selected && (
        <Popup
            latitude={selected.lat}
            longitude={selected.lng}
            onClose={() => setSelected(null)}
        >
            <p>{selected.label}</p>
        </Popup>
        )}
    </Map>
  );
}

export function MyMap() {

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        latitude: 44.4,
        longitude: -1.3522,
        zoom: 13,
      }}
      style={{ width: "80%", height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {points.map((point) => (
        <Marker
          key={point.id}
          latitude={point.lat}
          longitude={point.lng}
          anchor="bottom"
        >
        <div className="">
          📍
        </div>
        </Marker>
        
      ))}
      
    </Map>
  );
}