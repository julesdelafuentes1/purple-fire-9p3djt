"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Compteur = {
  id: string;
  nom_batiment: string;
  adresse: string;
  type_energie: string;
  statut: string;
  created_at: string;
};

const TYPE_STYLE: Record<
  string,
  { background: string; color: string; label: string }
> = {
  electricite: {
    background: "#E6F1FB",
    color: "#185FA5",
    label: "Électricité",
  },
  gaz: { background: "#FAEEDA", color: "#854F0B", label: "Gaz" },
  eau: { background: "#E1F5EE", color: "#085041", label: "Eau" },
};

const STATUT_STYLE: Record<string, { color: string; label: string }> = {
  normal: { color: "#1D9E75", label: "Normal" },
  surveillance: { color: "#EF9F27", label: "Surveillance" },
  alerte: { color: "#E24B4A", label: "Alerte" },
};

export default function CompteurTable() {
  const [compteurs, setCompteurs] = useState<Compteur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompteurs();
  }, []);

  async function fetchCompteurs() {
    const { data, error } = await supabase
      .from("compteurs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur Supabase :", error.message);
    } else {
      setCompteurs(data || []);
    }
    setLoading(false);
  }

  async function addCompteur() {
    const nom = prompt("Nom du bâtiment :");
    if (!nom) return;
    const type = prompt("Type (electricite / gaz / eau) :");
    if (!type) return;

    const { error } = await supabase
      .from("compteurs")
      .insert({ nom_batiment: nom, type_energie: type, statut: "normal" });

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      fetchCompteurs();
    }
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600 }}>
            Compteurs actifs
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              marginTop: "1px",
            }}
          >
            {loading ? "Chargement..." : `${compteurs.length} compteurs`}
          </div>
        </div>
        <button
          onClick={addCompteur}
          style={{
            background: "#1D9E75",
            color: "white",
            border: "none",
            borderRadius: "var(--radius)",
            padding: "8px 14px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          + Ajouter un compteur
        </button>
      </div>

      {loading ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "13px",
          }}
        >
          Chargement des compteurs...
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr style={{ background: "var(--bg-secondary)" }}>
              {["Bâtiment", "Type", "Statut", "Ajouté le"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 18px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compteurs.map((c) => {
              const type = TYPE_STYLE[c.type_energie] || {
                background: "#eee",
                color: "#333",
                label: c.type_energie,
              };
              const statut = STATUT_STYLE[c.statut] || {
                color: "#888",
                label: c.statut,
              };
              const date = new Date(c.created_at).toLocaleDateString("fr-FR");
              return (
                <tr
                  key={c.id}
                  style={{ borderTop: "0.5px solid var(--border)" }}
                >
                  <td style={{ padding: "12px 18px" }}>
                    <div style={{ fontWeight: 500 }}>{c.nom_batiment}</div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        marginTop: "1px",
                      }}
                    >
                      {c.adresse || "—"}
                    </div>
                  </td>
                  <td style={{ padding: "12px 18px" }}>
                    <span
                      style={{
                        background: type.background,
                        color: type.color,
                        fontSize: "11px",
                        fontWeight: 500,
                        padding: "3px 8px",
                        borderRadius: "20px",
                      }}
                    >
                      {type.label}
                    </span>
                  </td>
                  <td style={{ padding: "12px 18px" }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: statut.color,
                          display: "inline-block",
                        }}
                      />
                      {statut.label}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 18px",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
