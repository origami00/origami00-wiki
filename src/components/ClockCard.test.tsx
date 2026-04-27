import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ClockCard from "./ClockCard";

describe("ClockCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-27T06:30:45Z")); // UTC+8 14:30:45
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders UTC+8 label", () => {
    render(<ClockCard />);
    expect(screen.getByText("UTC+8")).toBeInTheDocument();
  });

  it("renders time with hours and minutes", () => {
    const { container } = render(<ClockCard />);
    // Should contain "14" and "30" somewhere
    expect(container.textContent).toContain("14");
    expect(container.textContent).toContain("30");
  });

  it("renders date string", () => {
    render(<ClockCard />);
    expect(screen.getByText(/月.*日.*星期/)).toBeInTheDocument();
  });
});
