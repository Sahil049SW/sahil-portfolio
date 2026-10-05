import { describe, expect, it } from "vitest";
import { externalLink, placeholderLink } from "@/lib/link-state";

describe("external link state", () => {
  it("represents missing URLs as explicit placeholders", () => {
    expect(placeholderLink("URL not supplied")).toEqual({
      kind: "placeholder",
      reason: "URL not supplied",
    });
  });

  it("accepts HTTPS URLs", () => {
    expect(externalLink("https://example.com/work")).toEqual({
      kind: "external",
      href: "https://example.com/work",
    });
  });

  it("rejects unsupported schemes and malformed URLs", () => {
    expect(() => externalLink("http://example.com")).toThrow("HTTPS");
    expect(() => externalLink("javascript:alert(1)")).toThrow("HTTPS");
    expect(() => externalLink("not a url")).toThrow("Invalid external URL");
  });
});
