# Learning Hub

One static website: `index.html` is the home page that lists and launches every course. All files sit side by side,
so the links work as-is. No build step, no server code.

## Deploy on GitHub Pages
1. Put every file from this folder at the **root** of your repo (replace the old files; keep `.nojekyll`).
2. Repo -> Settings -> Pages -> Source: *Deploy from a branch* -> Branch: `main` / `(root)` -> Save.
3. Open `https://<your-username>.github.io/<repo-name>/`.

## Deploy on Netlify
Drag this folder onto https://app.netlify.com/drop, or connect the repo with *Build command* empty and *Publish directory* `.`.

## On your phone
Open the site in Safari (iPhone) or Chrome (Android) -> Share/menu -> **Add to Home Screen**. After the first visit
the courses open offline (each course needs internet once to fetch its editor/engine).

## Files
- `index.html` hub, `sw.js` offline cache, `manifest.webmanifest` + `icon-*.png` home-screen app
- `dsa-course.html`, `sql-databases-course.html`, `js-fundamentals-course.html`, `python-fundamentals-course.html`
- `course-site.html`, `course-2-devops.html`, `course-3-ai-llm.html`, `course-4-react-systems.html` (12-week tracks)

Progress is saved per browser (localStorage). Use one address consistently (not both `www` and non-`www`).
To add a course later: drop its `.html` next to `index.html`, add an entry to the `COURSES` list in `index.html`,
and add the filename to `CORE` in `sw.js`.
