import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArticlesPage from "./ArticlesPage";

describe("ArticlesPage", () => {
  it("renders page title", () => {
    render(<ArticlesPage />);
    expect(screen.getByText("我的文章")).toBeInTheDocument();
  });

  it("renders article list", () => {
    render(<ArticlesPage />);
    expect(screen.getByText("React 18 新特性实践笔记")).toBeInTheDocument();
    expect(screen.getByText("ComfyUI 工作流入门指南")).toBeInTheDocument();
    expect(screen.getByText("像素风独立游戏设计思路")).toBeInTheDocument();
  });

  it("renders tag badges", () => {
    render(<ArticlesPage />);
    expect(screen.getByText("前端")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByText("游戏")).toBeInTheDocument();
  });

  it("clicking an article shows detail view", async () => {
    const user = userEvent.setup();
    render(<ArticlesPage />);
    await user.click(screen.getByText("React 18 新特性实践笔记"));
    // Detail view should show content
    expect(screen.getByText("返回列表")).toBeInTheDocument();
  });

  it("clicking back returns to list", async () => {
    const user = userEvent.setup();
    render(<ArticlesPage />);
    await user.click(screen.getByText("React 18 新特性实践笔记"));
    await user.click(screen.getByText("返回列表"));
    // List view should be back
    expect(screen.getByText("ComfyUI 工作流入门指南")).toBeInTheDocument();
  });
});
