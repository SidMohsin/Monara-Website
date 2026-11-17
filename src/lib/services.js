import { capabilities } from "@/content/services";

export { capabilities };

export function getCapability(slug) {
  return capabilities.find((c) => c.slug === slug);
}

/** Visible services of a group (hidden ones such as "Claude AI campaign" are excluded). */
export function visibleServices(list = []) {
  return list.filter((s) => !s.hidden);
}

/** Groups with hidden services removed; sub-groups preserved. */
export function visibleGroups(cap) {
  return cap.groups.map((g) => ({
    ...g,
    services: g.services ? visibleServices(g.services) : undefined,
    subgroups: g.subgroups?.map((s) => ({ ...s, services: visibleServices(s.services) })),
  }));
}

export function serviceCount(cap) {
  return visibleGroups(cap).reduce(
    (n, g) => n + (g.services?.length || 0) + (g.subgroups?.reduce((m, s) => m + s.services.length, 0) || 0),
    0,
  );
}

/** Flat list of visible service labels (used for chips on overview pages). */
export function serviceLabels(cap) {
  return visibleGroups(cap).flatMap((g) => [
    ...(g.services || []).map((s) => s.label),
    ...(g.subgroups || []).flatMap((s) => s.services.map((x) => x.label)),
  ]);
}

export function neighbours(slug) {
  const i = capabilities.findIndex((c) => c.slug === slug);
  return {
    prev: capabilities[(i - 1 + capabilities.length) % capabilities.length],
    next: capabilities[(i + 1) % capabilities.length],
  };
}

export const pad = (n) => String(n).padStart(2, "0");
