import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  radius: number; // in miles
  center: [number, number];
  postcode: string;
}

const TravelRadiusMap = ({ radius, center, postcode }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Marker at center
    const icon = L.divIcon({
      html: `<div style="width:12px;height:12px;background:#ef3e50;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
      className: "",
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
    L.marker(center, { icon }).addTo(map);

    // Circle
    const radiusMeters = radius * 1609.34;
    const circle = L.circle(center, {
      radius: radiusMeters,
      color: "hsl(217, 100%, 52%)",
      fillColor: "hsl(217, 100%, 52%)",
      fillOpacity: 0.1,
      weight: 2,
    }).addTo(map);

    circleRef.current = circle;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [center, radius]);

  // Update circle radius when slider changes
  useEffect(() => {
    if (!circleRef.current || !mapInstanceRef.current) return;
    const radiusMeters = radius * 1609.34;
    circleRef.current.setRadius(radiusMeters);

    // Fit map to circle bounds
    const bounds = circleRef.current.getBounds();
    mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
  }, [radius]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default TravelRadiusMap;
