import type { Client } from "@/types/cms";
import Image from "next/image";

interface Props {
  clients: Client[];
}

export default function ClientsSection({ clients }: Props) {
  if (!clients?.length) return null;

  return (
    <section id="clients" className="max-w-6xl px-4 py-10 mx-auto">
      <h2 className="mb-6 text-2xl font-semibold">Our Clients</h2>
      <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-4">
        {clients.map((c) => {
          const logo = c.attributes.logo?.data?.attributes?.url ?? "";
          return (
            <div
              key={c.id}
              className="flex items-center justify-center p-3 border rounded-lg bg-surface border-brown-700"
            >
              {logo && (
                <Image src={logo} alt={c.attributes.name} className="object-contain max-h-12"/>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
