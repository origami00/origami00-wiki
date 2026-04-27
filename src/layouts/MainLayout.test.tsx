import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import MainLayout from "./MainLayout";
import { renderWithRouter } from "../test/renderWithRouter";

describe("MainLayout", () => {
  it("renders sidebar", () => {
    renderWithRouter(<MainLayout />);
    expect(screen.getByLabelText("主导航")).toBeInTheDocument();
  });

  it("renders sr-only heading", () => {
    renderWithRouter(<MainLayout />);
    expect(screen.getByText("origami00-wiki 个人站")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    renderWithRouter(<MainLayout />);
    expect(screen.getByText("首页")).toBeInTheDocument();
    expect(screen.getByText("我的文章")).toBeInTheDocument();
  });

  it("sets document title for home page", () => {
    renderWithRouter(<MainLayout />, { route: "/" });
    expect(document.title).toBe("origami00-wiki");
  });

  it("sets document title for articles page", () => {
    renderWithRouter(<MainLayout />, { route: "/articles" });
    expect(document.title).toBe("我的文章 - origami00-wiki");
  });

  it("applies layoutHome class on home route", () => {
    const { container } = renderWithRouter(<MainLayout />, { route: "/" });
    const main = container.querySelector("main");
    expect(main?.className).toContain("layoutHome");
  });

  it("applies layoutSub class on sub route", () => {
    const { container } = renderWithRouter(<MainLayout />, { route: "/about" });
    const main = container.querySelector("main");
    expect(main?.className).toContain("layoutSub");
  });

  it("applies layoutPhoto class on photo-wall route", () => {
    const { container } = renderWithRouter(<MainLayout />, { route: "/photo-wall" });
    const main = container.querySelector("main");
    expect(main?.className).toContain("layoutPhoto");
  });
});
