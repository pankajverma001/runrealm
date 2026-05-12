"use client";

import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Dashboard() {
  const [location, setLocation] = useState({
    longitude: 74.6269,
    latitude: 30.9010,
  });

  function findMyLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }

  return (
    <main className="relative w-screen h-screen">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: location.longitude,
          latitude: location.latitude,
          zoom: 14,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <Marker
          longitude={location.longitude}
          latitude={location.latitude}
          color="lime"
        />
      </Map>

      <button
        onClick={findMyLocation}
        className="absolute top-4 left-4 z-10 rounded-xl bg-green-500 px-5 py-3 font-bold text-black"
      >
        Find My Location
      </button>
    </main>
  );
}