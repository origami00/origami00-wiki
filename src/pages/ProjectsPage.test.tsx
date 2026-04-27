import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsPage from "./ProjectsPage";

describe("ProjectsPage", () => {
  it("renders page title", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("我的项目")).toBeInTheDocument();
  });

  it("renders all projects", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("origami00-wiki 个人主页")).toBeInTheDocument();
    expect(screen.getByText("像素冒险小游戏")).toBeInTheDocument();
    expect(screen.getByText("AI 绘画工作流工具")).toBeInTheDocument();
  });

  it("renders status badges", () => {
    render(<ProjectsPage />);
    const inProgress = screen.getAllByText("进行中");
    expect(inProgress.length).toBe(2);
    expect(screen.getByText("已完成")).toBeInTheDocument();
  });

  it("renders tech tags", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
  });

  it("renders project descriptions", () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Soft Minimalism/)).toBeInTheDocument();
  });
});
