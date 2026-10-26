import { ImageResponse } from "next/og";

// Home-screen icon: same "SC" monogram as icon.svg, rendered to PNG
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
          background: "linear-gradient(135deg, #16131f, #050507)",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <g fill="none" stroke="#b3a3ff" strokeWidth="5.5" strokeLinecap="round" transform="translate(-1.25 0)">
            <path d="M25.63 22.25A6.5 6.5 0 1 0 20 32A6.5 6.5 0 1 1 14.37 41.75" />
            <path d="M49.49 23.51A12 12 0 1 0 49.49 40.49" />
          </g>
        </svg>
      </div>
    ),
    size
  );
}
