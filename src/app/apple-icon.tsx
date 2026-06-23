// TODO: Replace with client's actual logo
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A2B6B",
          borderRadius: 36,
          fontSize: 90,
          fontWeight: 700,
          color: "#C9A84C",
        }}
      >
        I
      </div>
    ),
    { ...size }
  );
}
