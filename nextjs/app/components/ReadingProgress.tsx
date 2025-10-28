"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getScrollElement = () =>
      document.scrollingElement || document.documentElement;

    const compute = () => {
      const scrollEl = getScrollElement();
      const scrollTop = scrollEl.scrollTop || window.scrollY || 0;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
      const viewport = window.innerHeight;
      const maxScrollable = Math.max(docHeight - viewport, 0);
      const pct = maxScrollable > 0 ? (scrollTop / maxScrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    // Initial and event-driven updates
    compute();
    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", compute, { once: true });

    // Observe DOM size changes (e.g., fonts/images/content)
    const resizeObserver = new ResizeObserver(() => compute());
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", compute);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="reading-progress"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "6px",
        zIndex: 9999,
        pointerEvents: "none",
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="reading-progress-bar"
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00ff99, #38bdf8)",
          boxShadow: "0 0 18px rgba(0,255,153,0.25)",
          transition: "width 120ms ease-out",
        }}
      />
    </div>
  );
}
