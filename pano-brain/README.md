# Paño's brain: knowledge

Everything Paño, the red cat guide, knows about Phill, about Corner and Panela, and about how to show visitors around this site. All of it lives in one file, `knowledge.json`, which the brain loads.

## What's in `knowledge.json`

| Key | What it is |
| --- | --- |
| `persona` | Name, voice rules, greetings, idle nudges, fallbacks, sign-offs |
| `guardrails` | Hard rules: no invented facts, no private info, skip drafts |
| `facts` | Reference data: identity, contact, headline numbers, timeline, résumé versions, skills, tools, cats |
| `talk_topics` | 47 scripts Paño can talk through (46 ready, 1 draft) |
| `tours` | 11 things Paño can show on the page (5 existing + 6 new) |
| `menu` | What Paño offers when a visitor opens him |
| `needs_from_phill` | Placeholders still to fill in |

### A talk topic

```json
{
  "id": "case-reports",
  "category": "case-studies",
  "title": "1,000+ reports down to about 20",
  "triggers": ["reports", "1000 reports", "data models"],
  "script": ["bubble 1", "bubble 2", "bubble 3"],
  "follow_ups": ["checking-ai-work", "how-he-uses-ai"],
  "show": "tour:projects",
  "source": "index.html DOCS.reports"
}
```

- `triggers`: phrases a visitor might type or say. Use them for matching, or as hints for an LLM.
- `script`: one string per speech bubble. Show them in order. Only `<b>` tags are allowed.
- `follow_ups`: topic ids to offer as buttons after the script.
- `show` (optional): either `tour:<id>` to run a tour, or an `openTarget` key (`doc:reports`, `folder:ailab`, `app:resume`, `pdf:process`, `photo:0`, `mail:open`) to open it directly. Offer it as a "Show me" button.
- `status: "draft"`: has placeholders. Don't use it until Phill fills them in.

Categories: `about-phill`, `experience`, `case-studies`, `projects`, `ai`, `skills`, `kind-words`, `this-site`, `cats`, `pano`.

### A tour

Tours keep the shape of `TOURS` in `index.html`'s guide code (`say`, `target`, `done`, `act`, `next`), with the functions replaced by plain descriptors so they can live in JSON:

| Descriptor | Maps to the existing helper |
| --- | --- |
| `target.icon: "folder:projects"` | `iconFor_('folder:projects')` |
| `target.file: "Name", in: "projects"` | `explorerAt('projects') && fileNamed('Name')` |
| `target.css: "#clock"` | `$('#clock')` (add `when_window` to require `winOpen()` first) |
| `target.top_page: true` | `topPage()` |
| `target.window_el: "mail"` | `WINS.get('mail').el` |
| `done.window: "doc:reports"` | `winOpen('doc:reports')` |
| `done.any_window: [...]` | any of those `winOpen()` |
| `done.explorer: "projects"` | `explorerAt('projects')` |
| `done.css_visible: "#cal"` | element exists and isn't `hidden` |
| `act.open: "app:resume"` | `openTarget('app:resume', el)` |
| `act.click: "#clock"` | `$('#clock').click()` |
| `act.call: "..."` | a one-off call, as in the existing skills tour |

`existing: true` marks the five tours the cat already runs today: résumé, history, projects, skills, contact. The six new ones are availability (the clock calendar), announcement (the MarineMax message), hackathon photos, kind words, AI Lab, and the Recycle Bin secret.

## Rules for editing

- Sources: the homepage (`index.html`) is the source of truth for Phill's work. Older PDFs and pages are out of date.
- This repo is public. Never add addresses, phone numbers, family details, or anything from legal or personal documents. The cat facts here only cover the cats.
- Keep `id`s stable. Other topics and the menu refer to them.
- Validate after editing: `python3 -m json.tool pano-brain/knowledge.json > /dev/null`
