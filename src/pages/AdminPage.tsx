import { useState } from "react";
import { Plus, Pencil, Trash2, RotateCcw, X, Check, FileText, Sparkles, LogOut, Lock, Image, ChevronUp, ChevronDown, Bell, Music, Heart, ExternalLink } from "lucide-react";
import { C, card } from "../tokens/design";
import { useContentManager } from "../hooks/useContentManager";
import type { Article, ContentItem, MusicTrack, PhotoWallItem, Project, SubPageLink } from "../types";

type Tab = "articles" | "projects" | "photos" | "latest" | "music" | "recommendations";
type ArticleForm = Omit<Article, "id">;
type ProjectForm = Omit<Project, "id">;
type PhotoForm = PhotoWallItem;
type LatestForm = Omit<ContentItem, "id">;

const emptyArticle: ArticleForm = { title: "", summary: "", date: "", tag: "", emoji: "", content: "", url: "" };
const emptyProject: ProjectForm = { title: "", description: "", date: "", tags: [], emoji: "", status: "进行中", url: "" };
const emptyPhoto: PhotoForm = { title: "", src: "" };
const emptyLatest: LatestForm = { title: "", date: "", tag: "", emoji: "", url: "" };
const emptyMusic: MusicTrack = { title: "", artist: "", duration: 0, src: "" };
const emptyRecommendation: SubPageLink = { label: "", href: "" };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "8px 12px", borderRadius: 10, border: `1px solid rgba(110,190,175,0.2)`,
  background: "rgba(255,255,255,0.5)", fontSize: 13, color: C.text, outline: "none",
  transition: "border-color 0.2s",
};
const labelStyle: React.CSSProperties = { fontSize: 12, color: C.textSec, fontWeight: 500, marginBottom: 4, display: "block" };
const btnBase: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px",
  borderRadius: 10, border: "none", fontSize: 12.5, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
};

const AUTH_KEY = "origami00-admin-auth";
const ADMIN_EMAIL = "zz7539847@gmail.com";
const ADMIN_PASSWORD = "bzlm47925-";

function useAuth() {
  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === "true"; } catch { return false; }
  });

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try { localStorage.setItem(AUTH_KEY, "true"); } catch { /* ignore */ }
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    try { localStorage.removeItem(AUTH_KEY); } catch { /* ignore */ }
    setAuthed(false);
  };

  return { authed, login, logout };
}

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(email, password)) setError("账号或密码错误");
  };

  return (
    <section className="adminLogin" style={{ ...card, padding: "40px 32px", background: "rgba(255,255,255,0.45)", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, maxWidth: 380, margin: "60px auto", width: "100%" }} aria-label="管理员登录">
      <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(110,190,175,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Lock size={22} color={C.accent} />
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 4 }}>管理员登录</h2>
        <p style={{ fontSize: 13, color: C.textMuted }}>请输入管理员账号和密码</p>
      </div>
      <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>账号</label>
          <input style={inputStyle} type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="输入邮箱" autoComplete="username" />
        </div>
        <div>
          <label style={labelStyle}>密码</label>
          <input style={inputStyle} type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="输入密码" autoComplete="current-password" />
        </div>
        {error && <div style={{ fontSize: 12, color: "#c07070", background: "rgba(200,100,100,0.08)", padding: "8px 12px", borderRadius: 8 }}>{error}</div>}
        <button type="submit" style={{ ...btnBase, background: C.accent, color: "#fff", justifyContent: "center", padding: "10px 14px", marginTop: 4 }}>
          <Lock size={14} />登录
        </button>
      </form>
    </section>
  );
}

// ─── Article / Project / Latest List + Form ─────────────────────

function ContentTab({ tab, cm, onLogout }: { tab: "articles" | "projects" | "latest"; cm: ReturnType<typeof useContentManager>; onLogout: () => void }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm | ProjectForm | LatestForm>(
    tab === "articles" ? { ...emptyArticle } : tab === "projects" ? { ...emptyProject } : { ...emptyLatest },
  );
  const [showForm, setShowForm] = useState(false);

  const isArticle = tab === "articles";
  const isLatest = tab === "latest";
  const items = isArticle ? cm.articles : isLatest ? cm.latest : cm.projects;

  const openNew = () => {
    setEditing(null);
    setForm(isArticle ? { ...emptyArticle } : isLatest ? { ...emptyLatest } : { ...emptyProject });
    setShowForm(true);
  };

  const openEdit = (item: Article | Project | ContentItem) => {
    setEditing(item.id!);
    if (isArticle) {
      const a = item as Article;
      setForm({ title: a.title, summary: a.summary, date: a.date, tag: a.tag, emoji: a.emoji, content: a.content, url: a.url ?? "" });
    } else if (isLatest) {
      const l = item as ContentItem;
      setForm({ title: l.title, date: l.date, tag: l.tag, emoji: l.emoji, url: l.url });
    } else {
      const p = item as Project;
      setForm({ title: p.title, description: p.description, date: p.date, tags: p.tags, emoji: p.emoji, status: p.status, url: p.url ?? "" });
    }
    setShowForm(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`确认删除「${title}」？`)) return;
    if (isArticle) cm.deleteArticle(id); else if (isLatest) cm.deleteLatest(id); else cm.deleteProject(id);
  };

  const handleSave = () => {
    if (isArticle) {
      const a = form as ArticleForm;
      if (!a.title.trim()) return;
      if (editing) cm.updateArticle(editing, a); else cm.addArticle(a);
    } else if (isLatest) {
      const l = form as LatestForm;
      if (!l.title.trim()) return;
      if (editing) cm.updateLatest(editing, l); else cm.addLatest(l);
    } else {
      const p = form as ProjectForm;
      if (!p.title.trim()) return;
      if (editing) cm.updateProject(editing, p); else cm.addProject(p);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleReset = () => {
    if (!confirm("确认重置为默认数据？所有自定义内容将丢失。")) return;
    if (isArticle) cm.resetArticles(); else if (isLatest) cm.resetLatest(); else cm.resetProjects();
  };

  const set = (key: string, value: string | string[]) => setForm((f) => ({ ...f, [key]: value }));

  const tabLabel = isArticle ? "文章" : isLatest ? "动态" : "项目";

  return (
    <>
      {/* Header */}
      <div className="adminActions" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text }}>内容管理</h2>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={openNew} style={{ ...btnBase, background: C.accent, color: "#fff" }}>
            <Plus size={14} />新增{tabLabel}
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: "rgba(110,190,175,0.08)", color: C.textSec }}>
            <RotateCcw size={13} />重置
          </button>
          <button onClick={onLogout} style={{ ...btnBase, background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="退出登录">
            <LogOut size={13} />退出
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="adminForm" style={{ background: "rgba(255,255,255,0.5)", borderRadius: 16, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 12, border: "1px solid rgba(110,190,175,0.12)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{editing ? "编辑" : "新增"}{tabLabel}</div>
          <div>
            <label style={labelStyle}>标题 *</label>
            <input style={inputStyle} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="输入标题" />
          </div>
          <div className="adminFormRow" style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: "0 0 80px" }}>
              <label style={labelStyle}>Emoji</label>
              <input style={inputStyle} value={form.emoji} onChange={(e) => set("emoji", e.target.value)} placeholder="emoji" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>日期</label>
              <input style={inputStyle} type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </div>
          </div>
          {isArticle && (
            <>
              <div><label style={labelStyle}>标签</label><input style={inputStyle} value={(form as ArticleForm).tag} onChange={(e) => set("tag", e.target.value)} placeholder="如：前端、AI、游戏" /></div>
              <div><label style={labelStyle}>摘要</label><input style={inputStyle} value={(form as ArticleForm).summary} onChange={(e) => set("summary", e.target.value)} placeholder="一句话描述" /></div>
              <div><label style={labelStyle}>正文内容</label><textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical", lineHeight: 1.6 }} value={(form as ArticleForm).content} onChange={(e) => set("content", e.target.value)} placeholder="支持 Markdown 格式" /></div>
            </>
          )}
          {isLatest && (
            <div><label style={labelStyle}>标签</label><input style={inputStyle} value={(form as LatestForm).tag} onChange={(e) => set("tag", e.target.value)} placeholder="如：技术、AI、游戏、前端" /></div>
          )}
          {!isArticle && !isLatest && (
            <>
              <div><label style={labelStyle}>描述</label><textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical", lineHeight: 1.6 }} value={(form as ProjectForm).description} onChange={(e) => set("description", e.target.value)} placeholder="项目简介" /></div>
              <div className="adminFormRow" style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}><label style={labelStyle}>标签（逗号分隔）</label><input style={inputStyle} value={(form as ProjectForm).tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} placeholder="React, TypeScript" /></div>
                <div style={{ flex: "0 0 120px" }}>
                  <label style={labelStyle}>状态</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={(form as ProjectForm).status} onChange={(e) => set("status", e.target.value)}>
                    <option value="进行中">进行中</option><option value="已完成">已完成</option><option value="暂停">暂停</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <div><label style={labelStyle}>链接（可选）</label><input style={inputStyle} value={form.url ?? ""} onChange={(e) => set("url", e.target.value)} placeholder="https://..." /></div>
          <div className="adminFormActions" style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ ...btnBase, background: "rgba(110,190,175,0.06)", color: C.textSec }}><X size={14} />取消</button>
            <button onClick={handleSave} style={{ ...btnBase, background: C.accent, color: "#fff" }}><Check size={14} />保存</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="adminList" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.length === 0 && <div style={{ textAlign: "center", padding: 24, color: C.textMuted, fontSize: 13 }}>暂无内容</div>}
        {items.map((item) => (
          <div key={item.id} className="adminItem" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.4)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.65)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
                {isArticle ? `${(item as Article).tag} · ${item.date}` : isLatest ? `${(item as ContentItem).tag} · ${item.date}` : `${(item as Project).tags.join(", ")} · ${item.date}`}
              </div>
            </div>
            <button onClick={() => openEdit(item)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(110,190,175,0.08)", color: C.accent }} title="编辑"><Pencil size={13} /></button>
            <button onClick={() => handleDelete(item.id!, item.title)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="删除"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Photo Wall Tab ──────────────────────────────────────────────

function PhotosTab({ cm, onLogout }: { cm: ReturnType<typeof useContentManager>; onLogout: () => void }) {
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<PhotoForm>({ ...emptyPhoto });
  const [showForm, setShowForm] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyPhoto });
    setShowForm(true);
  };

  const openEdit = (index: number) => {
    const item = cm.photos[index];
    if (!item) return;
    setEditing(index);
    setForm({ title: item.title, src: item.src });
    setShowForm(true);
  };

  const handleDelete = (index: number, title: string) => {
    if (!confirm(`确认删除「${title}」？`)) return;
    cm.deletePhoto(index);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.src.trim()) return;
    if (editing !== null) cm.updatePhoto(editing, form);
    else cm.addPhoto(form);
    setShowForm(false);
    setEditing(null);
  };

  const handleReset = () => {
    if (!confirm("确认重置为默认数据？所有自定义内容将丢失。")) return;
    cm.resetPhotos();
  };

  return (
    <>
      <div className="adminActions" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text }}>内容管理</h2>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={openNew} style={{ ...btnBase, background: C.accent, color: "#fff" }}><Plus size={14} />新增照片</button>
          <button onClick={handleReset} style={{ ...btnBase, background: "rgba(110,190,175,0.08)", color: C.textSec }}><RotateCcw size={13} />重置</button>
          <button onClick={onLogout} style={{ ...btnBase, background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="退出登录"><LogOut size={13} />退出</button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="adminForm" style={{ background: "rgba(255,255,255,0.5)", borderRadius: 16, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 12, border: "1px solid rgba(110,190,175,0.12)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{editing !== null ? "编辑" : "新增"}照片</div>
          <div>
            <label style={labelStyle}>标题 *</label>
            <input style={inputStyle} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="照片名称" />
          </div>
          <div>
            <label style={labelStyle}>图片路径 *</label>
            <input style={inputStyle} value={form.src} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))} placeholder="/static/照片墙资产/xxx.jpg" />
          </div>
          {form.src && (
            <div>
              <label style={labelStyle}>预览</label>
              <img src={form.src} alt="预览" style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(110,190,175,0.15)" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          )}
          <div className="adminFormActions" style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ ...btnBase, background: "rgba(110,190,175,0.06)", color: C.textSec }}><X size={14} />取消</button>
            <button onClick={handleSave} style={{ ...btnBase, background: C.accent, color: "#fff" }}><Check size={14} />保存</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="adminList" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {cm.photos.length === 0 && <div style={{ textAlign: "center", padding: 24, color: C.textMuted, fontSize: 13 }}>暂无照片</div>}
        {cm.photos.map((item, i) => (
          <div key={`${item.src}-${i}`} className="adminPhotoItem" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 14, background: "rgba(255,255,255,0.4)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.65)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}>
            <img src={item.src} alt={item.title} className="adminPhotoThumb" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
              <div className="adminPhotoPath" style={{ fontSize: 11, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.src}</div>
            </div>
            <div className="adminPhotoMove" style={{ display: "flex", gap: 2, flexShrink: 0 }}>
              <button onClick={() => cm.movePhoto(i, i - 1)} disabled={i === 0} style={{ ...btnBase, padding: "5px 7px", background: "rgba(110,190,175,0.06)", color: C.textMuted, opacity: i === 0 ? 0.3 : 1 }} title="上移"><ChevronUp size={13} /></button>
              <button onClick={() => cm.movePhoto(i, i + 1)} disabled={i === cm.photos.length - 1} style={{ ...btnBase, padding: "5px 7px", background: "rgba(110,190,175,0.06)", color: C.textMuted, opacity: i === cm.photos.length - 1 ? 0.3 : 1 }} title="下移"><ChevronDown size={13} /></button>
            </div>
            <button onClick={() => openEdit(i)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(110,190,175,0.08)", color: C.accent }} title="编辑"><Pencil size={13} /></button>
            <button onClick={() => handleDelete(i, item.title)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="删除"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Music Tab ──────────────────────────────────────────────────

function MusicTab({ cm, onLogout }: { cm: ReturnType<typeof useContentManager>; onLogout: () => void }) {
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<MusicTrack>({ ...emptyMusic });
  const [showForm, setShowForm] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyMusic });
    setShowForm(true);
  };

  const openEdit = (index: number) => {
    const item = cm.music[index];
    if (!item) return;
    setEditing(index);
    setForm({ title: item.title, artist: item.artist, duration: item.duration, src: item.src });
    setShowForm(true);
  };

  const handleDelete = (index: number, title: string) => {
    if (!confirm(`确认删除「${title}」？`)) return;
    cm.deleteMusic(index);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.src.trim()) return;
    if (editing !== null) cm.updateMusic(editing, form);
    else cm.addMusic(form);
    setShowForm(false);
    setEditing(null);
  };

  const handleReset = () => {
    if (!confirm("确认重置为默认数据？所有自定义内容将丢失。")) return;
    cm.resetMusic();
  };

  return (
    <>
      <div className="adminActions" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text }}>内容管理</h2>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={openNew} style={{ ...btnBase, background: C.accent, color: "#fff" }}><Plus size={14} />新增音乐</button>
          <button onClick={handleReset} style={{ ...btnBase, background: "rgba(110,190,175,0.08)", color: C.textSec }}><RotateCcw size={13} />重置</button>
          <button onClick={onLogout} style={{ ...btnBase, background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="退出登录"><LogOut size={13} />退出</button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="adminForm" style={{ background: "rgba(255,255,255,0.5)", borderRadius: 16, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 12, border: "1px solid rgba(110,190,175,0.12)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{editing !== null ? "编辑" : "新增"}音乐</div>
          <div className="adminFormRow" style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>标题 *</label>
              <input style={inputStyle} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="歌曲名称" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>艺术家</label>
              <input style={inputStyle} value={form.artist} onChange={(e) => setForm((f) => ({ ...f, artist: e.target.value }))} placeholder="歌手/作者" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>音频路径 *</label>
            <input style={inputStyle} value={form.src} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))} placeholder="/static/音乐/xxx.mp3" />
          </div>
          <div className="adminFormActions" style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ ...btnBase, background: "rgba(110,190,175,0.06)", color: C.textSec }}><X size={14} />取消</button>
            <button onClick={handleSave} style={{ ...btnBase, background: C.accent, color: "#fff" }}><Check size={14} />保存</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="adminList" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {cm.music.length === 0 && <div style={{ textAlign: "center", padding: 24, color: C.textMuted, fontSize: 13 }}>暂无音乐</div>}
        {cm.music.map((item, i) => (
          <div key={`${item.src}-${i}`} className="adminMusicItem" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 14, background: "rgba(255,255,255,0.4)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.65)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(110,190,175,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Music size={18} color={C.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
              <div className="adminMusicPath" style={{ fontSize: 11, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.artist ? `${item.artist} · ${item.src}` : item.src}</div>
            </div>
            <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
              <button onClick={() => cm.moveMusic(i, i - 1)} disabled={i === 0} style={{ ...btnBase, padding: "5px 7px", background: "rgba(110,190,175,0.06)", color: C.textMuted, opacity: i === 0 ? 0.3 : 1 }} title="上移"><ChevronUp size={13} /></button>
              <button onClick={() => cm.moveMusic(i, i + 1)} disabled={i === cm.music.length - 1} style={{ ...btnBase, padding: "5px 7px", background: "rgba(110,190,175,0.06)", color: C.textMuted, opacity: i === cm.music.length - 1 ? 0.3 : 1 }} title="下移"><ChevronDown size={13} /></button>
            </div>
            <button onClick={() => openEdit(i)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(110,190,175,0.08)", color: C.accent }} title="编辑"><Pencil size={13} /></button>
            <button onClick={() => handleDelete(i, item.title)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="删除"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Recommendations Tab ──────────────────────────────────────────

function RecommendationsTab({ cm, onLogout }: { cm: ReturnType<typeof useContentManager>; onLogout: () => void }) {
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<SubPageLink>({ ...emptyRecommendation });
  const [showForm, setShowForm] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyRecommendation });
    setShowForm(true);
  };

  const openEdit = (index: number) => {
    const item = cm.recommendations[index];
    if (!item) return;
    setEditing(index);
    setForm({ label: item.label, href: item.href });
    setShowForm(true);
  };

  const handleDelete = (index: number, label: string) => {
    if (!confirm(`确认删除「${label}」？`)) return;
    cm.deleteRecommendation(index);
  };

  const handleSave = () => {
    if (!form.label.trim() || !form.href.trim()) return;
    if (editing !== null) cm.updateRecommendation(editing, form);
    else cm.addRecommendation(form);
    setShowForm(false);
    setEditing(null);
  };

  const handleReset = () => {
    if (!confirm("确认重置为默认数据？所有自定义内容将丢失。")) return;
    cm.resetRecommendations();
  };

  return (
    <>
      <div className="adminActions" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: C.text }}>内容管理</h2>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={openNew} style={{ ...btnBase, background: C.accent, color: "#fff" }}><Plus size={14} />新增推荐</button>
          <button onClick={handleReset} style={{ ...btnBase, background: "rgba(110,190,175,0.08)", color: C.textSec }}><RotateCcw size={13} />重置</button>
          <button onClick={onLogout} style={{ ...btnBase, background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="退出登录"><LogOut size={13} />退出</button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="adminForm" style={{ background: "rgba(255,255,255,0.5)", borderRadius: 16, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 12, border: "1px solid rgba(110,190,175,0.12)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{editing !== null ? "编辑" : "新增"}推荐</div>
          <div>
            <label style={labelStyle}>标题 *</label>
            <input style={inputStyle} value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="推荐名称" />
          </div>
          <div>
            <label style={labelStyle}>链接 *</label>
            <input style={inputStyle} value={form.href} onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))} placeholder="https://..." />
          </div>
          <div className="adminFormActions" style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ ...btnBase, background: "rgba(110,190,175,0.06)", color: C.textSec }}><X size={14} />取消</button>
            <button onClick={handleSave} style={{ ...btnBase, background: C.accent, color: "#fff" }}><Check size={14} />保存</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="adminList" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {cm.recommendations.length === 0 && <div style={{ textAlign: "center", padding: 24, color: C.textMuted, fontSize: 13 }}>暂无推荐</div>}
        {cm.recommendations.map((item, i) => (
          <div key={`${item.href}-${i}`} className="adminItem" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 14, background: "rgba(255,255,255,0.4)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.65)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(110,190,175,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ExternalLink size={18} color={C.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.href}</div>
            </div>
            <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
              <button onClick={() => cm.moveRecommendation(i, i - 1)} disabled={i === 0} style={{ ...btnBase, padding: "5px 7px", background: "rgba(110,190,175,0.06)", color: C.textMuted, opacity: i === 0 ? 0.3 : 1 }} title="上移"><ChevronUp size={13} /></button>
              <button onClick={() => cm.moveRecommendation(i, i + 1)} disabled={i === cm.recommendations.length - 1} style={{ ...btnBase, padding: "5px 7px", background: "rgba(110,190,175,0.06)", color: C.textMuted, opacity: i === cm.recommendations.length - 1 ? 0.3 : 1 }} title="下移"><ChevronDown size={13} /></button>
            </div>
            <button onClick={() => openEdit(i)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(110,190,175,0.08)", color: C.accent }} title="编辑"><Pencil size={13} /></button>
            <button onClick={() => handleDelete(i, item.label)} style={{ ...btnBase, padding: "6px 10px", background: "rgba(200,100,100,0.08)", color: "#c07070" }} title="删除"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Main Admin Panel ────────────────────────────────────────────

const TAB_CONFIG: [Tab, string, typeof FileText][] = [
  ["articles", "文章管理", FileText],
  ["projects", "项目管理", Sparkles],
  ["photos", "照片墙", Image],
  ["latest", "动态管理", Bell],
  ["music", "音乐管理", Music],
  ["recommendations", "推荐分享", Heart],
];

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const cm = useContentManager();
  const [tab, setTab] = useState<Tab>("articles");

  return (
    <section className="adminPanel" style={{ ...card, padding: "28px 24px", background: "rgba(255,255,255,0.45)", display: "flex", flexDirection: "column", gap: 18 }} aria-label="内容管理">
      {/* Tabs */}
      <div className="adminTabs" style={{ display: "flex", gap: 4, background: "rgba(110,190,175,0.06)", borderRadius: 12, padding: 3, alignSelf: "flex-start" }}>
        {TAB_CONFIG.map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              ...btnBase, padding: "8px 16px", borderRadius: 10,
              background: tab === key ? "#fff" : "transparent",
              color: tab === key ? C.accent : C.textMuted,
              boxShadow: tab === key ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
            }}
          >
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      {tab === "photos" ? <PhotosTab cm={cm} onLogout={onLogout} /> : tab === "music" ? <MusicTab cm={cm} onLogout={onLogout} /> : tab === "recommendations" ? <RecommendationsTab cm={cm} onLogout={onLogout} /> : <ContentTab tab={tab} cm={cm} onLogout={onLogout} />}
    </section>
  );
}

export default function AdminPage() {
  const { authed, login, logout } = useAuth();
  if (!authed) return <LoginForm onLogin={login} />;
  return <AdminPanel onLogout={logout} />;
}
