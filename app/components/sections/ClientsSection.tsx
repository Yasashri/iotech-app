/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import type { Client } from "@/types/cms";
import Image from "next/image";

interface Props {
  clients: Client[];
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function getImageUrl(client: Client): string {
  // Try a few common Strapi v4/v5 shapes safely
  const logo: any = client.logo;

  const rawUrl =
    logo?.url ?? logo?.data?.url ?? logo?.data?.attributes?.url ?? "";

  if (!rawUrl) return "";

  // If Strapi already returns an absolute URL, just use it
  if (typeof rawUrl === "string" && rawUrl.startsWith("http")) {
    return rawUrl;
  }

  return `${STRAPI_URL}${rawUrl}`;
}

export default function ClientsSection({ clients }: Props) {
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
    <section id='clients' className='max-w-6xl px-4 mx-auto py-14'>
      {/* Heading */}
      <div className='mb-10'>
        <h2 className='text-3xl font-semibold md:text-4xl'>
          What our clients are saying
        </h2>
        <p className='max-w-3xl mt-3 text-sm leading-relaxed text-gray-200 md:text-base'>
          Our clients range from individual investors, to local, international
          as well as Fortune 500 companies.
        </p>
      </div>

      {/* Card */}
      <div className='relative flex flex-col gap-8 p-6 rounded-xl bg-surface md:flex-row md:items-center'>
        {/* Image */}
        <div className='flex justify-center md:justify-start'>
          <div className='relative w-full max-w-sm overflow-hidden h-100 rounded-xl aspect-4/3'>
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
        <div className='flex-1 mt-4 space-y-4 md:mt-0 md:ml-6'>
          <p className='text-base leading-relaxed text-gray-100 md:text-lg'>
            {/* Adjust the field name if your type uses something else
               e.g. current.quote or current.text */}
            {current.testimonial && <>“{current.testimonial}”</>}
          </p>
          <div className='space-y-1'>
            <p className='font-semibold text-white'>{current.name}</p>
          </div>
        </div>

        {/* Arrows */}
        <div className='flex gap-3 mt-4 md:absolute md:bottom-6 md:right-6 md:mt-0'>
          <button
            type='button'
            onClick={handlePrev}
            className='flex items-center justify-center w-10 h-10 transition rounded-full bg-brown-700/80 hover:bg-brown-600'
            aria-label='Previous testimonial'
          >
            <span className='text-xl leading-none'>←</span>
          </button>
          <button
            type='button'
            onClick={handleNext}
            className='flex items-center justify-center w-10 h-10 transition bg-white rounded-full text-brown-800 hover:bg-gray-100'
            aria-label='Next testimonial'
          >
            <span className='text-xl leading-none'>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
