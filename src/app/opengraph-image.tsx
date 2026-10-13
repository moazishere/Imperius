import { ImageResponse } from "next/og";

export const alt = "Imperius: Turning chaos into knowledge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Same 3×3 mark as the logo, as [x, y, opacity, rotation] on a 22-unit grid. */
const MARK: [number, number, number, number][] = [
  [1, 0.5, 0.3, -14], [9.5, 2, 0.55, 0], [17, 1, 1, 0],
  [1, 9, 0.55, 0], [9, 9, 1, 0], [17, 9, 1, 0],
  [1, 17, 1, 0], [9, 17, 1, 0], [17, 17, 1, 0],
];
const UNIT = 4;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#FFFFFF",
          color: "#141414",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", position: "relative", width: 22 * UNIT, height: 22 * UNIT }}>
            {MARK.map(([x, y, o, r], i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x * UNIT,
                  top: y * UNIT,
                  width: 4 * UNIT,
                  height: 4 * UNIT,
                  background: "#141414",
                  opacity: o,
                  transform: `rotate(${r}deg)`,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 56, letterSpacing: -2 }}>Imperius</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1.02, letterSpacing: -4 }}>
          <span style={{ color: "#8B8B86" }}>Turning Chaos</span>
          <span>into Knowledge.</span>
        </div>
      </div>
    ),
    size,
  );
}
