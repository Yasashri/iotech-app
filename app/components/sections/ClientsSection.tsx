/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import type { Client } from "@/types/cms";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
  clients: Client[];
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function getImageUrl(client: Client): string {
  const logo: any = client.logo;

  const rawUrl =
    logo?.url ?? logo?.data?.url ?? logo?.data?.attributes?.url ?? "";

  if (!rawUrl) return "";
  if (typeof rawUrl === "string" && rawUrl.startsWith("http")) {
    return rawUrl;
  }

  return `${STRAPI_URL}${rawUrl}`;
}

export default function ClientsSection({ clients }: Props) {
  const { t } = useTranslation("common");
  const [index, setIndex] = useState(0);
  if (!clients?.length) return null;

  const current = clients[index];

  const img = getImageUrl(current);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % clients.length);
  };

  return (
    <div className='w-full bg-background-brown'>
      <section
        id='clients'
        className='max-w-6xl px-4 mx-auto text-white py-14 bg-background-brown'
      >
        <div className='mb-10'>
          <h2 className='text-3xl font-semibold md:text-4xl'>
            {t("clients.heading")}
          </h2>
          <p className='max-w-3xl mt-3 text-sm leading-relaxed text-gray-200 md:text-base'>
           {t("clients.subheading")}
          </p>
        </div>

        {/* Card */}
        <div className='relative flex flex-col gap-8 p-6 rounded-xl bg-surface md:flex-row md:items-center'>
          {/* Image */}
          <div className='flex justify-center md:justify-start'>
            <div className='relative w-full max-w-sm overflow-hidden h-50 rounded-xl aspect-4/3'>
              {img && (
                <Image
                  src={img}
                  alt={current.name}
                  fill
                  unoptimized
                  className='object-cover'
                />
              )}
            </div>
          </div>

          {/* Text content */}
          <div className='flex-1 mt-4 space-y-4 md:mt-0 md:ml-6 rtl:md:ml-0 rtl:md:mr-6'>
            <p className='text-base leading-relaxed text-gray-100 md:text-lg'>
              {current.testimonial && <>“{current.testimonial}”</>}
            </p>
            <div className='space-y-1'>
              <p className='font-semibold text-white'>{current.name}</p>
            </div>
          </div>

          {/* Arrows */}
          <div className='flex gap-3 mt-4 md:absolute md:bottom-6 md:right-6 rtl:md:right-auto rtl:md:left-6 md:mt-0'>
            <button
              type='button'
              onClick={handlePrev}
              className='flex items-center justify-center w-12 h-12 p-3 text-white transition rounded-full shadow-lg cursor-pointer hover:bg-white hover:text-black bg-white/10'
              aria-label='Previous testimonial'
            >
              <span className='text-xl leading-none rtl:hidden'>←</span>
              <span className='hidden text-xl leading-none rtl:inline'>→</span>
            </button>
            <button
              type='button'
              onClick={handleNext}
              className='flex items-center justify-center w-12 h-12 p-3 text-white transition rounded-full shadow-lg cursor-pointer hover:bg-white hover:text-black bg-white/10'
              aria-label='Next testimonial'
            >
              <span className='text-xl leading-none rtl:hidden'>→</span>
              <span className='hidden text-xl leading-none rtl:inline'>←</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
