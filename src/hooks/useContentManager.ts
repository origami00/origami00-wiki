import { useCallback, useState } from "react";
import { articles as defaultArticles } from "../data/articlesData";
import { projects as defaultProjects } from "../data/projectsData";
import type { Article, Project } from "../types";

const ARTICLES_KEY = "origami00-articles";
const PROJECTS_KEY = "origami00-projects";

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

  const persistArticles = useCallback((next: Article[]) => {
    setArticles(next);
    saveToStorage(ARTICLES_KEY, next);
  }, []);

  const persistProjects = useCallback((next: Project[]) => {
    setProjects(next);
    saveToStorage(PROJECTS_KEY, next);
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

  // Reset
  const resetArticles = useCallback(() => {
    persistArticles(defaultArticles);
  }, [persistArticles]);

  const resetProjects = useCallback(() => {
    persistProjects(defaultProjects);
  }, [persistProjects]);

  return {
    articles,
    projects,
    addArticle,
    updateArticle,
    deleteArticle,
    addProject,
    updateProject,
    deleteProject,
    resetArticles,
    resetProjects,
  };
}
