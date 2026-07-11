import React from "react";

function Button({ children, variant = "primary", size = "md", disabled, loading, onClick, type = "button" }) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
    "transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-45 active:scale-[0.97]";

  const sizes = { sm: "text-sm px-4 py-2", md: "text-sm px-5 py-2.5", lg: "text-base px-7 py-3.5" };

  const styleByVariant = {
    primary: {
      background: "var(--amber)",
      color: "var(--board)",
      outlineColor: "var(--amber)",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      border: "1px solid var(--line)",
      outlineColor: "var(--teal)",
    },
    danger: {
      background: "var(--danger-soft)",
      color: "var(--danger)",
      outlineColor: "var(--danger)",
    },
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${sizes[size]}`}
      style={styleByVariant[variant]}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.filter = "brightness(1.08)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {loading && (
        <span
          className="h-3.5 w-3.5 rounded-full border-2 animate-spin"
          style={{ borderColor: "currentColor", borderTopColor: "transparent" }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

export default Button;