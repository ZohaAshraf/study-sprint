import React from "react";

function LogRow({ entry }) {
  const statusStyles = {
    done: { label: "Completed", bg: "var(--teal-soft)", fg: "var(--teal)" },
    skipped: { label: "Skipped", bg: "var(--danger-soft)", fg: "var(--danger)" },
  };
  const s = statusStyles[entry.status];
  return (
    <li
      className="flex items-center justify-between gap-3 py-3"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          {entry.label}
        </span>
        <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
          {entry.time} · {entry.minutes} min
        </span>
      </div>
      <span
        className="text-xs font-medium rounded-full px-2.5 py-1"
        style={{ background: s.bg, color: s.fg }}
      >
        {s.label}
      </span>
    </li>
  );
}

export default LogRow;