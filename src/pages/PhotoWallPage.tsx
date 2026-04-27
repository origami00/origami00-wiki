import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { C, card } from "../tokens/design";
import { photoWallItems } from "../data/siteData";

const rotations = [-4, 2, -2, 3, -1, 4, -3, 1, -2];

export default function PhotoWallPage() {
  const navigate = useNavigate();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i - 1 + photoWallItems.length) % photoWallItems.length : null));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i + 1) % photoWallItems.length : null));
  }, []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox, goPrev, goNext]);

  const cover = photoWallItems[0]!;

  return (
    <section
      style={{
        ...card,
        minHeight: 500,
        padding: "24px 20px 18px",
        background: "rgba(255,255,255,0.45)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
      aria-label="照片墙页面"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text, marginBottom: 4, letterSpacing: "0.01em" }}>照片墙</h2>
          <p style={{ fontSize: 12.5, color: C.textMuted }}>收藏生活片段，点击照片可查看大图。</p>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "9px 18px", borderRadius: 12, border: "none",
            background: C.accent, color: "#fff",
            fontSize: 13, fontWeight: 500, cursor: "pointer",
            boxShadow: `0 4px 14px ${C.accent}35`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${C.accent}45`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 14px ${C.accent}35`; }}
          aria-label="返回首页"
        >
          返回首页
        </button>
      </div>

      {/* 封面大图 */}
      <img
        className="photoCover"
        src={cover.src}
        alt={cover.title}
        onClick={() => setLightboxIdx(0)}
        style={{ cursor: "pointer" }}
      />

      {/* 拍立得散落网格 */}
      <div className="polaroidGrid">
        {photoWallItems.map((item, i) => (
          <figure
            key={item.title + i}
            className="polaroidCard"
            style={{ "--rot": `${rotations[i % rotations.length]}deg` } as React.CSSProperties}
            onClick={() => setLightboxIdx(i)}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>

      {/* 灯箱 */}
      {lightboxIdx !== null && (() => {
        const current = photoWallItems[lightboxIdx]!;
        return (
          <div
            className="lightboxOverlay"
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          >
            <button className="lightboxClose" onClick={closeLightbox} aria-label="关闭预览">
              &times;
            </button>
            <button className="lightboxNav lightboxNavPrev" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="上一张">
              &#8249;
            </button>
            <img
              src={current.src}
              alt={current.title}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lightboxCaption">
              {current.title}
              <span style={{ opacity: 0.5, marginLeft: 8, fontSize: 12 }}>
                {lightboxIdx + 1} / {photoWallItems.length}
              </span>
            </div>
            <button className="lightboxNav lightboxNavNext" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="下一张">
              &#8250;
            </button>
        </div>
        );
      })()}
    </section>
  );
}
