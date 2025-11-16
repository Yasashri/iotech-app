/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { searchServices, searchTeams } from "@/lib/api/search";
import type { Locale } from "@/store/slices/languageSlice";

type PageParams = {
  locale: Locale;
};

type PageSearchParams = {
  query?: string;
  page?: string;
};

type PageProps = {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearchParams>;
};

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface StrapiResponse<T> {
  data: any[];
  meta?: {
    pagination?: Pagination;
  };
}

interface ServiceAttributes {
  title: string;
  slug: string;
  shortDescription?: string | null;
}

interface TeamAttributes {
  name: string;
  position?: string | null;
}

export default async function SearchPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { query: rawQuery = "", page: rawPage = "1" } = await searchParams;

  const query = rawQuery.trim();
  const currentPage = Number(rawPage) || 1;

  if (!query) {
    return (
      <div className="max-w-5xl px-4 py-12 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Search</h1>
        <p className="opacity-70">
          Please enter a search term using the search bar in the navigation.
        </p>
      </div>
    );
  }

  const [servicesRes, teamsRes] = await Promise.all([
    searchServices({ locale, page: currentPage, query }) as Promise<
      StrapiResponse<ServiceAttributes>
    >,
    searchTeams({ locale, page: currentPage, query }) as Promise<
      StrapiResponse<TeamAttributes>
    >
  ]);

  const servicesRaw = servicesRes?.data ?? [];
  const teamsRaw = teamsRes?.data ?? [];

  const normalizeService = (item: any): (ServiceAttributes & { id?: number }) | null => {
    if (!item) return null;
    const base = item.attributes ?? item;
    if (!base || !base.slug) return null;
    return { id: item.id, ...base };
  };

  const normalizeTeam = (item: any): (TeamAttributes & { id?: number }) | null => {
    if (!item) return null;
    const base = item.attributes ?? item;
    if (!base || !base.name) return null;
    return { id: item.id, ...base };
  };

  const services = servicesRaw
    .map(normalizeService)
    .filter((s): s is ServiceAttributes & { id?: number } => !!s);

  const teams = teamsRaw
    .map(normalizeTeam)
    .filter((t): t is TeamAttributes & { id?: number } => !!t);

  const servicesPagination = servicesRes?.meta?.pagination;
  const teamsPagination = teamsRes?.meta?.pagination;

  const pagination = servicesPagination ?? teamsPagination;
  const hasPrev = pagination ? pagination.page > 1 : false;
  const hasNext = pagination ? pagination.page < pagination.pageCount : false;

  const noResults = services.length === 0 && teams.length === 0;

  const buildPageHref = (page: number) =>
    `/${locale}/search?query=${encodeURIComponent(query)}&page=${page}`;

  return (
    <div className="max-w-6xl px-4 py-12 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        Search results for{" "}
        <span className="text-brown-400">&quot;{query}&quot;</span>
      </h1>

      {noResults && (
        <p className="text-lg opacity-70">No results found. Try another term.</p>
      )}

      {!noResults && (
        <div className="space-y-12">
          {/* TEAM RESULTS */}
          {teams.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Team Members</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {teams.map((t, idx) => (
                  <div
                    key={t.id ?? idx}
                    className="p-4 border rounded-lg bg-surface border-brown-700"
                  >
                    <h3 className="text-lg font-medium">{t.name}</h3>
                    {t.position && (
                      <p className="mt-1 text-sm opacity-70">{t.position}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SERVICE RESULTS */}
          {services.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Services</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {services.map((s, idx) => (
                  <Link
                    key={s.id ?? idx}
                    href={`/${locale}/services/${s.slug}`}
                    className="block p-5 transition border rounded-lg bg-surface border-brown-700 hover:bg-brown-800"
                  >
                    <h3 className="text-xl font-semibold">{s.title}</h3>
                    {s.shortDescription && (
                      <p className="mt-2 text-sm opacity-80">
                        {s.shortDescription}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* PAGINATION */}
          {pagination && pagination.pageCount > 1 && (
            <div className="flex items-center justify-center gap-4 pt-6">
              {hasPrev && (
                <Link
                  href={buildPageHref(pagination.page - 1)}
                  className="px-4 py-2 text-sm border rounded-lg border-brown-700 hover:bg-brown-800"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm opacity-80">
                Page {pagination.page} of {pagination.pageCount}
              </span>
              {hasNext && (
                <Link
                  href={buildPageHref(pagination.page + 1)}
                  className="px-4 py-2 text-sm border rounded-lg border-brown-700 hover:bg-brown-800"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
