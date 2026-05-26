# Agent Instructions

## Absolute Prohibitions

- **NEVER** remove, delete, or gitignore any existing data files, model files, or large binary files (e.g. `.npy`, `.pt`, `.png`, `.pkl`, `.h5`, `.csv` data files) from the repository unless explicitly asked by the user.
- **NEVER** modify `.gitignore` to exclude already-tracked data/model files without explicit user permission.
- **NEVER** commit deletions of data or model files without explicit user permission.
- When in doubt, ask the user before removing or ignoring any files.

## General Guidelines

- Always ask before making changes that affect tracked files in the repository.
- Do not make assumptions about which files should or should not be tracked.
