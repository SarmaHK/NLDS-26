"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const validImages = images.filter(Boolean);
  const hasMultiple = validImages.length > 1;

  function selectImage(idx: number) {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  }

  return (
    <div className="flex flex-col w-full h-full relative overflow-hidden">
      {/* Primary Image fills full container */}
      <div
        className="relative overflow-hidden w-full h-full flex-1 min-h-[130px] sm:min-h-[180px] md:min-h-full"
        style={{
          background: "#08080a",
        }}
      >
        {/* Scan-line overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />

        <AnimatePresence mode="wait" custom={direction}>
          {validImages.length > 0 ? (
            <motion.img
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src={validImages[activeIndex]}
              alt={`${productName} — image ${activeIndex + 1}`}
              className="w-full h-full object-cover"
              style={{
                display: "block",
                minHeight: "100%",
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            /* Placeholder when no image is available */
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex flex-col items-center justify-center gap-4 py-16"
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    border: "1px solid rgba(196,30,58,0.4)",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <span
                className="font-classified"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                IMAGE CLASSIFIED
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner marks */}
        <div
          className="absolute top-4 left-4 w-4 h-4 corner-tl pointer-events-none z-10"
          style={{ borderColor: "rgba(196,30,58,0.45)" }}
        />
        <div
          className="absolute bottom-4 right-4 w-4 h-4 corner-br pointer-events-none z-10"
          style={{ borderColor: "rgba(196,30,58,0.45)" }}
        />
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div
          className="flex gap-2 flex-wrap p-3 z-10"
          style={{
            background: "rgba(6,6,8,0.85)",
            backdropFilter: "blur(6px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => selectImage(idx)}
              aria-label={`View image ${idx + 1}`}
              className="relative overflow-hidden transition-all duration-200"
              style={{
                width: 52,
                height: 52,
                background: "#0a0a0c",
                border:
                  idx === activeIndex
                    ? "1px solid var(--red)"
                    : "1px solid rgba(255,255,255,0.1)",
                opacity: idx === activeIndex ? 1 : 0.5,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
