"use client";

import { useEffect } from "react";

const SITES = [
  {
    id: 1,
    nom: "Hôtel de Ville",
    adresse: "12 pl. de la République",
    type: "electricite",
    releve: "14 mars 2026",
    conso: "8 420 kWh",
    lat: 48.844,
    lng: 2.602,
  },
  {
    id: 2,
    nom: "École Jean Jaurès",
    adresse: "5 rue des Lilas",
    type: "gaz",
    releve: "10 mars 2026",
    conso: "3 180 m³",
    lat: 48.846,
    lng: 2.599,
  },
  {
    id: 3,
    nom: "Piscine Municipale",
    adresse: "2 av. du Parc",
    type: "eau",
    releve: "15 mars 2026",
    conso: "1 240 m³",
    lat: 48.842,
    lng: 2.6055,
  },
  {
    id: 4,
    nom: "Gymnase Pasteur",
    adresse: "18 rue Pasteur",
    type: "electricite",
    releve: "13 mars 2026",
    conso: "5 660 kWh",
    lat: 48.8475,
    lng: 2.604,
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    L: any;
  }
}

export default function MapView() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingLink = document.getElementById("leaflet-css");
    if (!existingLink) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById("leaflet-js");
    if (existingScript) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.id = "leaflet-js";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      const mapEl = document.getElementById("leaflet-map");
      if (mapEl) mapEl.innerHTML = "";
    };
  }, []);

  function initMap() {
    const L = window.L;
    if (!L) return;

    const mapEl = document.getElementById("leaflet-map");
    if (!mapEl || mapEl.children.length > 0) return;

    const map = L.map("leaflet-map").setView([48.845, 2.602], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    SITES.forEach((site) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;border-radius:50%;background:#1D9E75;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;">
          <div style="width:8px;height:8px;border-radius:50%;background:white;"></div>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([site.lat, site.lng], { icon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family:sans-serif;min-width:180px;">
          <div style="font-weight:600;font-size:13px;margin-bottom:6px;">${site.nom}</div>
          <div style="font-size:11px;color:#6b6a65;margin-bottom:8px;">${site.adresse}</div>
          <div style="background:#F1F0EB;border-radius:6px;padding:8px;">
            <div style="font-size:10px;color:#9c9a94;text-transform:uppercase;margin-bottom:3px;">Dernière conso</div>
            <div style="font-size:15px;font-weight:600;">${site.conso}</div>
            <div style="font-size:11px;color:#6b6a65;margin-top:2px;">Relevé du ${site.releve}</div>
          </div>
        </div>
      `);
    });
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: 600 }}>
          Carte des compteurs
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            marginTop: "1px",
          }}
        >
          Cliquez sur un marqueur pour voir les détails
        </div>
      </div>
      <div id="leaflet-map" style={{ height: "400px", width: "100%" }} />
    </div>
  );
}
