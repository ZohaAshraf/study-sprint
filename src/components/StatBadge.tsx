import React from "react";

function StatBadge({ label, value, tone = "ink" }) {
  const toneMap = {
    ink: { bg: "var(--surface-2)", fg: "var(--ink)" },
    teal: { bg: "var(--teal-soft)", fg: "var(--teal)" },
    amber: { bg: "var(--amber-soft)", fg: "var(--amber)" },
  };
  const t = toneMap[tone];
  return (
    <div
      className="flex flex-col gap-0.5 rounded-xl px-4 py-3 min-w-[7.5rem]"
      style={{ background: t.bg }}
    >
      <span className="text-[0.7rem] uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
        {label}
      </span>
      <span className="text-xl font-semibold" style={{ color: t.fg, fontFamily: "'IBM Plex Mono', monospace" }}>
        {value}
      </span>
    </div>
  );
}

export default StatBadge;