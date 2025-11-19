# GitHub Copilot Instructions for Speckit Initializr

## Project Overview
This is a Node.js CLI tool (`@willh/speckit-initialzr`) used to quickly reconfigure the Speckit environment by switching between different AI assistants.

## Development Guidelines

### Workflow
1.  **Changelog**: Always update `CHANGELOG.md` with a brief description of changes under a new version header before committing.
2.  **Versioning**: After committing changes, always run `npm version patch` (or minor/major as appropriate).
3.  **Publishing**: Always publish the package immediately after versioning using `npm publish --access public`.

### Code Style & Dependencies
*   **Shell Operations**: Use `shelljs` for all shell commands to ensure cross-platform compatibility (Windows/Linux/macOS).
*   **User Input**: Use `inquirer` for all interactive prompts.
*   **Output**: Use `chalk` to colorize console output (e.g., red for errors, green for success, yellow for warnings/info).
*   **Entry Point**: The main script is `reconfigure-speckit.js`. Ensure it starts with `#!/usr/bin/env node`.

### Documentation
*   **Language**: `README.md` must be maintained in **Traditional Chinese (zh-tw)**.
*   **Package Metadata**: Ensure `package.json` fields (description, keywords, engines, files) are kept accurate and professional.

### Safety Checks
*   **Git Status**: The script should check if the git worktree is clean before proceeding to prevent data loss.
*   **Dependencies**: The script must verify that the `specify` CLI is installed and provide a helpful error message with a link to `https://github.com/github/spec-kit/` if missing.
