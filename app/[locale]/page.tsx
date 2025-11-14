/* import { getHeroSlides, getTeamMembers, getClients } from "@/lib/api/home"; */
/* import HeroSection from "@/app/components/sections/HeroSection";
import TeamSection from "@/app/components/sections/TeamSection";
import ClientsSection from "@/app/components/sections/ClientsSection"; */
import type { Locale } from "@/store/slices/languageSlice";
import { notFound } from "next/navigation";

type PageParams = Promise<{ locale: string }>;

export default async function HomePage({
  params
}: {
  params: PageParams;
}) {
  const { locale } = await params;

  if (locale !== "en" && locale !== "ar") {
    notFound();
  }
  const typedLocale = locale as Locale;

/*   const [hero, team, clients] = await Promise.all([
    getHeroSlides(typedLocale),
    getTeamMembers(typedLocale),
    getClients(typedLocale)
  ]); */

  return (
    <>
{/*       <HeroSection slides={hero.data} />
      <TeamSection members={team.data} />
      <ClientsSection clients={clients.data} /> */}
      <div>Home</div>
    </>
  );
}
