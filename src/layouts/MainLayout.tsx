import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { C } from "../tokens/design";
import UserSidebar from "../components/UserSidebar";
import PageTransition from "../components/PageTransition";

const pageTitleMap: Record<string, string> = {
  "/": "origami00-wiki",
  "/photo-wall": "照片墙 - origami00-wiki",
  "/articles": "我的文章 - origami00-wiki",
  "/projects": "我的项目 - origami00-wiki",
  "/about": "关于网站 - origami00-wiki",
  "/recommendations": "推荐分享 - origami00-wiki",
  "/admin": "内容管理 - origami00-wiki",
};

export default function MainLayout() {
  const location = useLocation();
  const page = location.pathname;
  const home = page === "/";
  const photoWall = page === "/photo-wall";

  useEffect(() => {
    document.title = pageTitleMap[page] || "origami00-wiki";
  }, [page]);

  return (
    <div
      className="appRoot"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f5fffe 0%, #eafff7 30%, #edfff4 60%, #f4fffa 100%)",
        padding: "24px 20px",
        display: "flex", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeSwitch { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes cardFadeIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pageEnter { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pageExit { from { opacity: 1; transform: translateY(0) } to { opacity: 0; transform: translateY(-8px) } }

        .layoutGrid {
          width: 100%;
          max-width: 1040px;
          animation: fadeSwitch .4s ease;
        }
        .layoutHome {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 14px;
        }
        .layoutSub {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 14px;
        }
        .layoutPhoto {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 14px;
        }

        .sideNavBtn {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 11px;
          border-radius: 11px;
          cursor: pointer;
          color: ${C.textSec};
          font-size: 13px;
          text-align: left;
          width: 100%;
          text-decoration: none;
          transition: all 0.25s ease;
          font-weight: 400;
        }
        .sideNavBtn:hover {
          background: rgba(110,190,175,0.08);
          color: ${C.accent};
        }
        .sideNavBtn.active {
          background: rgba(110,190,175,0.12);
          color: ${C.accent};
          font-weight: 500;
        }

        .catCard { transition: transform .28s ease, box-shadow .28s ease; }

        .playlistPanel { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .playlistPanel.open { max-height: 320px; overflow-y: auto; }
        .playlistItem { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; cursor: pointer; font-size: 12px; color: ${C.textSec}; transition: background 0.15s; }
        .playlistItem:hover { background: rgba(110,190,175,0.06); }
        .playlistItem.active { background: rgba(110,190,175,0.1); color: ${C.accent}; font-weight: 500; }
        .playlistItem .moveBtn { opacity: 0; transition: opacity 0.15s; }
        .playlistItem:hover .moveBtn { opacity: 1; }
        .modeBtn { width: 28px; height: 28px; border-radius: 8px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: ${C.textMuted}; transition: all 0.2s; }
        .modeBtn:hover { background: rgba(110,190,175,0.08); }
        .modeBtn.active { color: ${C.accent}; }

        .photoCover {
          width: 100%;
          max-height: 340px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .polaroidGrid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 20px 10px;
        }
        .polaroidCard {
          margin: 0;
          padding: 10px 10px 0;
          background: rgba(255,255,255,0.85);
          border-radius: 4px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08);
          cursor: pointer;
          transform: rotate(var(--rot, 0deg));
          transition: transform 0.35s cubic-bezier(.25,.46,.45,.94), box-shadow 0.35s ease;
          flex: 0 0 auto;
          width: 200px;
        }
        .polaroidCard:hover {
          transform: rotate(0deg) scale(1.08);
          box-shadow: 0 12px 35px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 10;
        }
        .polaroidCard img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
          border-radius: 2px;
        }
        .polaroidCard figcaption {
          padding: 10px 4px 12px;
          font-size: 12px;
          color: ${C.textSec};
          text-align: center;
          font-weight: 400;
        }

        .lightboxOverlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          animation: lbFadeIn 0.25s ease;
        }
        .lightboxOverlay img {
          max-width: 90vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 6px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }
        .lightboxClose {
          position: absolute;
          top: 20px;
          right: 24px;
          background: none;
          border: none;
          color: #fff;
          font-size: 36px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
          line-height: 1;
        }
        .lightboxClose:hover { opacity: 1; }
        .lightboxCaption {
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          margin-top: 14px;
        }
        .lightboxNav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          font-size: 28px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .lightboxNav:hover { background: rgba(255,255,255,0.3); }
        .lightboxNavPrev { left: 20px; }
        .lightboxNavNext { right: 20px; }
        @keyframes lbFadeIn { from { opacity: 0 } to { opacity: 1 } }

        .pageTransition.enter { animation: pageEnter 0.3s ease forwards; }
        .pageTransition.exit { animation: pageExit 0.2s ease forwards; }

        @media (max-width: 1100px) {
          .layoutHome { grid-template-columns: 170px 1fr; }
          .layoutSub { grid-template-columns: 170px 1fr; }
          .layoutPhoto { grid-template-columns: 170px 1fr; }
        }

        @media (max-width: 860px) {
          .layoutGrid { max-width: 560px; }
          .layoutHome {
            grid-template-columns: 1fr !important;
            gap: 12px;
          }
          .layoutSub {
            grid-template-columns: 1fr !important;
            gap: 12px;
          }
          .layoutPhoto {
            grid-template-columns: 1fr !important;
            gap: 12px;
          }
          .userSidebar { padding: 12px 10px !important; }
          .sideProfile { margin-bottom: 8px !important; }
          .sideNavList {
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 6px !important;
            padding-bottom: 2px;
          }
          .sideNavBtn {
            width: auto !important;
            white-space: nowrap;
            min-width: fit-content;
            padding: 7px 11px !important;
            font-size: 12.5px !important;
          }
          .masonryColumns { column-count: 1 !important; }
          .polaroidCard { width: 160px; }
          .polaroidCard img { height: 150px; }
        }

        @media (max-width: 520px) {
          .layoutGrid { gap: 10px; }
          .masonryColumns { column-gap: 10px; }
          .masonryColumns > * { margin-bottom: 10px; }
          .polaroidGrid { gap: 14px; padding: 14px 6px; }
          .polaroidCard { width: 140px; }
          .polaroidCard img { height: 130px; }
        }

        @media (max-width: 480px) {
          .appRoot { padding: 14px 10px !important; }
          .profileCard { padding: 20px 16px !important; }
          .profileCard .profileInfo { flex-direction: column; align-items: flex-start; gap: 14px; }
          .profileCard .avatar { width: 56px !important; height: 56px !important; min-width: 56px !important; }
          .clockCard { padding: 20px 14px !important; }
          .clockCard .clockTime { font-size: 32px !important; letter-spacing: 2px !important; }
          .clockCard .clockSeconds { font-size: 13px !important; }
          .socialLinks { flex-wrap: wrap !important; gap: 10px !important; padding: 12px 14px !important; }
          .socialLinks a { width: 42px !important; height: 42px !important; border-radius: 12px !important; }
          .calendarCard { padding: 14px 12px !important; }
          .calendarCard .dayCell { width: 26px !important; height: 26px !important; font-size: 11.5px !important; }
          .calendarCard .navBtn { width: 24px !important; height: 24px !important; }
          .musicPlayer { padding: 16px !important; }
          .musicPlayer .disc { width: 40px !important; height: 40px !important; }
          .musicPlayer .ctrlBtn { width: 30px !important; height: 30px !important; }
          .musicPlayer .ctrlBtnMain { width: 36px !important; height: 36px !important; }
          .sideNavBtn { font-size: 12px !important; padding: 6px 9px !important; }
          .sideNavBtn svg { width: 14px !important; height: 14px !important; }
        }
      `}</style>

      <main className={`layoutGrid ${home ? "layoutHome" : photoWall ? "layoutPhoto" : "layoutSub"}`}>
        <h1 className="srOnly">origami00-wiki 个人站</h1>
        <div style={{ ...(home || photoWall ? {} : { minHeight: 500 }) }}>
          <UserSidebar />
        </div>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}
