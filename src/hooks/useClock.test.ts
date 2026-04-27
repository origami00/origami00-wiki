import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useClock } from "./useClock";

describe("useClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns hours, minutes, seconds as two-digit strings", () => {
    // Set a fixed time: 2026-04-27 14:05:09 UTC
    vi.setSystemTime(new Date("2026-04-27T14:05:09Z"));
    const { result } = renderHook(() => useClock());

    // UTC+8: 22:05:09
    expect(result.current.hours).toBe("22");
    expect(result.current.minutes).toBe("05");
    expect(result.current.seconds).toBe("09");
  });

  it("returns Good Morning for hours < 12 (UTC+8)", () => {
    // UTC 03:00 = UTC+8 11:00 → Morning
    vi.setSystemTime(new Date("2026-04-27T03:00:00Z"));
    const { result } = renderHook(() => useClock());
    expect(result.current.greeting).toBe("Good Morning");
  });

  it("returns Good Afternoon for 12 <= hours < 18 (UTC+8)", () => {
    // UTC 06:00 = UTC+8 14:00 → Afternoon
    vi.setSystemTime(new Date("2026-04-27T06:00:00Z"));
    const { result } = renderHook(() => useClock());
    expect(result.current.greeting).toBe("Good Afternoon");
  });

  it("returns Good Evening for hours >= 18 (UTC+8)", () => {
    // UTC 11:00 = UTC+8 19:00 → Evening
    vi.setSystemTime(new Date("2026-04-27T11:00:00Z"));
    const { result } = renderHook(() => useClock());
    expect(result.current.greeting).toBe("Good Evening");
  });

  it("dateStr contains Chinese weekday", () => {
    vi.setSystemTime(new Date("2026-04-27T00:00:00Z")); // UTC+8 08:00
    const { result } = renderHook(() => useClock());
    expect(result.current.dateStr).toContain("月");
    expect(result.current.dateStr).toContain("日");
    expect(result.current.dateStr).toContain("星期");
  });

  it("updates every second", () => {
    vi.setSystemTime(new Date("2026-04-27T06:00:00Z"));
    const { result } = renderHook(() => useClock());
    const initialSeconds = result.current.seconds;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.seconds).not.toBe(initialSeconds);
  });
});
