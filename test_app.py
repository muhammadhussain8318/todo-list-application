from pathlib import Path
import unittest

ROOT = Path(__file__).parent


class TodoApplicationChecks(unittest.TestCase):
    def test_frontend_files_exist(self):
        for filename in ("index.html", "styles.css", "app.js"):
            self.assertTrue((ROOT / filename).is_file(), filename)

    def test_html_references_assets_and_controls(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="styles.css"', html)
        self.assertIn('src="app.js"', html)
        self.assertIn('id="taskForm"', html)
        self.assertIn('id="taskList"', html)

    def test_javascript_contains_task_workflows(self):
        javascript = (ROOT / "app.js").read_text(encoding="utf-8")
        for workflow in ("addTask", "toggleTask", "deleteTask", "localStorage", "getVisibleTasks"):
            self.assertIn(workflow, javascript)

    def test_ci_workflow_checks_main_push(self):
        workflow = (ROOT / ".github" / "workflows" / "ci.yml").read_text(encoding="utf-8")
        self.assertIn("branches: [main]", workflow)
        self.assertIn("python -m unittest", workflow)


if __name__ == "__main__":
    unittest.main()
