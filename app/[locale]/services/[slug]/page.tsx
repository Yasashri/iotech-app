import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/api/services";
import type { Service } from "@/types/cms";
import type { Locale } from "@/store/slices/languageSlice";
import Image from "next/image";

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;

  if (locale !== "en" && locale !== "ar") {
    return {};
  }

  const service: Service | null = await getServiceBySlug(locale as Locale, slug);

  if (!service) {
    return {
      title: "Service Not Found"
    };
  }

  return {
    title: service.title,
    description: service.shortDescription || ""
  };
}

export default async function ServicePage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;

  // Locale validation
  if (locale !== "en" && locale !== "ar") {
    notFound();
  }
  const typedLocale = locale as Locale;

  // Fetch service by slug
  const service: Service | null = await getServiceBySlug(typedLocale, slug);

  if (!service) {
    notFound();
  }

  const attrs = service;
  const heroImg =
    attrs.heroImage?.data?.attributes?.url ?? "";

  return (
    <article className="max-w-4xl px-4 py-10 mx-auto">
      {/* HERO IMAGE */}
      {heroImg && (
        <div className="w-full h-64 mb-6 overflow-hidden border rounded-lg border-brown-700">
          <Image
            src={heroImg}
            alt={attrs.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* TITLE */}
      <h1 className="mb-4 text-3xl font-semibold">{attrs.title}</h1>

      {/* SHORT DESCRIPTION */}
      {attrs.shortDescription && (
        <p className="mb-6 text-gray-300">{attrs.shortDescription}</p>
      )}

      {/* RICH CONTENT */}
      {attrs.content ? (
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: attrs.content }}
        />
      ) : (
        <p className="italic text-gray-500">No additional content available.</p>
      )}
    </article>
  );
}
