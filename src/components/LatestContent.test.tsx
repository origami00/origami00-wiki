import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LatestContent from "./LatestContent";

describe("LatestContent", () => {
  it("renders section title", () => {
    render(<LatestContent />);
    expect(screen.getByText("最新动态")).toBeInTheDocument();
  });

  it("renders all content items", () => {
    render(<LatestContent />);
    expect(screen.getByText("用 Next.js 搭建个人主页")).toBeInTheDocument();
    expect(screen.getByText("ComfyUI 工作流参考")).toBeInTheDocument();
    expect(screen.getByText("像素风小游戏灵感")).toBeInTheDocument();
    expect(screen.getByText("Framer Motion 动画实践")).toBeInTheDocument();
  });

  it("renders tag labels", () => {
    render(<LatestContent />);
    expect(screen.getByText("技术")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders dates", () => {
    render(<LatestContent />);
    expect(screen.getByText("2026-04-12")).toBeInTheDocument();
  });

  it("items are links", () => {
    render(<LatestContent />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(4);
  });
});
