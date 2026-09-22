# Done Today - To-Do List Application

A small, responsive to-do list built with HTML, CSS, and JavaScript. Tasks are stored in browser `localStorage`, so the list remains available after refreshing the page.

Repository: https://github.com/muhammadhussain8318/todo-list-application

Live site: https://muhammadhussain8318.github.io/todo-list-application/

## Run locally

Open `index.html` in a browser. For a local server, run:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Test locally

```powershell
python -m unittest discover -v
```

## GitHub delivery

- `.github/workflows/ci.yml` runs the Python checks and verifies the frontend assets on pushes and pull requests targeting `main`.
- `.github/workflows/deploy.yml` publishes the site with GitHub Pages after pushes to `main`.
- GitHub Pages must be enabled once under **Settings > Pages > Source > GitHub Actions**.

## Project history

1. Initial to-do application structure
2. Add task management features
3. Add tests and delivery workflows

The application supports adding, searching, filtering, completing, deleting, and clearing completed tasks. Data is saved locally in the browser under the `done-today-tasks` storage key.
