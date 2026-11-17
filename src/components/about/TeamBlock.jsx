import Image from "next/image";
import { team, visibleTeam } from "@/content/team";
import SectionHeader from "@/components/sections/SectionHeader";

// Renders nothing until real team members (name + role + photo) are added in src/content/team.js.
export default function TeamBlock({ index }) {
  const members = visibleTeam();
  if (members.length === 0) return null;
  return (
    <section aria-labelledby="team-h" className="container-x pb-[clamp(80px,12vw,176px)]">
      <SectionHeader index={index} eyebrow="Team" title={team.heading} id="team-h" />
      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <li key={m.name} data-reveal style={{ "--reveal-i": i % 3 }}>
            <div className="relative aspect-[4/5] overflow-hidden bg-mist">
              <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <h3 className="display-caps mt-5 text-h3">{m.name}</h3>
            <p className="mt-1 text-sm uppercase tracking-[0.14em] text-teal">{m.role}</p>
            {m.bio && <p className="mt-3 text-[15px] text-muted">{m.bio}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
