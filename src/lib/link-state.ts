export type ExternalLinkTarget =
  | { kind: "placeholder"; reason: string }
  | { kind: "external"; href: `https://${string}` };

export function placeholderLink(reason: string): ExternalLinkTarget {
  return { kind: "placeholder", reason };
}

export function externalLink(href: string): ExternalLinkTarget {
  let parsed: URL;
  try {
    parsed = new URL(href);
  } catch {
    throw new Error(`Invalid external URL: ${href}`);
  }

  if (parsed.protocol !== "https:") {
    throw new Error(`External links must use HTTPS: ${href}`);
  }

  return { kind: "external", href: parsed.toString() as `https://${string}` };
}
