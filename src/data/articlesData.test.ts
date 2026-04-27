import { describe, it, expect } from "vitest";
import { articles } from "./articlesData";

describe("articlesData", () => {
  it("is a non-empty array", () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it("each article has required fields", () => {
    for (const article of articles) {
      expect(article.id).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.summary).toBeTruthy();
      expect(article.date).toBeTruthy();
      expect(article.tag).toBeTruthy();
      expect(article.emoji).toBeTruthy();
      expect(article.content).toBeTruthy();
    }
  });

  it("each article has a unique id", () => {
    const ids = articles.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("articles have valid tags", () => {
    const validTags = ["前端", "AI", "游戏", "技术"];
    for (const article of articles) {
      expect(validTags).toContain(article.tag);
    }
  });
});
