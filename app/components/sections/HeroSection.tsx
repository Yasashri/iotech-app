"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { HeroSlide } from "@/types/cms";

interface Props {
  slides: HeroSlide[];
}

export default function HeroSection({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation("common");

  // Guard: no slides
  if (!slides || slides.length === 0) return null;

  const slideCount = slides.length;

  // Keep index in range
  const safeIndex = ((index % slideCount) + slideCount) % slideCount;
  const slide = slides[safeIndex];

  const baseUrl = process.env.NEXT_PUBLIC_CMS_URL ?? "";

  // Background image (hero)
  const bgPath =
    slide.backgroundImage?.formats?.large?.url ??
    slide.backgroundImage?.formats?.medium?.url ??
    slide.backgroundImage?.url ??
    "";
  const bg = bgPath ? `${baseUrl}${bgPath}` : "";

  // Person image (card on the right)
  const personPath =
    slide.person?.formats?.medium?.url ??
    slide.person?.formats?.small?.url ??
    slide.person?.url ??
    "";
  const personSrc = personPath ? `${baseUrl}${personPath}` : "";

  // Auto-advance
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (slideCount <= 1) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slideCount),
      6000
    );
    return () => clearInterval(id);
  }, [slideCount]);

  const goTo = (i: number) => setIndex(i);
  const prev = () => setIndex((prev) => (prev - 1 + slideCount) % slideCount);
  const next = () => setIndex((prev) => (prev + 1) % slideCount);

  return (
    <section
      className="relative flex items-center h-[70vh] text-white"
      style={
        bg
          ? {
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Gradient overlay like screenshot */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

      {/* Left side: arrows + dots */}
      <div className="absolute z-20 flex flex-col items-center hidden gap-4 -translate-y-1/2 left-6 top-1/2 md:block">
        {/* Prev arrow */}
        <button
          type="button"
          onClick={prev}
          className="flex items-center justify-center w-10 h-10 transition-colors rounded-full hover:bg-white/40 hover:cursor-pointer"
          aria-label="Previous slide"
        >
          <span className="text-2xl leading-none">&lt;</span>
        </button>

        {/* Dots */}
        <div className="flex flex-col items-center gap-3 mt-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full border border-white transition-all ${
                i === safeIndex ? "bg-white scale-110" : "bg-white/20"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right side next arrow (optional, aligns with your design) */}
      {/* <div className="absolute z-20 -translate-y-1/2 right-6 top-1/2">
        <button
          type="button"
          onClick={next}
          className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-white/20 hover:bg-white/40"
          aria-label="Next slide"
        >
          <span className="text-2xl leading-none">&gt;</span>
        </button>
      </div> */}

      {/* Main content area */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl gap-8 px-6 mx-auto">
        {/* Text left, aligned like your screenshot */}
        <div className="max-w-xl text-left">
          <h1 className="mb-4 text-3xl font-semibold md:text-5xl">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="mb-6 text-sm text-gray-200 md:text-lg">
              {slide.subtitle}
            </p>
          )}

          {slide.ctaLink && (
            <a
              href={slide.ctaLink}
              className="inline-block px-6 py-2 text-sm font-medium transition-colors bg-white rounded text-background-brown hover:bg-background-brown hover:text-white"
            >
              {slide.ctaLabel || t("hero.readMore")}
            </a>
          )}
        </div>

        {/* Person image card on the right */}
        {personSrc && (
          <div className="hidden md:block">
            <div className="relative overflow-hidden w-72 h-80">
              <Image
                src={personSrc}
                alt={slide.person?.alternativeText || slide.title || "Hero person"}
                fill
                className="object-cover"
                priority={safeIndex === 0}
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
