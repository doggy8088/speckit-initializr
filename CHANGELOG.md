# Changelog

All notable changes to this project will be documented in this file.

## [0.1.3] - 2025-11-21

### Added

- Added `--force` flag to skip git worktree clean check.

## [0.1.2] - 2025-11-21

### Fixed

- Replaced `shell.exec` with `child_process.execSync` to fix compatibility issues with Bun bundling (resolves `Error: Cannot find module .../exec-child.js`).

## [0.1.0] - 2025-11-21

### Added

- Initial release of speckit-initializr.
- CLI tool to reconfigure speckit environment.
- Prefer `uvx --from git+https://github.com/github/spec-kit.git specify init` when available, with fallback to `specify`.
- Added detailed README.md in Traditional Chinese.
- Added `--help`, `-v`, and `--version` flags support.
- Added check for `specify` CLI availability before running.
