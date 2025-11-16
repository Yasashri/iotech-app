"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import type { TeamMember } from "@/types/cms";

interface Props {
  members: TeamMember[];
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function TeamSection({ members }: Props) {
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.language === "ar";
  const [index, setIndex] = useState(0);

  if (!members?.length) return null;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1 >= members.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 < 0 ? members.length - 1 : prev - 1));
  };

  const slideWidthPercent = 100 / 3; // 3 cards per view on desktop

  return (
    <section id='team' className='py-16'>
      {/* Heading block forced to LTR + centered */}
      <div className='flex justify-center w-full' dir='ltr'>
        <h2 className='mb-4 text-3xl font-bold text-center'>
          {t("team.title")}
        </h2>
      </div>

      <p
        className='max-w-2xl mx-auto mb-12 text-center text-gray-400'
        dir={isRTL ? "rtl" : "ltr"}
      >
        {t("team.description")}
      </p>

      {/* ------- MOBILE LAYOUT: simple stacked cards ------- */}
      <div className='grid max-w-sm grid-cols-1 gap-6 mx-auto md:hidden'>
        {members.map((m) => {
          const rawUrl = m.Image?.url ?? "";
          const img = rawUrl.startsWith("http")
            ? rawUrl
            : rawUrl
            ? `${STRAPI_URL}${rawUrl}`
            : "";

          return (
            <div
              key={m.id}
              className='p-6 text-center bg-white rounded-lg shadow-lg'
            >
              <div className='relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-md'>
                {img && (
                  <Image
                    fill
                    src={img}
                    alt={m.name}
                    className='object-cover'
                    unoptimized
                  />
                )}
              </div>

              <h3 className='mb-1 text-xl font-semibold'>{m.name}</h3>
              <p className='mb-4 text-gray-500'>{m.role}</p>

              <div className='flex justify-center gap-6 text-xl'>
                <FaWhatsapp className='cursor-pointer hover:text-green-500' />
                <FaPhone className='cursor-pointer hover:text-blue-500' />
                <FaEnvelope className='cursor-pointer hover:text-red-500' />
              </div>
            </div>
          );
        })}
      </div>

      {/* ------- DESKTOP SLIDER ------- */}
      <div className='relative hidden max-w-6xl mx-auto overflow-hidden text-center md:block'>
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className='absolute left-0 z-10 items-center justify-center hidden p-3 -translate-y-1/2 cursor-pointer hover:rounded-full hover:shadow md:flex rtl:left-auto rtl:right-0 top-1/2 hover:bg-background-brown hover:text-white'
        >
          <span className='text-2xl rtl:hidden'>&lt;</span>
          <span className='hidden text-2xl rtl:inline'>&gt;</span>
        </button>

        {/* Slider track */}
        <div
          className='flex transition-transform duration-500 rtl:flex-row-reverse'
          style={{ transform: `translateX(-${index * slideWidthPercent}%)` }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {members.map((m) => {
            const rawUrl = m.Image?.url ?? "";
            const img = rawUrl.startsWith("http")
              ? rawUrl
              : rawUrl
              ? `${STRAPI_URL}${rawUrl}`
              : "";

            return (
              <div key={m.id} className='w-1/3 px-4 shrink-0'>
                <div className='p-6 text-center bg-white'>
                  <div className='relative h-48 mx-auto mb-4 overflow-hidden w-68'>
                    {img && (
                      <Image
                        fill
                        src={img}
                        alt={m.name}
                        className='object-cover'
                        unoptimized
                      />
                    )}
                  </div>

                  <h3 className='mb-1 text-xl font-semibold'>{m.name}</h3>
                  <p className='mb-4 text-gray-500'>{m.role}</p>

                  <div className='flex justify-center gap-6 text-xl'>
                    <FaWhatsapp className='cursor-pointer hover:text-green-500' />
                    <FaPhone className='cursor-pointer hover:text-blue-500' />
                    <FaEnvelope className='cursor-pointer hover:text-red-500' />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className='absolute right-0 z-10 items-center justify-center hidden p-3 -translate-y-1/2 cursor-pointer hover:rounded-full hover:shadow md:flex rtl:right-auto rtl:left-0 top-1/2 hover:bg-background-brown hover:text-white '
        >
          <span className='text-2xl rtl:hidden'>&gt;</span>
          <span className='hidden text-2xl rtl:inline'>&lt;</span>
        </button>
      </div>
    </section>
  );
}
