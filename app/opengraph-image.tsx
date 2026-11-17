import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = "AmanDevs — Independent Web Development Studio | India & Worldwide";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#D2F946",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "900",
                fontSize: "24px",
                color: "#000000",
              }}
            >
              AD
            </div>
            <span style={{ color: "#FFFFFF", fontSize: "32px", fontWeight: "bold" }}>
              AmanDevs<span style={{ color: "#D2F946" }}>.</span>
            </span>
          </div>

          <div
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(210, 249, 70, 0.4)",
              backgroundColor: "rgba(11, 18, 14, 0.8)",
              padding: "8px 20px",
              color: "#D2F946",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Based in India · Working worldwide
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "62px",
              fontWeight: "900",
              color: "#FFFFFF",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Your next website should do more than just look good.
          </h1>
          <p style={{ fontSize: "24px", color: "rgba(255, 255, 255, 0.75)", margin: 0 }}>
            Independent web development studio serving businesses across India and internationally.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "28px", color: "rgba(255, 255, 255, 0.65)", fontSize: "18px" }}>
            <span>Next.js 15 App Router</span>
            <span>·</span>
            <span>Transparent Rates from ₹7,999</span>
            <span>·</span>
            <span>Direct WhatsApp & Lead Routing</span>
          </div>

          <span style={{ color: "#D2F946", fontSize: "20px", fontWeight: "bold" }}>
            {site.domain}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
