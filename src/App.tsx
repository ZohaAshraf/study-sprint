import Button from "./components/Button";
import TimerBoard from "./components/TimerBoard";
import StatBadge from "./components/StatBadge";
import LogRow from "./components/LogRow";
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * STUDY SPRINT — Focus Session Tracker
 * Reference mock for the Web Dev Track Stretch Task.
 *
 * Design tokens live as CSS custom properties on the root wrapper and flip
 * via a `data-theme` attribute — nothing below is a hardcoded hex value.
 */

const TOKENS = `
[data-theme="light"] {
  --bg: #FAFAF7;
  --surface: #FFFFFF;
  --surface-2: #F0EEE6;
  --ink: #1B1E27;
  --ink-soft: #5B5F6B;
  --line: #E2DFD4;
  --amber: #C97A1D;
  --amber-soft: #F4E3C6;
  --amber-text: #8A5312;
  --teal: #2F7B6E;
  --teal-soft: #DCEEEA;
  --teal-text: #1F5C52;
  --danger: #B0453C;
  --danger-soft: #F4DEDB;
  --danger-text: #8C3129;
  --board: #1B1E27;
  --board-digit: #F4E3C6;
  --shadow: 0 1px 2px rgba(27,30,39,0.06), 0 8px 24px rgba(27,30,39,0.06);
}
[data-theme="dark"] {
  --bg: #14171F;
  --surface: #1B1F2A;
  --surface-2: #232838;
  --ink: #F1EFE6;
  --ink-soft: #9A9DAC;
  --line: #2E3342;
  --amber: #E8A23D;
  --amber-soft: #3A2E17;
  --amber-text: #E8A23D;
  --teal: #4FB3A2;
  --teal-soft: #163330;
  --teal-text: #4FB3A2;
  --danger: #E37065;
  --danger-soft: #3A1E1B;
  --danger-text: #E37065;
  --board: #0D0F15;
  --board-digit: #E8A23D;
  --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.35);
}
`;

const DURATIONS = [
  { label: "Sprint", minutes: 25 },
  { label: "Deep", minutes: 50 },
  { label: "Short break", minutes: 5 },
];

type LogEntry = {
  label: string;
  time: string;
  minutes: number;
  status: "done" | "skipped";
};

export default function App() {
  const [theme, setTheme] = useState("light");
  const [durationIdx, setDurationIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS[0].minutes * 60);
  const [running, setRunning] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([
    { label: "Deep work — Bison grammar", time: "9:10 AM", minutes: 50, status: "done" },
    { label: "Sprint — SHAP write-up", time: "8:20 AM", minutes: 25, status: "skipped" },
  ]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const total = DURATIONS[durationIdx].minutes * 60;
  const pct = Math.round(((total - secondsLeft) / total) * 100);
  const complete = secondsLeft === 0;

  const handleDurationChange = useCallback(
    (idx: number) => {
      if (running) return;
      setDurationIdx(idx);
      setSecondsLeft(DURATIONS[idx].minutes * 60);
    },
    [running]
  );

  const handleReset = () => {
    setRunning(false);
    setSecondsLeft(DURATIONS[durationIdx].minutes * 60);
  };

  const handleFinishSync = () => {
    setSyncing(true);
    setSyncError(false);
    setTimeout(() => {
      setSyncing(false);
      const failed = Math.random() < 0.3;
      if (failed) {
        setSyncError(true);
        return;
      }
      setLog((l) => [
        {
          label: `${DURATIONS[durationIdx].label} — untitled task`,
          time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          minutes: DURATIONS[durationIdx].minutes,
          status: "done",
        },
        ...l,
      ]);
      handleReset();
    }, 1100);
  };

  return (
    <div data-theme={theme} style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <style>{TOKENS}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap"
      />
      <main className="mx-auto max-w-5xl px-5 sm:px-8 py-8 sm:py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
        <header className="flex items-center justify-between mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
