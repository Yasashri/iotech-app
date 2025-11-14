"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { HeroSlide } from "@/types/cms";

interface Props {
  slides: HeroSlide[];
}

export default function HeroSection({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation("common");

  // Auto-advance slider
  useEffect(() => {
    if (!slides?.length || slides.length <= 1) return;

    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(id);
  }, [slides]);

  // No slides → render nothing
  if (!slides || slides.length === 0) {
    return null;
  }

  // Make sure index is always valid
  const safeIndex = index % slides.length;
  const slide = slides[safeIndex];

  // Build background URL from media object
  const baseUrl = process.env.NEXT_PUBLIC_CMS_URL ?? "";
  const imagePath =
    slide.backgroundImage?.formats?.large?.url ??
    slide.backgroundImage?.formats?.medium?.url ??
    slide.backgroundImage?.url ??
    "";

  const bg = imagePath ? `${baseUrl}${imagePath}` : "";

  return (
    <section
      className='relative h-[60vh] flex items-center justify-center text-center'
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
      <div className='absolute inset-0 bg-black/60' />
      <div className='relative z-10 max-w-2xl px-4'>
        <h1 className='mb-4 text-3xl font-semibold md:text-4xl'>
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p className='mb-6 text-sm text-gray-200 md:text-base'>
            {slide.subtitle}
          </p>
        )}

        {slide.ctaLink && (
          <a
            href={slide.ctaLink}
            className='inline-block px-5 py-2 text-sm font-medium rounded bg-brown-600 hover:bg-brown-500'
          >
            {slide.ctaLabel || t("hero.readMore")}
          </a>
        )}
      </div>
    </section>
  );
}
