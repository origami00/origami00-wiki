import { C } from "../tokens/design";

export default function LoadingFallback() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: 300, width: "100%",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        border: `3px solid ${C.accent}30`,
        borderTopColor: C.accent,
        animation: "spin 0.8s linear infinite",
      }} />
    </div>
  );
}
