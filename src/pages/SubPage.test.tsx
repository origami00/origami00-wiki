import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import SubPage from "./SubPage";
import { renderWithRouter } from "../test/renderWithRouter";

describe("SubPage", () => {
  it("renders about page content", () => {
    renderWithRouter(<SubPage />, { route: "/about" });
    expect(screen.getByText("关于网站")).toBeInTheDocument();
  });

  it("renders articles page content", () => {
    renderWithRouter(<SubPage />, { route: "/articles" });
    expect(screen.getByText("我的文章")).toBeInTheDocument();
  });

  it("renders projects page content", () => {
    renderWithRouter(<SubPage />, { route: "/projects" });
    expect(screen.getByText("我的项目")).toBeInTheDocument();
  });

  it("renders recommendations page content", () => {
    renderWithRouter(<SubPage />, { route: "/recommendations" });
    expect(screen.getByText("推荐分享")).toBeInTheDocument();
  });

  it("renders fallback for unknown page", () => {
    renderWithRouter(<SubPage />, { route: "/unknown" });
    expect(screen.getByText("未知页面")).toBeInTheDocument();
  });

  it("renders back button", () => {
    renderWithRouter(<SubPage />, { route: "/about" });
    expect(screen.getByText("返回首页")).toBeInTheDocument();
  });

  it("renders links", () => {
    renderWithRouter(<SubPage />, { route: "/about" });
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});
