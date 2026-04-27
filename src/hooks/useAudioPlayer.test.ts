import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAudioPlayer } from "./useAudioPlayer";

// Mock Audio as a class
class MockAudio {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  preload = "";
  src = "";
  duration = 120;
  currentTime = 0;
}

vi.stubGlobal("Audio", MockAudio);

describe("useAudioPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns initial state with first track", () => {
    const { result } = renderHook(() => useAudioPlayer());
    expect(result.current.playing).toBe(false);
    expect(result.current.progress).toBe(0);
    expect(result.current.track.title).toBeTruthy();
    expect(result.current.track.artist).toBeTruthy();
  });

  it("toggle switches playing state", () => {
    const { result } = renderHook(() => useAudioPlayer());
    expect(result.current.playing).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.playing).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.playing).toBe(false);
  });

  it("next changes track and resets state", () => {
    const { result } = renderHook(() => useAudioPlayer());

    act(() => {
      result.current.next();
    });

    expect(result.current.playing).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it("prev changes track and resets state", () => {
    const { result } = renderHook(() => useAudioPlayer());

    act(() => {
      result.current.prev();
    });

    expect(result.current.playing).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it("elapsedStr and totalStr are formatted as MM:SS", () => {
    const { result } = renderHook(() => useAudioPlayer());
    expect(result.current.elapsedStr).toMatch(/^\d{2}:\d{2}$/);
    expect(result.current.totalStr).toMatch(/^\d{2}:\d{2}$/);
  });

  it("seek sets progress", () => {
    const { result } = renderHook(() => useAudioPlayer());

    act(() => {
      result.current.seek(50);
    });

    expect(result.current.progress).toBe(50);
  });
});
