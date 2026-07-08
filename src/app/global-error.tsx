"use client";

// Rendered only when the root layout itself throws, so it lives outside every
// provider (no next-intl, no fonts, no globals). Everything is inlined and in
// English on purpose — nothing here can rely on app context.
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A2B6B",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#fff" }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>
            An unexpected error occurred. Please try again.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={reset}
              style={{
                height: 44,
                padding: "0 28px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                color: "#1A2B6B",
                backgroundColor: "#C9A84C",
              }}
            >
              Try again
            </button>
            {/* Plain anchor on purpose: a full navigation resets the broken app tree, and next/link has no router context here. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                height: 44,
                display: "inline-flex",
                alignItems: "center",
                padding: "0 28px",
                borderRadius: 10,
                border: "1px solid #C9A84C",
                fontSize: 14,
                fontWeight: 600,
                color: "#C9A84C",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
