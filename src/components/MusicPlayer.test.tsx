import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MusicPlayer from "./MusicPlayer";

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

describe("MusicPlayer", () => {
  it("renders play button", () => {
    render(<MusicPlayer />);
    expect(screen.getByLabelText("开始播放")).toBeInTheDocument();
  });

  it("renders prev and next buttons", () => {
    render(<MusicPlayer />);
    expect(screen.getByLabelText("上一首")).toBeInTheDocument();
    expect(screen.getByLabelText("下一首")).toBeInTheDocument();
  });

  it("renders progress slider", () => {
    render(<MusicPlayer />);
    expect(screen.getByLabelText("播放进度")).toBeInTheDocument();
  });

  it("toggles play/pause on click", async () => {
    const user = userEvent.setup();
    render(<MusicPlayer />);
    const playBtn = screen.getByLabelText("开始播放");
    await user.click(playBtn);
    expect(screen.getByLabelText("暂停播放")).toBeInTheDocument();
  });

  it("renders track info", () => {
    render(<MusicPlayer />);
    expect(screen.getByText("Banger Machine")).toBeInTheDocument();
  });
});
