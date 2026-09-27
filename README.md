# F2C website

Public website for F2C, the Fluid-to-Continuum Solver by Flow2C Simulation.

A static site (plain HTML, CSS and JavaScript, no build step). It deliberately contains no technical
detail about how F2C works; the product source lives in a separate private repository.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

## Publishing

Pushing to `main` deploys to GitHub Pages through `.github/workflows/pages.yml`.
One-time setup: in the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

© Flow2C Simulation (Flow to Coupled Simulation). All rights reserved.

## Citing F2C

See the **How to cite** section of the site, or [CITATION.cff](CITATION.cff) (GitHub shows it as *Cite this repository*).
