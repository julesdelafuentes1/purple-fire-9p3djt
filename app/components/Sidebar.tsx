"use client";

const navItems = [
  { id: "dashboard", label: "Tableau de bord", icon: "grid" },
  { id: "compteurs", label: "Liste des compteurs", icon: "clock" },
  { id: "carto", label: "Cartographie", icon: "map" },
  { id: "import", label: "Import de factures", icon: "upload", badge: 3 },
  { id: "params", label: "Paramètres", icon: "settings" },
];

export default function Sidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (page: string) => void;
}) {
  return (
    <aside
      style={{
        width: "230px",
        minWidth: "230px",
        height: "100vh",
        position: "sticky",
        top: 0,
        background: "var(--bg-card)",
        borderRight: "0.5px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "0 18px 20px",
          borderBottom: "0.5px solid var(--border)",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "var(--green)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            EcoMairie
          </div>
          <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
            Gestion énergétique
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "0 10px", flex: 1 }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--text-faint)",
            padding: "0 8px",
            marginBottom: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Navigation
        </div>
        {navItems.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "var(--radius)",
              fontSize: "13px",
              cursor: "pointer",
              marginBottom: "2px",
              background:
                active === item.id ? "var(--green-light)" : "transparent",
              color:
                active === item.id ? "var(--green-text)" : "var(--text-muted)",
              fontWeight: active === item.id ? 500 : 400,
            }}
          >
            <span style={{ width: "16px", height: "16px" }}>•</span>
            {item.label}
          </div>
        ))}
        <div
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--text-faint)",
            padding: "0 8px",
            margin: "12px 0 4px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Données
        </div>
        {navItems.slice(3).map((item) => (
          <div
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "var(--radius)",
              fontSize: "13px",
              cursor: "pointer",
              marginBottom: "2px",
              background:
                active === item.id ? "var(--green-light)" : "transparent",
              color:
                active === item.id ? "var(--green-text)" : "var(--text-muted)",
              fontWeight: active === item.id ? 500 : 400,
            }}
          >
            <span>•</span>
            {item.label}
            {item.badge && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "var(--red-light)",
                  color: "var(--red)",
                  fontSize: "10px",
                  fontWeight: 600,
                  borderRadius: "10px",
                  padding: "1px 7px",
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "12px 18px 0",
          borderTop: "0.5px solid var(--border)",
        }}
      >
        <div
          style={{ fontSize: "12px", fontWeight: 500, color: "var(--text)" }}
        >
          Mairie de Marne-la-Vallée
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
          Île-de-France · 12 sites
        </div>
      </div>
    </aside>
  );
}
