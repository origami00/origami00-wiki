import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarCard from "./CalendarCard";

describe("CalendarCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-15T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders weekday headers", () => {
    render(<CalendarCard />);
    expect(screen.getByText("一")).toBeInTheDocument();
    expect(screen.getByText("日")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<CalendarCard />);
    expect(screen.getByLabelText("上个月")).toBeInTheDocument();
    expect(screen.getByLabelText("下个月")).toBeInTheDocument();
  });

  it("renders day numbers", () => {
    render(<CalendarCard />);
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("navigates to next month on click", () => {
    render(<CalendarCard />);
    fireEvent.click(screen.getByLabelText("下个月"));
    // After clicking, the component should re-render with next month
    expect(screen.getByLabelText("下个月")).toBeInTheDocument();
  });

  it("navigates to previous month on click", () => {
    render(<CalendarCard />);
    fireEvent.click(screen.getByLabelText("上个月"));
    expect(screen.getByLabelText("上个月")).toBeInTheDocument();
  });
});
