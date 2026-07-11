function pad(n: number): string {
  return String(n).padStart(2, "0");
}

type FlapDigitProps = {
  char: string;
};

function FlapDigit({ char }: FlapDigitProps) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md sm:rounded-lg"
      style={{
        background: "var(--board)",
        color: "var(--board-digit)",
        width: "clamp(2.1rem, 6vw, 3.6rem)",
        height: "clamp(2.8rem, 8vw, 4.6rem)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "clamp(1.5rem, 4.5vw, 2.6rem)",
        fontWeight: 600,
        boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.05)",
        transition: "color 200ms ease, background 200ms ease",
      }}
    >
      {char}
    </span>
  );
}

type TimerBoardProps = {
  seconds: number;
};

function TimerBoard({ seconds }: TimerBoardProps) {
  const m = pad(Math.floor(seconds / 60));
  const s = pad(seconds % 60);
  const chars = [...m, ":", ...s];
  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5"
      role="timer"
      aria-live="polite"
      aria-label={`${m} minutes ${s} seconds remaining`}
    >
      {chars.map((c, i) =>
        c === ":" ? (
          <span
            key={i}
            aria-hidden="true"
            style={{ color: "var(--ink-soft)", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 700 }}
          >
            :
          </span>
        ) : (
          <FlapDigit key={i} char={c} />
        )
      )}
    </div>
  );
}

export default TimerBoard;
