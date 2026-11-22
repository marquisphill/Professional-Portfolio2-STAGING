# Paño's brain: knowledge

Everything Paño, the red cat guide, knows. One shared core, plus a profile for each site he lives on.

| File | Loaded by | What's in it |
| --- | --- | --- |
| `core.json` | both sites | Persona, guardrails, facts (Phill's background, contact, Corner and Panela), 41 shared talk topics |
| `portfolio.json` | staging portfolio | Recruiter audience, greetings, 6 portfolio-only topics, 11 tours, menu. Scripts only, no Claude chat |
| `dashboard.json` | Personal-Dashboard | "The user" audience, dashboard facts, 13 dashboard topics, 6 tours, menu, cat preference, Claude chat mode |

Load `core.json`, then the site's profile. Topics from both are merged by `id`, and ids never collide. Profile values (greetings, fallbacks, menu) win over core where both exist.

Both sites can fetch these from the staging site:

```
https://marquisphill.github.io/Professional-Portfolio2-STAGING/pano-brain/core.json
https://marquisphill.github.io/Professional-Portfolio2-STAGING/pano-brain/dashboard.json
```

The dashboard already reads `labs.json` from the same place.

## Who Paño is talking to

- **Portfolio:** hiring managers and recruiters. He sells Phill's work, quickly and honestly.
- **Dashboard:** "the user", whoever holds the phone. Usually Phill, sometimes family. Paño says "you", never guesses a name, and talks about Phill in the third person. He's the expert on how the dashboard works and he loves talking about Corner and Panela (`cat_preference`).

Both sites know Phill's full professional background. Neither knows anything personal. That's a guardrail in `core.json`.

## Corner and Panela

`core.json → facts.cats` holds the only facts Paño has about them, and `known_limits` says so. The topic `cat-knowledge-limits` is Paño admitting it.

On the dashboard, when the scripts run out:
- **With a Claude token on the device**, Paño keeps chatting through Claude using `dashboard.json → claude_chat.system_prompt`. The brain fills `{{core.facts}}` and `{{dashboard.facts}}` with those JSON blocks. Claude may chat about cats in general and say when it's guessing. It never states a new fact about Corner or Panela as true.
- **Without a token**, Paño says that's all he knows for sure (`claude_chat.when_scripts_run_out.without_token`).

The portfolio has `claude_chat.enabled: false`, so scripts only.

## A talk topic

```json
{
  "id": "case-reports",
  "category": "case-studies",
  "title": "1,000+ reports down to about 20",
  "triggers": ["reports", "1000 reports", "data models"],
  "script": ["bubble 1", "bubble 2", "bubble 3"],
  "follow_ups": ["checking-ai-work", "how-he-uses-ai"],
  "show": { "portfolio": "tour:projects" },
  "source": "index.html DOCS.reports"
}
```

- `triggers`: phrases a visitor might type or say. Use them for matching, or as hints for an LLM.
- `script`: one string per speech bubble, shown in order. Only `<b>` tags are allowed.
- `follow_ups`: topic ids to offer as buttons afterward. All of them exist on both sites.
- `show`: keyed by site (core topics). In profile topics it's either a plain string or keyed by site.
  - `tour:<id>` runs a tour from the current profile.
  - On the portfolio, any `openTarget` key: `doc:reports`, `folder:ailab`, `app:resume`, `pdf:process`, `photo:0`, `mail:open`.
  - On the dashboard, `preview:home` loads the staging site in the Staging site card.
  - If the current site has no entry, follow the profile's `show_fallback`. On the dashboard, that pulls up the portfolio in the preview card.
- `status: "draft"`: skip it. There are none right now.

## A tour

Tours keep the shape of the existing `TOURS` code (`say`, `target`, `done`, `act`, `next`), with the functions turned into plain descriptors.

| Descriptor | Portfolio helper | Dashboard |
| --- | --- | --- |
| `target.icon: "folder:projects"` | `iconFor_('folder:projects')` | n/a |
| `target.file: "Name", in: "projects"` | `explorerAt('projects') && fileNamed('Name')` | n/a |
| `target.css: "#clock"` | `$('#clock')` (+ `when_window` → `winOpen()` first) | `$('#clkTime')` etc. |
| `target.top_page: true` | `topPage()` | n/a |
| `target.window_el: "mail"` | `WINS.get('mail').el` | n/a |
| `done.window` / `done.any_window` | `winOpen(id)` | n/a |
| `done.explorer: "projects"` | `explorerAt('projects')` | n/a |
| `done.css_visible: "#cal"` | element exists and isn't `hidden` | same |
| `act.open: "app:resume"` | `openTarget('app:resume', el)` | n/a |
| `act.click: "#wxRefresh"` | `$(sel).click()` | same |
| `act.focus: "#pvPage"` | n/a | `$(sel).focus()` |
| `act.call: "..."` | one-off call, as in the skills tour | n/a |
| `actLabel` | button text for the act shortcut | same |

`existing: true` marks tours that already run in code today:
- Portfolio: résumé, history, projects, skills, contact.
- Dashboard: launch, built as `launchSteps()`. It's listed by summary, not steps, because its steps depend on whether a token is saved.

New tours:
- Portfolio: availability, announcement, hackathon photos, kind words, AI Lab, Recycle Bin.
- Dashboard: quick tour, clock, weather, prototypes, staging preview.

## Rules for editing

- Phill's work: the portfolio homepage (`index.html`) is the source of truth. Older PDFs and pages are out of date.
- These files are public, served from the staging site. Never add addresses, phone numbers, family details, tokens, or anything from legal or personal documents.
- Keep `id`s stable and unique across `core.json` and both profiles.
- Validate after editing: `for f in pano-brain/*.json; do python3 -m json.tool "$f" > /dev/null || echo "bad: $f"; done`
