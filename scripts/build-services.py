"""Regenerates src/content/services.js from the client workbook.

Run from the repo root:
  python scripts/build-services.py "Docs/Monara productions_Service_Categorization_final.xlsx" [changes.json]

Raw workbook wording is kept in `raw` / `rawTitle` fields; `label` / `title` is the on-screen version
(Title Case, obvious typos fixed). The optional second argument writes a list of label changes.
"""
import json
import re
import sys

import openpyxl

SRC = sys.argv[1]
wb = openpyxl.load_workbook(SRC, data_only=True)


def clean(s):
    if s is None:
        return None
    s = str(s).replace("\t", " ")
    paras = [re.sub(r"\s+", " ", p).strip() for p in re.split(r"\n\s*\n", s)]
    return "\n\n".join(p for p in paras if p)


# ---------- Title Case for on-screen labels ----------
MINOR = {"and", "or", "of", "the", "to", "for", "in", "on", "a", "an", "with", "at", "by", "vs", "etc", "sec"}
OVERRIDES = {  # obvious typos / brand capitalisation (raw wording stays in the data)
    "Video editing- Reels, youtube videos etc": "Video Editing – Reels, YouTube Videos etc.",
}


def cap_word(w, force):
    if not w:
        return w
    # leave acronyms, brands, numbers and A+ untouched
    if any(c.isupper() for c in w[1:]) or any(c.isdigit() for c in w) or w.startswith("A+"):
        return w
    if not force and w.lower() in MINOR:
        return w.lower()
    return w[0].upper() + w[1:]


def cap_token(tok, first):
    m = re.match(r"^([(\[]*)(.*?)([)\],.]*)$", tok)
    pre, core, post = m.groups()
    out = []
    for i, part in enumerate(core.split("/")):
        hy = part.split("-")
        if len(hy) > 1 and len(hy[0]) == 1:  # "E-commerce" stays "E-commerce"
            out.append("-".join([cap_word(hy[0], True)] + hy[1:]))
            continue
        words = []
        for j, h in enumerate(hy):
            # first word, first word after "(" or "/", and first/last parts of a hyphenated compound
            compound_edge = len(hy) > 1 and j in (0, len(hy) - 1)
            force = (first and i == 0 and j == 0) or (j == 0 and (pre or i > 0)) or compound_edge
            words.append(cap_word(h, force))
        out.append("-".join(words))
    return pre + "/".join(out) + post


def title_case(raw):
    s = clean(raw)
    if s in OVERRIDES:
        return OVERRIDES[s]
    return " ".join(cap_token(t, i == 0) for i, t in enumerate(s.split(" ")))


# ---------- Tab 1: Pillar -> Topic 1 -> Topic 2 -> Service ----------
ws = wb["Service Categorization"]
topics, order = {}, []
pillar = topic = topic2 = None
for r in ws.iter_rows(min_row=5, values_only=True):
    a, b, c, d, e = (list(r) + [None] * 5)[:5]
    if a:
        pillar = clean(a)
    if b:
        topic, topic2 = clean(b), None
        topics[topic] = {"pillar": pillar, "description": clean(c), "subgroups": [], "services": []}
        order.append(topic)
    if d:
        topic2 = clean(d)
        topics[topic]["subgroups"].append({"raw": topic2, "services": []})
    if e and topic:
        svc = {"raw": str(e), "label": title_case(e)}
        if clean(e) == "Claude AI campaign":
            svc["hidden"] = True
            svc["note"] = "Hidden until the client clarifies this service (Claude is not an ad platform)."
        target = topics[topic]["subgroups"][-1]["services"] if topic2 else topics[topic]["services"]
        target.append(svc)


def group(raw_topic):
    t = topics[raw_topic]
    g = {"raw": raw_topic, "title": title_case(raw_topic), "description": t["description"], "workbookPillar": t["pillar"]}
    if t["subgroups"]:
        g["subgroups"] = [{"raw": s["raw"], "title": title_case(s["raw"]), "services": s["services"]} for s in t["subgroups"]]
    else:
        g["services"] = t["services"]
    return g


# ---------- Sheet3: capabilities (structure + wording) ----------
rows = list(wb["Sheet3"].iter_rows(values_only=True))
start = next(i for i, r in enumerate(rows) if r[0] and "OUR CAPABILITIES" in str(r[0]))
caps = []
for r in rows[start + 1:]:
    if r[0] and "LET'S CREATE" in str(r[0]).upper():
        break
    if r[0] and "→" in str(r[0]) and r[1]:
        caps.append({"rawTitle": str(r[0]), "title": clean(r[0]).replace("→", "").strip(), "summary": clean(r[1])})

MAP = {  # approved mapping (Option A, 2026-11-16)
    "360° Campaigns": {"slug": "360-campaigns", "children": ["photography", "video-and-film", "post-production"], "groups": []},
    "Photography": {"slug": "photography", "parent": "360-campaigns", "groups": ["Photography"]},
    "Video & Film": {"slug": "video-and-film", "parent": "360-campaigns", "groups": ["Video & Film"]},
    "Post-Production": {"slug": "post-production", "parent": "360-campaigns", "groups": ["Post-Production"]},
    "Smart Tech": {"slug": "smart-tech", "groups": ["AI Video & Film", "AR / VR & Immersive", "3D & Visualization", "AI Content Creation", "Product & Retail Video", "Creator & IP Studio", "Assets & Niches"]},
    "Creative & Brand": {"slug": "creative-and-brand", "groups": [], "awaitingServices": True},
    "Strategy & Consulting": {"slug": "strategy-and-consulting", "groups": ["Brand & Strategy"]},
    "Digital Marketing": {"slug": "digital-marketing", "groups": ["Social & Influencer", "Organic & SEO"]},
    "Paid Media & Performance Marketing": {"slug": "paid-media-and-performance-marketing", "groups": ["Paid Media", "AI Campaigns"]},
}
out = []
for c in caps:
    m = MAP[c["title"]]
    entry = {"slug": m["slug"], "title": c["title"], "rawTitle": c["rawTitle"], "summary": c["summary"]}
    for k in ("parent", "children", "awaitingServices"):
        if k in m:
            entry[k] = m[k]
    entry["groups"] = [group(g) for g in m["groups"]]
    out.append(entry)

missing = [t for t in order if t not in {g for m in MAP.values() for g in m["groups"]}]
assert not missing, f"Unmapped workbook topics: {missing}"

HEADER = """// AUTO-GENERATED by scripts/build-services.py from the client workbook.
// Structure + wording: tab "Sheet3" (capabilities). Service lists: tab "Service Categorization".
// `raw` / `rawTitle` = exact workbook wording. `label` / `title` = on-screen version (Title Case, obvious typos fixed).
// Services with `hidden: true` stay in the data but are not shown on the site.

"""
with open("src/content/services.js", "w", encoding="utf-8") as f:
    f.write(HEADER + "export const capabilities = " + json.dumps(out, ensure_ascii=False, indent=2) + ";\n")

changes = []
for c in out:
    for g in c["groups"]:
        items = [(g["raw"], g["title"])] + [(s["raw"], s["title"]) for s in g.get("subgroups", [])]
        svcs = g.get("services", []) + [x for s in g.get("subgroups", []) for x in s["services"]]
        items += [(s["raw"].strip(), s["label"]) for s in svcs]
        changes += [(a, b) for a, b in items if a != b]
if len(sys.argv) > 2:
    with open(sys.argv[2], "w", encoding="utf-8") as f:
        json.dump(changes, f, ensure_ascii=False, indent=1)
total = sum(len(g.get("services", [])) + sum(len(s["services"]) for s in g.get("subgroups", [])) for c in out for g in c["groups"])
print(len(out), "capabilities;", total, "services;", len(changes), "label changes")
