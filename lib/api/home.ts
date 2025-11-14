import { cmsFetch } from "@/lib/cmsClient";
import type { Locale } from "@/store/slices/languageSlice";

export async function getHeroSlides(locale: Locale) {
  return cmsFetch(`/api/hero-slides?populate=*&locale=${locale}`);
}

export async function getTeamMembers(locale: Locale) {
  return cmsFetch(`/api/team-members?populate=*&locale=${locale}`);
}

export async function getClients(locale: Locale) {
  return cmsFetch(`/api/clients?populate=*&locale=${locale}`);
}
