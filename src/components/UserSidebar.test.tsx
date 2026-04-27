import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import UserSidebar from "./UserSidebar";
import { renderWithRouter } from "../test/renderWithRouter";

describe("UserSidebar", () => {
  it("renders profile name", () => {
    renderWithRouter(<UserSidebar />);
    expect(screen.getByText("小猫咪")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    renderWithRouter(<UserSidebar />);
    expect(screen.getByText("首页")).toBeInTheDocument();
    expect(screen.getByText("我的文章")).toBeInTheDocument();
    expect(screen.getByText("我的项目")).toBeInTheDocument();
    expect(screen.getByText("关于网站")).toBeInTheDocument();
    expect(screen.getByText("推荐分享")).toBeInTheDocument();
  });

  it("renders avatar", () => {
    const { container } = renderWithRouter(<UserSidebar />);
    const img = container.querySelector('img[src*="头像"]');
    expect(img).toBeInTheDocument();
  });

  it("renders status badge", () => {
    renderWithRouter(<UserSidebar />);
    expect(screen.getByText("开发中")).toBeInTheDocument();
  });
});
