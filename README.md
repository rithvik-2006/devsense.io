# ⚡ DevSense — AI that understands your codebase

**Ask your repository anything — directly from your terminal.**

DevSense scans your project and gives instant AI answers about how your code works.

👉 No IDE plugin  
👉 No manual searching  
👉 Just your CLI

**Website:** [devsense.dev](https://devsense-dev.vercel.app/)

---
## 🧠 What DevSense Can Do

### 🔎 Understand Any Repo Instantly

Join a new project and ask:

```bash
devsense ask "How does authentication work?"
```

Get architecture-level answers using real project context.

---

### 📄 Explain Files in Seconds

```bash
devsense explain src/auth.ts
```

Understand complex files without reading hundreds of lines.

---

### 🗺️ Map Your Project Architecture

```bash
devsense map
```

Instantly locate:

* Auth
* API
* Database
* UI
* Utilities

---

### 💬 Chat With Your Codebase

```bash
devsense chat
```

Interactive AI session powered by your repo.

---

## ⚡ Quick Start (30 seconds)

Install globally:

```bash
npm install -g devsense
```

Initialize inside any project:

```bash
devsense init
```

Add your Gemini API key:

```
.devsense/.env
GEMINI_API_KEY=your_key
```

Start exploring:

```bash
devsense summary
devsense ask "What does this project do?"
```

---

## 🧩 Commands

| Command                     | Description            |
| --------------------------- | ---------------------- |
| `devsense init`             | Setup DevSense         |
| `devsense summary`          | Project overview       |
| `devsense ask "<question>"` | Ask your repo anything |
| `devsense explain <file>`   | Explain file purpose   |
| `devsense chat`             | Interactive session    |
| `devsense map`              | Project architecture   |
| `devsense doctor`           | Diagnose setup         |

---

## 🚀 Why DevSense?

Most AI tools live inside editors.

DevSense lives where developers already work:

✅ Terminal native  
✅ Repo-aware AI  
✅ Multi-language support  
✅ Zero IDE lock-in

Think:

**Cursor for your terminal.**

---

## 🧱 Supported Ecosystems

* Node.js
* Python
* Flutter
* Rust
* Extensible analyzer system

---

## 🛠️ Build From Source

```bash
git clone <repo>
cd devsense
npm install
npm run build
npm link
```

---

## ⭐ Contributing

⭐ **Trusted by early developers exploring AI-native workflows.**

Feedback, issues, and ideas are welcome.

If DevSense helped you, consider starring the repo ⭐

---

## 📜 License

ISC
