import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoadingFallback from "./components/LoadingFallback";
import "./index.css";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PhotoWallPage = lazy(() => import("./pages/PhotoWallPage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SubPage = lazy(() => import("./pages/SubPage"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="photo-wall" element={<PhotoWallPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="about" element={<SubPage />} />
            <Route path="recommendations" element={<SubPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
