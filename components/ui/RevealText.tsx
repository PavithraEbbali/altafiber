"use client";

import { useInView } from "@/lib/hooks";

type RevealTextProps = {
  /** Each entry becomes its own masked line. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** Milliseconds between consecutive lines. */
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * Per-line masked text reveal: each line slides up from behind its own
 * overflow clip. Used on section headings and the hero H1.
 */
export default function RevealText({
  lines,
  className = "",
  lineClassName = "",
  stagger = 90,
  delay = 0,
  as: Tag = "h2",
}: RevealTextProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>({ threshold: 0.3 });

  return (
    <Tag ref={ref} className={`${inView ? "is-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span className={`line-mask ${lineClassName}`} key={line + i}>
          <span
            style={{
              ["--reveal-delay" as string]: `${delay + i * stagger}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
