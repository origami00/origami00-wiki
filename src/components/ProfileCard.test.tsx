import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";

describe("ProfileCard", () => {
  it("renders greeting text", () => {
    render(<ProfileCard greeting="Good Morning" />);
    expect(screen.getByText(/Good Morning/)).toBeInTheDocument();
  });

  it("renders profile name", () => {
    render(<ProfileCard greeting="Hello" />);
    expect(screen.getByText("Origami00")).toBeInTheDocument();
  });

  it("renders profile bio", () => {
    render(<ProfileCard greeting="Hello" />);
    expect(screen.getByText(/绘画/)).toBeInTheDocument();
  });

  it("renders location", () => {
    render(<ProfileCard greeting="Hello" />);
    expect(screen.getByText("中国")).toBeInTheDocument();
  });

  it("renders Nice to meet you", () => {
    render(<ProfileCard greeting="Hello" />);
    expect(screen.getByText(/Nice to meet you/)).toBeInTheDocument();
  });
});
