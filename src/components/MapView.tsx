import React, { useEffect, useRef } from 'react';
import type { HelpLocation } from '../types';
import { CATEGORIES } from '../data/categories';
import L from 'leaflet';
import { Compass, Phone, Navigation, Star, Accessibility } from 'lucide-react';

interface MapViewProps {
  locations: HelpLocation[];
  onSelectLocation: (loc: HelpLocation) => void;
  selectedLocation: HelpLocation | null;
}

export const MapView: React.FC<MapViewProps> = ({
  locations,
  onSelectLocation,
  selectedLocation
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      // Uzbekistan center default: Toshkent (41.2995, 69.2401)
      const map = L.map(mapContainerRef.current, {
        center: [41.2995, 69.2401],
        zoom: 12,
        zoomControl: false
      });

      // CartoDB / OpenStreetMap tile layer for sleek modern look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapRef.current = map;
    }

    return () => {
      // Keep map instance persistent
    };
  }, []);

  // Update Markers whenever locations change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    if (locations.length === 0) return;

    const bounds = L.latLngBounds([]);

    locations.forEach((loc) => {
      const cat = CATEGORIES.find(c => c.id === loc.categoryId);
      const color = cat?.markerColor || '#10b981';

      // Custom SVG Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${color};
            width: 38px;
            height: 38px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 16px rgba(0,0,0,0.3);
            border: 3px solid white;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-weight: bold;
              font-size: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              ${loc.categoryId === 'talabalar' ? '🏠' :
                loc.categoryId === 'ovqat' ? '🍲' :
                loc.categoryId === 'kiyim' ? '👕' :
                loc.categoryId === 'tibbiyot' ? '🏥' :
                loc.categoryId === 'oqv_qurol' ? '📚' :
                loc.categoryId === 'ish' ? '💼' :
                loc.categoryId === 'yordam_beruvchi' ? '🤝' :
                loc.categoryId === 'hayvonlar' ? '🐕' :
                loc.categoryId === 'yoqotilgan' ? '🔎' : '♿️'}
            </div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -34]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family: inherit; width: 240px; padding: 4px;">
          <div style="font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase; margin-bottom: 2px;">
            ${cat?.name || loc.subcategory}
          </div>
          <h4 style="font-size: 13px; font-weight: 700; color: #1e293b; margin: 0 0 6px 0; line-height: 1.3;">
            ${loc.title}
          </h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0;">
            📍 ${loc.address}
          </p>
          <div style="display: flex; gap: 4px; margin-bottom: 8px;">
            <span style="background-color: #ecfdf5; color: #047857; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 6px;">
              ${loc.priceType}
            </span>
            ${loc.isAccessible ? '<span style="background-color: #ccfbf1; color: #0f766e; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 6px;">♿️ Inkluziv</span>' : ''}
          </div>
          <button id="btn-detail-${loc.id}" style="
            width: 100%;
            background-color: #059669;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(5,150,105,0.3);
          ">
            Batafsil ko'rish
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-detail-${loc.id}`);
        if (btn) {
          btn.onclick = () => onSelectLocation(loc);
        }
      });

      marker.on('click', () => {
        onSelectLocation(loc);
      });

      markersRef.current[loc.id] = marker;
      bounds.extend([loc.lat, loc.lng]);
    });

    if (locations.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [locations, onSelectLocation]);

  // Center on user location
  const handleUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolokatsiya brauzeringizda qo\'llab-quvvatlanmaydi');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 14, { animate: true });

          // User blue dot marker
          L.circleMarker([latitude, longitude], {
            radius: 9,
            color: '#ffffff',
            weight: 3,
            fillColor: '#3b82f6',
            fillOpacity: 1
          }).addTo(mapRef.current).bindPopup('<b>Sizning joylashuvingiz</b>').openPopup();
        }
      },
      () => {
        alert('Joylashuvingizni aniqlashga ruxsat berilmadi.');
      }
    );
  };

  return (
    <div className="relative w-full h-[calc(100vh-190px)] min-h-[450px]">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Geolocation Button */}
      <button
        onClick={handleUserLocation}
        className="absolute top-4 right-4 z-20 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-xs py-2.5 px-3.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 transition-all cursor-pointer"
        title="Mening joylashuvim"
      >
        <Compass className="w-4 h-4 text-emerald-600 animate-spin-slow" />
        <span>Mening joylashuvim</span>
      </button>

      {/* Floating Legend */}
      <div className="absolute bottom-6 left-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 max-w-xs hidden md:block">
        <h5 className="text-xs font-black text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-between">
          <span>Xarita belgilar:</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{locations.length} nuqta</span>
        </h5>
        <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Talabalar</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Bepul ovqat</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Kiyim banki</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Tibbiy yordam</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Kitob & Darslik</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-600" /> ♿️ Inkluziv</div>
        </div>
      </div>
    </div>
  );
};
