"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import CompteurTable from "./components/CompteurTable";
import MapView from "./components/MapView";

export default function Home() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={page} onChange={setPage} />
      <main style={{ flex: 1, background: "var(--bg)", overflowY: "auto" }}>
        {/* Topbar */}
        <div
          style={{
            background: "var(--bg-card)",
            borderBottom: "0.5px solid var(--border)",
            padding: "14px 24px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: "15px", fontWeight: 600 }}>
            {page === "dashboard" && "Tableau de bord"}
            {page === "compteurs" && "Liste des compteurs"}
            {page === "carto" && "Cartographie"}
            {page === "import" && "Import de factures"}
            {page === "params" && "Paramètres"}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              marginTop: "1px",
            }}
          >
            Mars 2026 · 12 compteurs actifs
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: "20px 24px" }}>
          {page === "dashboard" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                }}
              >
                <StatCard
                  label="Consommation totale"
                  value="148 290"
                  unit="kWh"
                  trend="−4,2% vs mois précédent"
                  trendUp={false}
                  color="green"
                />
                <StatCard
                  label="Coût du mois"
                  value="21 430"
                  unit="€"
                  trend="+1,8% vs mois précédent"
                  trendUp={true}
                  color="blue"
                />
                <StatCard
                  label="Alertes en cours"
                  value="3"
                  unit="alertes"
                  trend="2 avertissements · 1 critique"
                  color="red"
                />
              </div>
              <CompteurTable />
            </div>
          )}
          {page === "carto" && <MapView />}
          {page === "compteurs" && (
            <h1 style={{ fontSize: "18px", fontWeight: 600 }}>
              Liste des compteurs
            </h1>
          )}
          {page === "import" && (
            <h1 style={{ fontSize: "18px", fontWeight: 600 }}>
              Import de factures
            </h1>
          )}
          {page === "params" && (
            <h1 style={{ fontSize: "18px", fontWeight: 600 }}>Paramètres</h1>
          )}
        </div>
      </main>
    </div>
  );
}
