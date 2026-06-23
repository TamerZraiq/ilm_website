// TODO: Replace with client's actual logo favicon
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
          fontSize: 18,
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
