# My Planetary Responsibility: SOLVE

An interactive presentation website about my five strengths (Detail-Oriented, Analytical, Persistent, Curious and Organized) and the technology careers they point toward.

**Live site:** *add your GitHub Pages link here after publishing*

---

## About the presentation

To me, SOLVE means seeing problems as puzzles and using my strengths to understand them, find solutions and create a positive impact. The presentation has nine slides:

| # | Slide | Related careers |
|---|-------|-----------------|
| 01 | My Planetary Responsibility: SOLVE | — |
| 02 | What SOLVE Means to Me | — |
| 03 | Feedback That Confirmed My Strengths | — |
| 04 | Gift 1: Detail-Oriented | QA Analyst / Software Tester, Data Quality Analyst |
| 05 | Gift 2: Analytical | Business Intelligence Analyst, Business Analyst |
| 06 | Gift 3: Persistent | Software Developer, Systems Analyst |
| 07 | Gift 4: Curious | Data Analyst, Research Analyst |
| 08 | Gift 5: Organized | Project Coordinator, Operations Analyst |
| 09 | Bringing It All Together | — |

## How to navigate

| Action | Control |
|--------|---------|
| Next slide | → arrow, Space, Page Down, or the → button |
| Previous slide | ← arrow, Shift + Space, Page Up, or the ← button |
| First / last slide | Home / End |
| Jump to a slide | Click a dot in the bottom-left corner |
| Jump to a gift | Click a strength card on slide 2 |
| Fullscreen | The ⛶ button or the **F** key (Esc to exit) |
| Phone or tablet | Swipe left or right to change slides, scroll up or down to read |

Each slide has its own link, for example `index.html#slide-6` opens Gift 3.

## View it on your computer

1. Download or unzip the `solve-presentation` folder.
2. Double-click `index.html`. It opens in your browser.

You don't need to install anything. You need an internet connection only to load the Inter and Poppins fonts. Without one, the page uses similar standard fonts.

To preview it the way a web server would show it (optional, requires Python):

```bash
cd solve-presentation
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish with GitHub Pages

1. Create a new **public** repository on GitHub.
2. Upload `index.html`, `styles.css`, `script.js`, `README.md` and the `images` folder to the root of the repository.
3. Go to **Settings → Pages**, set the source to **Deploy from a branch**, then choose **main** and **/(root)**. Click **Save**.
4. After a minute or two, the site is live at `https://<your-username>.github.io/<repository-name>/`.

All file paths are relative, so the site works the same locally and on GitHub Pages. No build step is needed.

## Project structure

```
solve-presentation/
├── index.html    # Slide content and structure (semantic HTML)
├── styles.css    # Layout, colours, typography, animations, responsive rules
├── script.js     # Navigation, keyboard, swipe, progress, fullscreen
├── README.md
└── images/
    ├── slide1.png  # Hiker on a mountain summit at sunset
    ├── slide2.png  # SOLVE notebook checklist
    ├── slide3.png  # Mentorship desk with feedback notes
    ├── slide4.png  # Magnifying glass over code
    ├── slide5.png  # Completing a colourful puzzle
    ├── slide6.png  # Climbing a ridge at sunrise
    ├── slide7.png  # Experimenting with electronics
    ├── slide8.png  # Organizing a Kanban board
    └── slide9.png  # Alpine signpost: New Skills, Growth, Opportunities, Impact, My Future
```

## Built with

- HTML5, CSS3 and vanilla JavaScript. No frameworks or dependencies.
- [Inter](https://fonts.google.com/specimen/Inter) and [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts.
- [Lucide](https://lucide.dev) icon shapes (ISC licence), embedded as inline SVG.

### Design

| Element | Colour |
|---------|--------|
| Main text | Dark navy `#14213D` |
| SOLVE | Deep forest green `#1F4D3A` |
| Background | Warm ivory `#FBF7EF` |
| Gift 1 · Detail-Oriented | Blue `#2C5F8A` |
| Gift 2 · Analytical | Forest green `#2E6B4F` |
| Gift 3 · Persistent | Amber `#93560D` |
| Gift 4 · Curious | Rose `#A03F5B` |
| Gift 5 · Organized | Purple `#5A3F8C` |

### Accessibility

- Works with a keyboard, with visible focus outlines and labelled buttons.
- Every photo has descriptive alt text.
- Screen readers announce the current slide number, and hidden slides are skipped.
- Animations are turned off for anyone whose device is set to reduce motion.
- On small screens the layout stacks vertically and scrolls, so no text is cut off.

## Editing

- **Change text:** edit the matching `<section id="slide-N">` in `index.html`.
- **Change a photo:** replace `images/slideN.png` with a new image of the same name. Wide (16:9) images work best.
- **Change colours:** edit the variables at the top of `styles.css` (`:root { … }`).

---

© 2026 Mariia Kit · i.c.stars
