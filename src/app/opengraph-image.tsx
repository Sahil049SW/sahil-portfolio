import { ImageResponse } from "next/og";

// Required for `output: "export"`: metadata routes compile to GET route
// handlers, which are dynamic by default in Next.js 15+.
export const dynamic = "force-static";

export const alt = "Sahil Swain — Senior Backend Engineer + AI Automation Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Simple branded OG image — typography + accent only, no fake content.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0b0d",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              border: "3px solid #e5a13c",
              display: "flex",
            }}
          />
          <span style={{ color: "#99a0a8", fontSize: 24, letterSpacing: 4 }}>
            AI · AUTOMATION · BACKEND ENGINEERING
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ color: "#ecedee", fontSize: 64, fontWeight: 600, lineHeight: 1.1 }}>
            I build reliable software systems for real-world workflows.
          </span>
          <span style={{ color: "#e5a13c", fontSize: 28 }}>Sahil Swain</span>
        </div>
        <span style={{ color: "#99a0a8", fontSize: 22 }}>
          Lead Engineer experience · Enterprise systems · AI-native engineering
        </span>
      </div>
    ),
    size,
  );
}
