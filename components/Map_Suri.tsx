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
  
export default function MyMap() {

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        latitude: 44.64,
        longitude: -1.15,
        zoom: 11,
      }}
      style={{ width: "100%", height: 400 }}
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