export default function CatSitting() {
  return (
    <svg viewBox="0 0 200 210" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.05))" }}>
      <defs>
        <radialGradient id="gc" cx="50%" cy="95%">
          <stop offset="0%" stopColor="#a8e6cf" stopOpacity=".5" />
          <stop offset="100%" stopColor="#a8e6cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="190" rx="60" ry="10" fill="url(#gc)" />
      <ellipse cx="100" cy="148" rx="38" ry="36" fill="#ffecd2" />
      <circle cx="100" cy="95" r="32" fill="#fff5e6" />
      <polygon points="74,78 80,50 90,74" fill="#fff5e6" />
      <polygon points="110,74 120,50 126,78" fill="#fff5e6" />
      <polygon points="76,76 81,55 88,73" fill="#ffb6b9" opacity=".3" />
      <polygon points="112,73 119,55 124,76" fill="#ffb6b9" opacity=".3" />
      <ellipse cx="88" cy="92" rx="3.5" ry="4" fill="#2d3436" />
      <ellipse cx="112" cy="92" rx="3.5" ry="4" fill="#2d3436" />
      <ellipse cx="89" cy="91" rx="1.3" ry="1.6" fill="#fff" />
      <ellipse cx="113" cy="91" rx="1.3" ry="1.6" fill="#fff" />
      <ellipse cx="100" cy="100" rx="2.5" ry="1.8" fill="#ffb6b9" />
      <path d="M95,103 Q100,107 105,103" fill="none" stroke="#d4c5b0" strokeWidth=".8" />
      <ellipse cx="78" cy="98" rx="6" ry="3.5" fill="#ffb6b9" opacity=".18" />
      <ellipse cx="122" cy="98" rx="6" ry="3.5" fill="#ffb6b9" opacity=".18" />
      <circle cx="108" cy="68" r="4.5" fill="#ffd93d" />
      <circle cx="105" cy="65" r="2.5" fill="#ff6b6b" opacity=".45" />
      <circle cx="111" cy="65" r="2.5" fill="#ff6b6b" opacity=".45" />
      <circle cx="108" cy="62" r="2.5" fill="#ff6b6b" opacity=".45" />
      <path d="M136,145 Q155,125 148,105 Q144,95 152,88" fill="none" stroke="#ffecd2" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="80" cy="174" rx="12" ry="7" fill="#fff5e6" />
      <ellipse cx="120" cy="174" rx="12" ry="7" fill="#fff5e6" />
    </svg>
  );
}
