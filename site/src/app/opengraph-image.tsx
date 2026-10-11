import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — combi Volkswagen bar & DJ, mini-discothèque`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage générée (remplaçable par une photo : app/opengraph-image.jpg). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f6f1e8",
          color: "#231d19",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#74232e", display: "flex" }} />
          <div style={{ fontSize: 34, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 950 }}>Faites de votre événement un moment inoubliable.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#74232e" }}>Combi Volkswagen bar & DJ · Mini-discothèque</div>
        </div>
        <div style={{ display: "flex", height: 10, width: "100%" }}>
          <div style={{ flex: 1, background: "#74232e" }} />
          <div style={{ flex: 1, background: "#ffffff" }} />
          <div style={{ flex: 1, background: "#e5d7c6" }} />
        </div>
      </div>
    ),
    size,
  );
}
