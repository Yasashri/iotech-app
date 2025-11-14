import { cmsFetch } from "@/lib/cmsClient";
import type { Locale } from "@/store/slices/languageSlice";

interface ListParams {
  locale: Locale;
  page?: number;
  pageSize?: number;
  query?: string;
}

export async function getServices({
  locale,
  page = 1,
  pageSize = 9,
  query
}: ListParams) {
  const searchFilter = query
    ? `&filters[title][$containsi]=${encodeURIComponent(query)}`
    : "";

  return cmsFetch(
    `/api/services?populate=*&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}${searchFilter}`
  );
}

export async function getServiceBySlug(locale: Locale, slug: string) {
  const data = await cmsFetch(
    `/api/services?populate=*&locale=${locale}&filters[slug][$eq]=${slug}`
  );
  return data?.data?.[0] ?? null;
}
