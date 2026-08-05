import { cn } from "@/lib/utils";

/** Soft, animated cream/gold blobs behind the hero — pure CSS, no JS.
 *  No canvas, no WebGL, no client bundle cost; drift is GPU-cheap
 *  (transform + opacity only) and disabled under prefers-reduced-motion
 *  via the .gradient-blob rule in globals.css. */
export function FlowyGradientBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        aria-hidden
        className="gradient-blob"
        style={{
          top: "-12%",
          left: "-8%",
          width: "58%",
          height: "58%",
          background: "radial-gradient(circle, #F3E8D3 0%, transparent 70%)",
          animation: "drift-1 30s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden
        className="gradient-blob"
        style={{
          top: "8%",
          right: "-12%",
          width: "52%",
          height: "52%",
          background: "radial-gradient(circle, #EEDCB0 0%, transparent 70%)",
          animation: "drift-2 36s ease-in-out infinite alternate",
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden
        className="gradient-blob"
        style={{
          bottom: "-16%",
          left: "14%",
          width: "48%",
          height: "48%",
          background: "radial-gradient(circle, #E8D4A6 0%, transparent 70%)",
          animation: "drift-3 42s ease-in-out infinite alternate",
          animationDelay: "-14s",
        }}
      />
      <div
        aria-hidden
        className="gradient-blob"
        style={{
          bottom: "2%",
          right: "8%",
          width: "42%",
          height: "42%",
          background: "radial-gradient(circle, #FFFFFF 0%, transparent 70%)",
          animation: "drift-4 26s ease-in-out infinite alternate",
          animationDelay: "-3s",
        }}
      />
    </div>
  );
}
