import type { TeamMember } from "@/types/cms";
import Image from "next/image";

interface Props {
  members: TeamMember[];
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function TeamSection({ members }: Props) {
  if (!members?.length) return null;

  return (
    <section id="team" className="max-w-6xl px-4 py-10 mx-auto">
      <h2 className="mb-6 text-2xl font-semibold">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {members.map((m) => {
          const rawUrl = m.Image?.url ?? "";
          const img = rawUrl.startsWith("http")
            ? rawUrl
            : rawUrl
            ? `${STRAPI_URL}${rawUrl}`
            : "";

          return (
            <div
              key={m.id}
              className="p-4 border rounded-lg bg-surface border-brown-700"
            >
              <div className="relative w-20 h-20 mb-3 overflow-hidden rounded-full">
                {img && (
                  <Image
                    fill
                    src={img}
                    alt={m.name}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                )}
              </div>
              <h3 className="font-semibold">{m.name}</h3>
              <p className="text-sm text-gray-400">{m.role}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
