/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/api/services";
import type { Service } from "@/types/cms";
import type { Locale } from "@/store/slices/languageSlice";
import Image from "next/image";

function renderContent(content: unknown) {
  if (!content) {
    return (
      <p className="italic text-gray-500">
        No additional content available.
      </p>
    );
  }

  if (typeof content === "string") {
    return (
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (Array.isArray(content)) {
    return (
      <div className="space-y-4 prose prose-invert max-w-none">
        {content.map((block: any, i: number) => {
          const childrenText =
            block?.children
              ?.map((child: any) => child?.text ?? "")
              .join("") ?? "";

          switch (block.type) {
            case "paragraph":
              return <p key={i}>{childrenText}</p>;

            case "heading": {
              const level = block.level ?? 2;
              const Tag: any = `h${level}`;
              return <Tag key={i}>{childrenText}</Tag>;
            }

            case "quote":
              return (
                <blockquote key={i} className="pl-4 italic border-l-4">
                  {childrenText}
                </blockquote>
              );

            case "list": {
              const isOrdered = block.format === "ordered";
              const ListTag: any = isOrdered ? "ol" : "ul";
              return (
                <ListTag key={i} className="list-disc list-inside">
                  {block.children?.map((item: any, j: number) => {
                    const itemText =
                      item?.children
                        ?.map((child: any) => child?.text ?? "")
                        .join("") ?? "";
                    return <li key={j}>{itemText}</li>;
                  })}
                </ListTag>
              );
            }

            default:
              if (childrenText) {
                return <p key={i}>{childrenText}</p>;
              }
              return (
                <pre key={i} className="text-xs opacity-60">
                  {JSON.stringify(block, null, 2)}
                </pre>
              );
          }
        })}
      </div>
    );
  }
  return (
    <pre className="text-xs opacity-60">
      {JSON.stringify(content, null, 2)}
    </pre>
  );
}
export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;

  if (locale !== "en" && locale !== "ar") {
    return {};
  }

  const service: Service | null = await getServiceBySlug(
    locale as Locale,
    slug
  );

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

export default async function ServicePage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;

  // Locale validation
  if (locale !== "en" && locale !== "ar") {
    notFound();
  }

  const typedLocale = locale as Locale;
  const service: Service | null = await getServiceBySlug(typedLocale, slug);

  if (!service) {
    notFound();
  }
  const rawHeroUrl = service.heroImage?.url ?? "";
  const STRAPI_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const heroImgSrc = rawHeroUrl
    ? rawHeroUrl.startsWith("http")
      ? rawHeroUrl
      : `${STRAPI_BASE_URL}${rawHeroUrl}`
    : "";

  console.log("ENV STRAPI URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
  console.log("RAW HERO URL:", rawHeroUrl);
  console.log("FINAL HERO IMAGE SRC:", heroImgSrc);

  return (
    <article className="max-w-4xl px-4 py-10 mx-auto">
      {heroImgSrc && (
        <div className="relative w-full h-64 mb-6 overflow-hidden border rounded-lg border-brown-700">
          <Image
            src={heroImgSrc}
            alt={service.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <h1 className="mb-4 text-3xl font-semibold">{service.title}</h1>
      {service.shortDescription && (
        <p className="mb-6 text-gray-300">{service.shortDescription}</p>
      )}
      {renderContent(service.content)}
    </article>
  );
}
