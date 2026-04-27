import { useCallback, useState } from "react";
import { articles as defaultArticles } from "../data/articlesData";
import { projects as defaultProjects } from "../data/projectsData";
import { latestContent as defaultLatest, musicList as defaultMusic, photoWallItems as defaultPhotos, defaultRecommendations } from "../data/siteData";
import type { Article, ContentItem, MusicTrack, PhotoWallItem, Project, SubPageLink } from "../types";

const ARTICLES_KEY = "origami00-articles";
const PROJECTS_KEY = "origami00-projects";
const PHOTOS_KEY = "origami00-photos";
const LATEST_KEY = "origami00-latest";
const MUSIC_KEY = "origami00-music";
const RECOMMENDATIONS_KEY = "origami00-recommendations";
const DATA_VERSION_KEY = "origami00-data-version";
const DATA_VERSION = 2; // Bump this when default data changes

// Migrate stale localStorage data (e.g., old /Assets/ paths, outdated music list)
function migrateData() {
  try {
    const stored = localStorage.getItem(DATA_VERSION_KEY);
    if (stored !== String(DATA_VERSION)) {
      // Clear all cached data so it falls back to new defaults
      [ARTICLES_KEY, PROJECTS_KEY, PHOTOS_KEY, LATEST_KEY, MUSIC_KEY, RECOMMENDATIONS_KEY].forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(DATA_VERSION_KEY, String(DATA_VERSION));
    }
  } catch { /* ignore */ }
}

migrateData();

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as T[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* ignore */ }
}

function toId(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-|-$/g, "")
    || "item";
  return `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export function useContentManager() {
  const [articles, setArticles] = useState<Article[]>(() => loadFromStorage(ARTICLES_KEY, defaultArticles));
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage(PROJECTS_KEY, defaultProjects));
  const [photos, setPhotos] = useState<PhotoWallItem[]>(() => loadFromStorage(PHOTOS_KEY, defaultPhotos));
  const [latest, setLatest] = useState<ContentItem[]>(() => loadFromStorage(LATEST_KEY, defaultLatest));
  const [music, setMusic] = useState<MusicTrack[]>(() => loadFromStorage(MUSIC_KEY, defaultMusic));
  const [recommendations, setRecommendations] = useState<SubPageLink[]>(() => loadFromStorage(RECOMMENDATIONS_KEY, defaultRecommendations));

  const persistArticles = useCallback((next: Article[]) => {
    setArticles(next);
    saveToStorage(ARTICLES_KEY, next);
  }, []);

  const persistProjects = useCallback((next: Project[]) => {
    setProjects(next);
    saveToStorage(PROJECTS_KEY, next);
  }, []);

  const persistPhotos = useCallback((next: PhotoWallItem[]) => {
    setPhotos(next);
    saveToStorage(PHOTOS_KEY, next);
  }, []);

  const persistLatest = useCallback((next: ContentItem[]) => {
    setLatest(next);
    saveToStorage(LATEST_KEY, next);
  }, []);

  const persistMusic = useCallback((next: MusicTrack[]) => {
    setMusic(next);
    saveToStorage(MUSIC_KEY, next);
  }, []);

  const persistRecommendations = useCallback((next: SubPageLink[]) => {
    setRecommendations(next);
    saveToStorage(RECOMMENDATIONS_KEY, next);
  }, []);

  // Articles CRUD
  const addArticle = useCallback((article: Omit<Article, "id">) => {
    const id = toId(article.title);
    persistArticles([...articles, { ...article, id }]);
  }, [articles, persistArticles]);

  const updateArticle = useCallback((id: string, updates: Partial<Omit<Article, "id">>) => {
    persistArticles(articles.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  }, [articles, persistArticles]);

  const deleteArticle = useCallback((id: string) => {
    persistArticles(articles.filter((a) => a.id !== id));
  }, [articles, persistArticles]);

  // Projects CRUD
  const addProject = useCallback((project: Omit<Project, "id">) => {
    const id = toId(project.title);
    persistProjects([...projects, { ...project, id }]);
  }, [projects, persistProjects]);

  const updateProject = useCallback((id: string, updates: Partial<Omit<Project, "id">>) => {
    persistProjects(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, [projects, persistProjects]);

  const deleteProject = useCallback((id: string) => {
    persistProjects(projects.filter((p) => p.id !== id));
  }, [projects, persistProjects]);

  // Photos CRUD
  const addPhoto = useCallback((photo: PhotoWallItem) => {
    persistPhotos([...photos, photo]);
  }, [photos, persistPhotos]);

  const updatePhoto = useCallback((index: number, updates: Partial<PhotoWallItem>) => {
    persistPhotos(photos.map((p, i) => (i === index ? { ...p, ...updates } : p)));
  }, [photos, persistPhotos]);

  const deletePhoto = useCallback((index: number) => {
    persistPhotos(photos.filter((_, i) => i !== index));
  }, [photos, persistPhotos]);

  const movePhoto = useCallback((from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= photos.length || to >= photos.length) return;
    const next = [...photos];
    const [item] = next.splice(from, 1) as [PhotoWallItem];
    next.splice(to, 0, item);
    persistPhotos(next);
  }, [photos, persistPhotos]);

  // Latest Content CRUD
  const addLatest = useCallback((item: Omit<ContentItem, "id">) => {
    const id = toId(item.title);
    persistLatest([...latest, { ...item, id }]);
  }, [latest, persistLatest]);

  const updateLatest = useCallback((id: string, updates: Partial<Omit<ContentItem, "id">>) => {
    persistLatest(latest.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  }, [latest, persistLatest]);

  const deleteLatest = useCallback((id: string) => {
    persistLatest(latest.filter((l) => l.id !== id));
  }, [latest, persistLatest]);

  const moveLatest = useCallback((from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= latest.length || to >= latest.length) return;
    const next = [...latest];
    const [item] = next.splice(from, 1) as [ContentItem];
    next.splice(to, 0, item);
    persistLatest(next);
  }, [latest, persistLatest]);

  // Reset
  const resetArticles = useCallback(() => {
    persistArticles(defaultArticles);
  }, [persistArticles]);

  const resetProjects = useCallback(() => {
    persistProjects(defaultProjects);
  }, [persistProjects]);

  const resetPhotos = useCallback(() => {
    persistPhotos(defaultPhotos);
  }, [persistPhotos]);

  const resetLatest = useCallback(() => {
    persistLatest(defaultLatest);
  }, [persistLatest]);

  // Music CRUD
  const addMusic = useCallback((track: MusicTrack) => {
    persistMusic([...music, track]);
  }, [music, persistMusic]);

  const updateMusic = useCallback((index: number, updates: Partial<MusicTrack>) => {
    persistMusic(music.map((t, i) => (i === index ? { ...t, ...updates } : t)));
  }, [music, persistMusic]);

  const deleteMusic = useCallback((index: number) => {
    persistMusic(music.filter((_, i) => i !== index));
  }, [music, persistMusic]);

  const moveMusic = useCallback((from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= music.length || to >= music.length) return;
    const next = [...music];
    const [item] = next.splice(from, 1) as [MusicTrack];
    next.splice(to, 0, item);
    persistMusic(next);
  }, [music, persistMusic]);

  const resetMusic = useCallback(() => {
    persistMusic(defaultMusic);
  }, [persistMusic]);

  // Recommendations CRUD
  const addRecommendation = useCallback((item: SubPageLink) => {
    persistRecommendations([...recommendations, item]);
  }, [recommendations, persistRecommendations]);

  const updateRecommendation = useCallback((index: number, updates: Partial<SubPageLink>) => {
    persistRecommendations(recommendations.map((r, i) => (i === index ? { ...r, ...updates } : r)));
  }, [recommendations, persistRecommendations]);

  const deleteRecommendation = useCallback((index: number) => {
    persistRecommendations(recommendations.filter((_, i) => i !== index));
  }, [recommendations, persistRecommendations]);

  const moveRecommendation = useCallback((from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= recommendations.length || to >= recommendations.length) return;
    const next = [...recommendations];
    const [item] = next.splice(from, 1) as [SubPageLink];
    next.splice(to, 0, item);
    persistRecommendations(next);
  }, [recommendations, persistRecommendations]);

  const resetRecommendations = useCallback(() => {
    persistRecommendations(defaultRecommendations);
  }, [persistRecommendations]);

  return {
    articles,
    projects,
    photos,
    latest,
    music,
    recommendations,
    addArticle,
    updateArticle,
    deleteArticle,
    addProject,
    updateProject,
    deleteProject,
    addPhoto,
    updatePhoto,
    deletePhoto,
    movePhoto,
    addLatest,
    updateLatest,
    deleteLatest,
    moveLatest,
    addMusic,
    updateMusic,
    deleteMusic,
    moveMusic,
    addRecommendation,
    updateRecommendation,
    deleteRecommendation,
    moveRecommendation,
    resetArticles,
    resetProjects,
    resetPhotos,
    resetLatest,
    resetMusic,
    resetRecommendations,
  };
}
