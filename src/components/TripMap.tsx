"use client";

import React, { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

interface GeoCoordinates {
  latitude: number | string;
  longitude: number | string;
}

interface PlaceData {
  name: string;
  type: "hotel" | "place";
  geoCoordinates: GeoCoordinates | string;
  details?: string;
  timeTravel?: string;
  price?: string;
}

interface TripMapProps {
  hotels?: any[];
  itinerary?: any;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const extractCoordinates = (geoData: any): { lat: number; lng: number } | null => {
  if (!geoData) return null;

  try {
    if (typeof geoData === "object") {
      let lat = geoData.lat ?? geoData.latitude;
      let lng = geoData.lng ?? geoData.longitude ?? geoData.langitude;

      if (typeof lat === "string") lat = parseFloat(lat);
      if (typeof lng === "string") lng = parseFloat(lng);

      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    if (typeof geoData === "string") {
        const cleaned = geoData.replace(/°/g, "").replace(/[NSEW]/gi, "").trim();
        const parts = cleaned.split(",").map((s) => parseFloat(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            let lat = parts[0];
            let lng = parts[1];
            if (geoData.match(/S/i)) lat = -Math.abs(lat);
            if (geoData.match(/W/i)) lng = -Math.abs(lng);
            return { lat, lng };
        }
    }
  } catch (e) {
    console.error("Failed to parse coordinates: ", geoData, e);
  }

  return null;
};

const TripMap: React.FC<TripMapProps> = ({ hotels, itinerary }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);

  const markersData = useMemo(() => {
    const data: any[] = [];

    if (hotels && Array.isArray(hotels)) {
      hotels.forEach((hotel) => {
        const coordsRaw = hotel.geoCoordinates || hotel.geo_coordinates;
        const coords = extractCoordinates(coordsRaw);
        if (coords) {
          data.push({
            id: `hotel-${hotel.hotelName || hotel.hotel_name}`,
            name: hotel.hotelName || hotel.hotel_name,
            position: coords,
            type: "hotel",
            address: hotel.hotelAddress || hotel.address,
            price: hotel.price,
            rating: hotel.rating,
          });
        }
      });
    }

    if (itinerary && typeof itinerary === "object") {
      Object.keys(itinerary).forEach((dayKey) => {
        const day = itinerary[dayKey];
        if (day.places && Array.isArray(day.places)) {
          day.places.forEach((place: any, idx: number) => {
            const coordsRaw = place.geoCoordinates || place.geo_coordinates;
            const coords = extractCoordinates(coordsRaw);
            if (coords) {
              data.push({
                id: `place-${dayKey}-${idx}`,
                name: place.placeName || place.place_name || place.name,
                position: coords,
                type: "place",
                details: place.placeDetails || place.place_details || place.details || place.description,
                ticket: place.ticketPricing || place.ticket_pricing || place.ticket_price,
              });
            }
          });
        }
      });
    }

    return data;
  }, [hotels, itinerary]);

  const onLoad = useCallback(
    function callback(mapInstance: google.maps.Map) {
      if (markersData.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markersData.forEach((marker) => bounds.extend(marker.position));
        mapInstance.fitBounds(bounds);
        
        const listener = google.maps.event.addListener(mapInstance, "idle", () => {
          if (mapInstance.getZoom()! > 15) {
            mapInstance.setZoom(15);
          }
          google.maps.event.removeListener(listener);
        });
      }
      setMap(mapInstance);
    },
    [markersData]
  );

  const onUnmount = useCallback(function callback(mapInstance: google.maps.Map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] rounded-[2.5rem] bg-slate-100 animate-pulse flex items-center justify-center border border-slate-200">
        <span className="text-slate-400 font-bold">Loading Interactive Map...</span>
      </div>
    );
  }

  if (markersData.length === 0) {
    return null; 
  }

  return (
    <section className="relative px-6 max-w-7xl mx-auto z-20 mb-12">
        <div className="flex flex-col mb-8 items-start">
            <h2 className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-500 rounded-full"></span> Explore Geography
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Trip Map</h3>
        </div>
        
      <div className="rounded-[2.5rem] overflow-hidden shadow-xl ring-1 ring-slate-900/5 group border border-slate-200/60 bg-white">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markersData[0]?.position || defaultCenter}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {markersData.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={() => setSelectedMarker(marker)}
              label={{
                text: marker.type === "hotel" ? "🏨" : "📍",
                fontSize: "16px",
              }}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
              options={{
                 pixelOffset: new window.google.maps.Size(0, -30),
              }}
            >
              <div className="p-3 max-w-[250px]">
                <h4 className={`font-black text-lg mb-1 leading-tight ${selectedMarker.type === 'hotel' ? 'text-amber-600' : 'text-rose-600'}`}>
                  {selectedMarker.name}
                </h4>
                {selectedMarker.type === "hotel" ? (
                  <>
                    <p className="text-xs font-bold text-slate-500 mb-2">{selectedMarker.address}</p>
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                      <span>{selectedMarker.price}</span>
                      <span className="flex items-center gap-1 text-amber-500">⭐ {selectedMarker.rating}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-3">{selectedMarker.details}</p>
                    {selectedMarker.ticket && (
                        <div className="inline-block bg-white text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-200 mt-1">
                            🎟️ {selectedMarker.ticket}
                        </div>
                    )}
                  </>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </section>
  );
};

export default React.memo(TripMap);
