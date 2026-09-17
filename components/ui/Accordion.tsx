"use client";

import { useRef, useState } from "react";
import type { FaqItem } from "@/lib/content";
import { Chevron } from "./Icons";

export default function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line">
      {items.map((item, i) => (
        <Row
          key={item.q}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}

function Row({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  return (
    <div>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-300 hover:bg-surface-alt sm:px-7 sm:py-6"
        >
          <span className="text-[0.9375rem] font-semibold leading-snug text-ink sm:text-base">
            {item.q}
          </span>
          <span
            className={[
              "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-400",
              isOpen
                ? "rotate-180 bg-accent text-white"
                : "bg-surface-alt text-body",
            ].join(" ")}
          >
            <Chevron className="size-4" />
          </span>
        </button>
      </h3>

      <div
        ref={panel}
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 pr-10 text-[0.875rem] leading-relaxed text-body sm:px-7 sm:pb-7 sm:pr-16 sm:text-[0.9375rem]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}
