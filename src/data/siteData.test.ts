import { describe, it, expect } from "vitest";
import {
  profile,
  socialLinks,
  navigation,
  latestContent,
  musicList,
  photoWallItems,
  subPageContent,
} from "./siteData";

describe("siteData", () => {
  describe("profile", () => {
    it("has required fields", () => {
      expect(profile.name).toBeTruthy();
      expect(profile.bio).toBeTruthy();
      expect(["online", "busy", "away", "developing"]).toContain(profile.status);
      expect(profile.location).toBeTruthy();
    });
  });

  describe("socialLinks", () => {
    it("is a non-empty array", () => {
      expect(socialLinks.length).toBeGreaterThan(0);
    });
    it("each link has label, icon, href, bg, color", () => {
      for (const link of socialLinks) {
        expect(link.label).toBeTruthy();
        expect(link.icon).toBeTruthy();
        expect(link.href).toBeTruthy();
        expect(link.bg).toBeTruthy();
        expect(link.color).toBeTruthy();
      }
    });
  });

  describe("navigation", () => {
    it("contains 5 items", () => {
      expect(navigation).toHaveLength(5);
    });
    it("each item has label, icon, href", () => {
      for (const item of navigation) {
        expect(item.label).toBeTruthy();
        expect(item.icon).toBeTruthy();
        expect(item.href).toBeTruthy();
      }
    });
    it("first item is home", () => {
      expect(navigation[0]!.href).toBe("/");
    });
  });

  describe("latestContent", () => {
    it("is a non-empty array", () => {
      expect(latestContent.length).toBeGreaterThan(0);
    });
    it("each item has title, date, tag, emoji, url", () => {
      for (const item of latestContent) {
        expect(item.title).toBeTruthy();
        expect(item.date).toBeTruthy();
        expect(item.tag).toBeTruthy();
        expect(item.emoji).toBeTruthy();
        expect(item.url).toBeTruthy();
      }
    });
  });

  describe("musicList", () => {
    it("is a non-empty array", () => {
      expect(musicList.length).toBeGreaterThan(0);
    });
    it("each track has title, artist, src", () => {
      for (const track of musicList) {
        expect(track.title).toBeTruthy();
        expect(track.artist).toBeTruthy();
        expect(track.src).toBeTruthy();
      }
    });
  });

  describe("photoWallItems", () => {
    it("is a non-empty array", () => {
      expect(photoWallItems.length).toBeGreaterThan(0);
    });
    it("each item has title and src", () => {
      for (const item of photoWallItems) {
        expect(item.title).toBeTruthy();
        expect(item.src).toBeTruthy();
      }
    });
  });

  describe("subPageContent", () => {
    it("contains entries for all sub-routes", () => {
      expect(subPageContent["/articles"]).toBeDefined();
      expect(subPageContent["/projects"]).toBeDefined();
      expect(subPageContent["/about"]).toBeDefined();
      expect(subPageContent["/recommendations"]).toBeDefined();
    });
    it("each entry has title, description, links", () => {
      for (const [, data] of Object.entries(subPageContent)) {
        expect(data.title).toBeTruthy();
        expect(data.description).toBeTruthy();
        expect(Array.isArray(data.links)).toBe(true);
      }
    });
  });
});
