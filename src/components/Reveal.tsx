import { useEffect, useRef, useState, type ReactNode } from "react";

type From = "up" | "left" | "right";

export function Reveal({
  children,
  from = "up",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  from?: From;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const direction = from === "left" ? "reveal-left" : from === "right" ? "reveal-right" : "reveal-up";

  return (
    <div
      ref={ref}
      className={`reveal ${direction} ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
