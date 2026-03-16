export default function StatCard({
  label,
  value,
  unit,
  trend,
  trendUp,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendUp?: boolean;
  color: "green" | "blue" | "red";
}) {
  const colors = {
    green: { bar: "#1D9E75", icon: "#E1F5EE", text: "#1D9E75" },
    blue: { bar: "#185FA5", icon: "#E6F1FB", text: "#185FA5" },
    red: { bar: "#E24B4A", icon: "#FCEBEB", text: "#A32D2D" },
  };
  const c = colors[color];

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "16px 18px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: c.bar,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            background: c.icon,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: c.text,
            }}
          />
        </div>
      </div>
      <div
        style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.5px" }}
      >
        {value}{" "}
        <span
          style={{
            fontSize: "13px",
            fontWeight: 400,
            color: "var(--text-muted)",
          }}
        >
          {unit}
        </span>
      </div>
      <div
        style={{
          fontSize: "11px",
          marginTop: "6px",
          color: trendUp
            ? "#A32D2D"
            : trendUp === false
            ? "#1D9E75"
            : "var(--text-faint)",
        }}
      >
        {trend}
      </div>
    </div>
  );
}
