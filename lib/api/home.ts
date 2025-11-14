import { cmsFetch } from "@/lib/cmsClient";
import type { Locale } from "@/store/slices/languageSlice";
import type { HeroSlide, TeamMember, Client } from "@/types/cms";

export async function getHeroSlides(locale: Locale) {
  return cmsFetch<{ data: HeroSlide[] }>(`/api/hero-slides?populate=*&locale=${locale}`);
}

export async function getTeamMembers(locale: Locale) {
  return cmsFetch<{ data: TeamMember[] }>(`/api/team-members?populate=*&locale=${locale}`);
}

export async function getClients(locale: Locale) {
  return cmsFetch<{ data: Client[] }>(`/api/clients?populate=*&locale=${locale}`);
}
