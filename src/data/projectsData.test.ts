import { describe, it, expect } from "vitest";
import { projects } from "./projectsData";

describe("projectsData", () => {
  it("is a non-empty array", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.date).toBeTruthy();
      expect(project.emoji).toBeTruthy();
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it("each project has a valid status", () => {
    const validStatuses = ["进行中", "已完成", "暂停"];
    for (const project of projects) {
      expect(validStatuses).toContain(project.status);
    }
  });

  it("each project has a unique id", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
