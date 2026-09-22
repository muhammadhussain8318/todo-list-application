# Done Today - To-Do List Application

A small, responsive to-do list built with HTML, CSS, and JavaScript. Tasks are stored in browser `localStorage`, so the list remains available after refreshing the page.

## Run locally

Open `index.html` in a browser. For a local server, use any static file server, then visit its local URL.

## Test locally

```powershell
python -m unittest discover -v
```

## GitHub delivery

- `.github/workflows/ci.yml` runs tests on pushes and pull requests targeting `main`.
- `.github/workflows/deploy.yml` publishes the site with GitHub Pages after pushes to `main`.
