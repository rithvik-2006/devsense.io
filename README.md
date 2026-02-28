# DevSense

**Developer Intelligence CLI** — understand your codebase and get answers using AI.

**Website:** [devsense.dev](https://devsense.dev)

---

## Features

- **Repo awareness** — Scan and analyze project structure, language, frameworks, and databases
- **Multi-ecosystem** — Node, Flutter, Python, Rust (and more via ecosystem detection)
- **AI-powered** — Ask questions, explain files, or chat interactively (Gemini)
- **Project map** — See where auth, API, UI, and database live in your repo

---

## Install

```bash
npm install -g devsense
# or
npm link
```

---

## Quick start

```bash
# In any project
devsense init
```

Add your Gemini API key to `.devsense/.env`:

```
GEMINI_API_KEY=your_key
```

Then:

```bash
devsense summary                    # Project overview
devsense ask "How does auth work?"  # Ask about the codebase
devsense explain src/auth.ts        # Explain a file
devsense chat                       # Interactive session
devsense map                        # Project structure map
devsense doctor                     # Check setup
```

---

## Commands

| Command | Description |
|---------|-------------|
| `devsense` | Show welcome and commands |
| `devsense init` | Initialize DevSense in the project |
| `devsense summary` | Show language, frameworks, databases, file count |
| `devsense ask "<question>"` | Ask a question about the repo (streaming) |
| `devsense explain <file>` | AI explanation of a file |
| `devsense chat` | Interactive AI chat |
| `devsense map` | Map directories (Auth, API, UI, etc.) |
| `devsense doctor` | Run diagnostics |

---

## Build from source

```bash
git clone <repo>
cd devsense
npm install
npm run build
npm link
```

---

## License

ISC
