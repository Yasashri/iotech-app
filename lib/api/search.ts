import { cmsFetch } from "@/lib/cmsClient";
import type { Locale } from "@/store/slices/languageSlice";

interface SearchParams {
  locale: Locale;
  page?: number;
  pageSize?: number;
  query?: string;
}

export async function searchServices(params: SearchParams) {
  const { locale, page = 1, pageSize = 4, query = "" } = params;
  
  return cmsFetch(
    `/api/services?populate=*&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[title][$containsi]=${encodeURIComponent(
      query
    )}`
  );
}

export async function searchTeams(params: SearchParams) {
  const { locale, page = 1, pageSize = 9, query = "" } = params;
  return cmsFetch(
    `/api/team-members?populate=*&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[name][$containsi]=${encodeURIComponent(
      query
    )}`
  );
}
