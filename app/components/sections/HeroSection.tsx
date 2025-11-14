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

  useEffect(() => {
    if (!slides?.length) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(id);
  }, [slides]);

  if (!slides?.length) return null;

  const slide = slides[index];
  const bg = slide.attributes.backgroundImage?.data?.attributes?.url ?? "";

  return (
    <section
      className="relative h-[60vh] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
          {slide.attributes.title}
        </h1>
        {slide.attributes.subtitle && (
          <p className="mb-6 text-sm text-gray-200 md:text-base">
            {slide.attributes.subtitle}
          </p>
        )}
        {slide.attributes.ctaLink && (
          <a
            href={slide.attributes.ctaLink}
            className="inline-block px-5 py-2 text-sm font-medium rounded bg-brown-600 hover:bg-brown-500"
          >
            {slide.attributes.ctaLabel || t("hero.readMore")}
          </a>
        )}
      </div>
    </section>
  );
}
