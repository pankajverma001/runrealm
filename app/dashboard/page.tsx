"use client";

import { useRef, useState } from "react";
import Map, { Marker, Source, Layer, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Point = [number, number];

export default function Dashboard() {
  const mapRef = useRef<MapRef | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const [location, setLocation] = useState({
    longitude: 74.6269,
    latitude: 30.901,
  });

  const [route, setRoute] = useState<Point[]>([]);
  const [tracking, setTracking] = useState(false);

  function startTracking() {
    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    if (watchIdRef.current !== null) return;

    setTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setLocation({ longitude: lng, latitude: lat });
        setRoute((oldRoute) => {
  if (oldRoute.length === 0) {
    return [[lng, lat]];
  }

  const lastPoint = oldRoute[oldRoute.length - 1];

  const distance =
    Math.sqrt(
      Math.pow(lng - lastPoint[0], 2) +
      Math.pow(lat - lastPoint[1], 2)
    );

  // Ignore tiny GPS movements
  if (distance < 0.0001) {
    return oldRoute;
  }

  return [...oldRoute, [lng, lat]];
});

        mapRef.current?.flyTo({
          center: [lng, lat],
          zoom: 16,
        });
      },
      (error) => {
        alert(error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  }

  function stopTracking() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setTracking(false);
  }

  const routeGeoJson = {
    type: "Feature" as const,
    geometry: {
      type: "LineString" as const,
      coordinates: route,
    },
    properties: {},
  };

  return (
    <main className="relative h-screen w-screen bg-black">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: location.longitude,
          latitude: location.latitude,
          zoom: 14,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {route.length > 1 && (
          <Source id="running-route" type="geojson" data={routeGeoJson}>
            <Layer
              id="running-route-line"
              type="line"
              paint={{
                "line-color": "#22c55e",
                "line-width": 5,
              }}
            />
          </Source>
        )}

        <Marker
          longitude={location.longitude}
          latitude={location.latitude}
          color="lime"
        />
      </Map>

      <div className="absolute left-4 top-4 z-10 rounded-2xl bg-black/80 p-4 text-white">
        <h1 className="text-xl font-bold text-green-400">RunRealm</h1>

        <p className="mt-1 text-sm text-gray-300">Points: {route.length}</p>

        {!tracking ? (
          <button
            onClick={startTracking}
            className="mt-4 rounded-xl bg-green-500 px-5 py-3 font-bold text-black"
          >
            Start Run
          </button>
        ) : (
          <button
            onClick={stopTracking}
            className="mt-4 rounded-xl bg-red-500 px-5 py-3 font-bold text-white"
          >
            Stop Run
          </button>
        )}
      </div>
    </main>
  );
}