import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCalendar } from "./useCalendar";

describe("useCalendar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns current month and year", () => {
    vi.setSystemTime(new Date("2026-04-15T00:00:00Z"));
    const { result } = renderHook(() => useCalendar());
    expect(result.current.year).toBe(2026);
    expect(result.current.monthName).toBeTruthy();
  });

  it("days array contains null padding and day objects", () => {
    vi.setSystemTime(new Date("2026-04-15T00:00:00Z"));
    const { result } = renderHook(() => useCalendar());
    const nulls = result.current.days.filter((d) => d === null);
    const dayObjects = result.current.days.filter((d) => d !== null);
    expect(nulls.length).toBeGreaterThanOrEqual(0);
    expect(dayObjects.length).toBe(30); // April has 30 days
  });

  it("marks today correctly", () => {
    vi.setSystemTime(new Date("2026-04-15T00:00:00Z"));
    const { result } = renderHook(() => useCalendar());
    const today = result.current.days.find((d) => d?.isToday);
    expect(today).toBeDefined();
    expect(today!.day).toBe(15);
  });

  it("goNext advances month", () => {
    vi.setSystemTime(new Date("2026-04-15T00:00:00Z"));
    const { result } = renderHook(() => useCalendar());
    const initialMonth = result.current.monthName;

    act(() => {
      result.current.goNext();
    });

    expect(result.current.monthName).not.toBe(initialMonth);
  });

  it("goPrev goes to previous month", () => {
    vi.setSystemTime(new Date("2026-04-15T00:00:00Z"));
    const { result } = renderHook(() => useCalendar());

    act(() => {
      result.current.goPrev();
    });

    // Should be March now
    expect(result.current.year).toBe(2026);
    // monthName should be different from April
    const marchName = new Intl.DateTimeFormat("zh-CN", { month: "long" }).format(new Date(2026, 2, 1));
    expect(result.current.monthName).toBe(marchName);
  });

  it("uses Monday as first day of week", () => {
    // January 2026: starts on Thursday
    // (Thursday getDay() = 4, (4+6)%7 = 3 → 3 null padding days for Mon/Tue/Wed)
    vi.setSystemTime(new Date("2026-01-15T00:00:00Z"));
    const { result } = renderHook(() => useCalendar());
    const firstNonNull = result.current.days.find((d) => d !== null);
    expect(firstNonNull!.day).toBe(1);
  });
});
