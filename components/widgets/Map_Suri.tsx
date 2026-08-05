"use client";

//https://console.mapbox.com/ free account 
import React,{ useState } from 'react';
import Map , { Marker,Popup } from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css";

const points = [
  { id: 1, lat: 44.65889, lng: -1.16355, label: "Arcachon" },
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
        <div className="my-marker">
          📍
        </div>
        </Marker>
        
      ))}
      
    </Map>
  );
}