import { cmsFetch } from "@/lib/cmsClient";
import type { Locale } from "@/store/slices/languageSlice";
import type { Service } from "@/types/cms";

interface ListParams {
  locale: Locale;
  page?: number;
  pageSize?: number;
  query?: string;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// GET LIST OF SERVICES
export async function getServices({
  locale,
  page = 1,
  pageSize = 9,
  query
}: ListParams): Promise<{
  items: Service[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}> {
  const searchFilter = query
    ? `&filters[title][$containsi]=${encodeURIComponent(query)}`
    : "";

  const res: StrapiListResponse<Service> = await cmsFetch(
    `/api/services?populate=*&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}${searchFilter}`
  );

  return {
    items: res.data ?? [],
    pagination: res.meta?.pagination ?? {
      page,
      pageSize,
      pageCount: 1,
      total: res.data?.length ?? 0
    }
  };
}

// GET SINGLE SERVICE BY SLUG
export async function getServiceBySlug(
  locale: Locale,
  slug: string
): Promise<Service | null> {
  const res: StrapiListResponse<Service> = await cmsFetch(
    `/api/services?populate=*&locale=${locale}&filters[slug][$eq]=${slug}`
  );

  const entry = res?.data?.[0];
  if (!entry) return null;

  return entry;
}
