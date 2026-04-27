import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialLinks from "./SocialLinks";

describe("SocialLinks", () => {
  it("renders all social links", () => {
    render(<SocialLinks />);
    expect(screen.getByLabelText("打开GitHub主页")).toBeInTheDocument();
    expect(screen.getByLabelText("打开Bilibili主页")).toBeInTheDocument();
    expect(screen.getByLabelText("打开抖音主页")).toBeInTheDocument();
  });

  it("links open in new tab", () => {
    render(<SocialLinks />);
    const githubLink = screen.getByLabelText("打开GitHub主页");
    expect(githubLink.getAttribute("target")).toBe("_blank");
    expect(githubLink.getAttribute("rel")).toContain("noopener");
  });

  it("renders custom icon images", () => {
    const { container } = render(<SocialLinks />);
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(3);
  });
});
