// ─────────────────────────────────────────────────────────────────────────────
// OPTIONAL founder / team block for the About page.
//
// The block stays HIDDEN until at least one entry below has a real name, role
// and photo. Do not add placeholder people ("Name Surname") here: they would be shown.
//
// Entry shape:
//   { name: "Full Name", role: "Founder", photo: "/media/team/full-name.jpg", bio: "Optional, client-approved." }
// ─────────────────────────────────────────────────────────────────────────────

export const team = {
  heading: "The people behind the frame", // DRAFT heading, shown only when the block is visible
  members: [],
};

export function visibleTeam() {
  return team.members.filter((m) => m.name && m.role && m.photo);
}
