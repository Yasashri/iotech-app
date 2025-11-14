import type { TeamMember } from "@/types/cms";
import Image from "next/image";

interface Props {
  members: TeamMember[];
}

export default function TeamSection({ members }: Props) {
  if (!members?.length) return null;

  return (
    <section id="team" className="max-w-6xl px-4 py-10 mx-auto">
      <h2 className="mb-6 text-2xl font-semibold">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {members.map((m) => {
          const img = m.attributes.image?.data?.attributes?.url ?? "";
          return (
            <div
              key={m.id}
              className="p-4 border rounded-lg bg-surface border-brown-700"
            >
              <div className="w-20 h-20 mb-3 overflow-hidden rounded-full">
                {img && (
                  <Image
                    src={img}
                    alt={m.attributes.name}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <h3 className="font-semibold">{m.attributes.name}</h3>
              <p className="text-sm text-gray-400">
                {m.attributes.role}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
