import { useCallback, useState } from "react";
import { articles as defaultArticles } from "../data/articlesData";
import { projects as defaultProjects } from "../data/projectsData";
import { latestContent as defaultLatest, photoWallItems as defaultPhotos } from "../data/siteData";
import type { Article, ContentItem, PhotoWallItem, Project } from "../types";

const ARTICLES_KEY = "origami00-articles";
const PROJECTS_KEY = "origami00-projects";
const PHOTOS_KEY = "origami00-photos";
const LATEST_KEY = "origami00-latest";

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
  return title
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-|-$/g, "")
    || `item-${Date.now()}`;
}

export function useContentManager() {
  const [articles, setArticles] = useState<Article[]>(() => loadFromStorage(ARTICLES_KEY, defaultArticles));
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage(PROJECTS_KEY, defaultProjects));
  const [photos, setPhotos] = useState<PhotoWallItem[]>(() => loadFromStorage(PHOTOS_KEY, defaultPhotos));
  const [latest, setLatest] = useState<ContentItem[]>(() => loadFromStorage(LATEST_KEY, defaultLatest));

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

  return {
    articles,
    projects,
    photos,
    latest,
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
    resetArticles,
    resetProjects,
    resetPhotos,
    resetLatest,
  };
}
