# Phillip Da Silva-Marquis · Portfolio

My personal portfolio site. I'm a Product Manager at MarineMax Superyacht Services, where I own YachtIQ, the listing management system yacht brokers at Northrop & Johnson and Fraser use. Before that: ten years between the business and the build, across retail, ecommerce, fintech, and enterprise modernization.

The site is built for hiring managers, recruiters, and anyone curious about how I work.

- **Live site:** [marquisphill.github.io/Professional-Portfolio2](https://marquisphill.github.io/Professional-Portfolio2/)
- **Staging (preview of upcoming changes):** [marquisphill.github.io/Professional-Portfolio2-STAGING](https://marquisphill.github.io/Professional-Portfolio2-STAGING/)

---

## What's on the site

The homepage is a desktop you can click around, with folders and windows instead of scrolling sections.

- **Read me first:** a short intro to who I am and what I do.
- **Experience:** one file per role, from MarineMax back through CITY Home, FlexShopper, and Pet Supermarket.
- **Projects:** case studies with the headline result up front.
- **AI Lab:** how I use AI in real work, like the BRD Q&A Skill I built for searching requirements documents.
- **Skills:** a control panel of tools and methods.
- **Kind Words:** recommendations from people I've worked with.
- **Résumé:** pick the version that fits the role you're hiring for, then preview or download it.
- **Contact:** ways to reach me or book time.
- **Paño:** a small red cat who offers guided tours of the site.

### Direct links

Add one of these to the end of the site address to open a window right away:

`#resume` · `#contact` · `#skills` · `#experience` · `#projects` · `#ailab` · `#kind-words` · `#readme`

Example: [marquisphill.github.io/Professional-Portfolio2/#resume](https://marquisphill.github.io/Professional-Portfolio2/#resume)

### Other pages

- **Hackathon** (`hackathon.html`): what my team built at the South Florida Tech Hub Hackathon, and what I learned.
- **Labs** (`labs.html`): prototypes of new features before they're added to the site. Prototypes use sample data: any numbers in them are made up, not real results.

---

## Project structure

```
.
├── index.html             # Homepage: the desktop, its windows, and Paño
├── hackathon.html         # Hackathon case study
├── labs.html              # Labs index, built from labs.json
├── labs.json              # List of prototypes (also read by my personal dashboard)
├── labs/                  # Prototype pages
├── pano-brain/            # Paño's knowledge: core facts, tours, and talk topics
├── resumes/               # Résumé versions offered in the Résumé window
├── images/                # Photos and social preview images
└── .claude/skills/        # Instructions Claude follows when building prototypes
```

It's a static site: plain HTML, CSS, and JavaScript, with no build step. GitHub Pages serves it straight from the `main` branch.

---

## How changes ship

1. New features start as prototypes on the **staging** site, under `labs/`.
2. I review them there.
3. Once approved, staging is copied over to the live site.

---

## Running it locally

```bash
git clone https://github.com/marquisphill/Professional-Portfolio2.git
cd Professional-Portfolio2
python3 -m http.server 8000
```

Then open http://localhost:8000. A local server is needed (rather than opening the file directly) because some parts load JSON files.

---

## Credits

Desktop wallpaper: photo by Pine Watt on [Unsplash](https://unsplash.com/).

---

## Contact

- [LinkedIn](https://www.linkedin.com/in/phillip-marquis-7661a8107/)
- Email: marquisphill@yahoo.com
