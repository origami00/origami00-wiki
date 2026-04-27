import { describe, it, expect } from "vitest";
import { C, card, iconMap } from "./design";

describe("design tokens", () => {
  describe("C", () => {
    it("has all 10 DesignTokens fields", () => {
      expect(C.accent).toBeTruthy();
      expect(C.accentDark).toBeTruthy();
      expect(C.accentBg).toBeTruthy();
      expect(C.text).toBeTruthy();
      expect(C.textSec).toBeTruthy();
      expect(C.textMuted).toBeTruthy();
      expect(C.card).toBeTruthy();
      expect(C.cardHover).toBeTruthy();
      expect(C.shadow).toBeTruthy();
      expect(C.shadowHover).toBeTruthy();
    });

    it("accent is a valid hex color", () => {
      expect(C.accent).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe("card", () => {
    it("has correct borderRadius", () => {
      expect(card.borderRadius).toBe(20);
    });

    it("has backdropFilter blur", () => {
      expect(card.backdropFilter).toBe("blur(18px)");
    });

    it("has overflow hidden", () => {
      expect(card.overflow).toBe("hidden");
    });

    it("has transition property", () => {
      expect(card.transition).toContain("box-shadow");
    });
  });

  describe("iconMap", () => {
    it("contains 8 mappings", () => {
      expect(Object.keys(iconMap)).toHaveLength(8);
    });

    it("maps known icon names to components", () => {
      expect(iconMap.Github).toBeDefined();
      expect(iconMap.Tv).toBeDefined();
      expect(iconMap.Music2).toBeDefined();
      expect(iconMap.Home).toBeDefined();
      expect(iconMap.FileText).toBeDefined();
      expect(iconMap.Sparkles).toBeDefined();
      expect(iconMap.Info).toBeDefined();
      expect(iconMap.Heart).toBeDefined();
    });
  });
});
