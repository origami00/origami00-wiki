import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders online status", () => {
    render(<StatusBadge status="online" />);
    expect(screen.getByText("在线")).toBeInTheDocument();
  });

  it("renders busy status", () => {
    render(<StatusBadge status="busy" />);
    expect(screen.getByText("忙碌")).toBeInTheDocument();
  });

  it("renders away status", () => {
    render(<StatusBadge status="away" />);
    expect(screen.getByText("离开")).toBeInTheDocument();
  });

  it("renders developing status", () => {
    render(<StatusBadge status="developing" />);
    expect(screen.getByText("开发中")).toBeInTheDocument();
  });

  it("renders a colored dot indicator", () => {
    const { container } = render(<StatusBadge status="online" />);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBeGreaterThanOrEqual(2);
  });
});
