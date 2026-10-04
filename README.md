# ORYVAEL Web

Public website for [ORYVAEL](https://github.com/jellero/ORYVAEL), the AI-native operating system research project.

## Goals

The site is intentionally technical and evidence-led. It presents:

- the core thesis: intelligence is not authority;
- the native bare-metal runtime that exists today;
- the capability, verification and governance model;
- continuous AI-assisted security as a design direction;
- the path from kernel foundation to a governed application platform.

Claims should remain aligned with the public `PROJECT_STATUS.md` in the main ORYVAEL repository.

## Local preview

No build step or framework is required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html` — content and semantic structure
- `styles.css` — responsive visual system
- `script.js` — header state and reveal interactions

## Publishing

The repository is ready to be served as a static site by GitHub Pages, Cloudflare Pages, Netlify or any static web server.
