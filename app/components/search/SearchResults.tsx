import type { SearchTab } from "@/store/slices/searchSlice";

interface ServiceItem {
  id: number;
  attributes?: {
    title?: string;
    shortDescription?: string;
  };
}

interface TeamItem {
  id: number;
  attributes?: {
    name?: string;
    role?: string;
  };
}

interface Props {
  activeTab: SearchTab;
  services: ServiceItem[];
  teams: TeamItem[];
}

export default function SearchResults({
  activeTab,
  services,
  teams
}: Props) {
  if (activeTab === "services") {
    if (!services?.length) {
      return <p className="text-sm text-gray-400">No services found.</p>;
    }
    return (
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.id}
            className="p-4 border rounded bg-surface border-brown-700"
          >
            <h3 className="mb-1 font-semibold">
              {s.attributes?.title}
            </h3>
            <p className="text-xs text-gray-400">
              {s.attributes?.shortDescription}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (!teams?.length) {
    return <p className="text-sm text-gray-400">No team members found.</p>;
  }
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-3">
      {teams.map((t) => (
        <div
          key={t.id}
          className="p-4 border rounded bg-surface border-brown-700"
        >
          <h3 className="mb-1 font-semibold">
            {t.attributes?.name}
          </h3>
          <p className="text-xs text-gray-400">
            {t.attributes?.role}
          </p>
        </div>
      ))}
    </div>
  );
}
