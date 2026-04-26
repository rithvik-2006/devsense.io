
# ⚡ DevSense — Autonomous AI for Your Codebase

> **Understand. Build. Fix. Ship.** > AI-powered terminal-native coding intelligence for developers who live in the CLI.

DevSense is an open-source AI coding system that helps you:
* **Understand** unfamiliar repositories instantly
* **Explain** files, architecture, and dependencies
* **Chat** with your codebase directly from the terminal
* **Toggle** between Cloud (Gemini/Mistral) or Local (Ollama) AI models
* **Scale** toward fully autonomous coding workflows

**👉 No IDE plugin | 👉 No editor lock-in | 👉 No context switching**

**🌐 Website:** [DEVSENSE](https://devsense-dev.vercel.app/)

---

## 🧠 What DevSense Can Do

### 🔎 Understand Any Codebase Instantly
Get architecture-aware answers using real repository context.
```bash
devsense ask "How does authentication work?"
```

### 📄 Explain Complex Files in Seconds
Understand purpose, dependencies, and logic without manual scrolling.
```bash
devsense explain src/auth.ts
```

### 🗺️ Map Your Project Architecture
Quickly locate core modules like Auth, API, Database, and Services.
```bash
devsense map
```

### 💬 Chat With Your Repository
Interactive AI-powered terminal chat built around your specific codebase.
```bash
devsense chat
```

---

## ⚡ Multi-Provider AI Support
Choose the backend that fits your workflow:

| **Cloud Providers** | **Local Providers (via Ollama)** |
| :--- | :--- |
| Gemini | Llama 3 / CodeLlama |
| Mistral | DeepSeek / Qwen |
| OpenAI (Planned) | Gemma / Mistral |

**Run Fully Local:**
```bash
devsense init
# Select Ollama -> Choose llama3
```

---

## 🚀 Why DevSense?
Most AI coding tools are trapped inside editors. DevSense is built for **Real Developers**:

* ✅ **Terminal-native:** Stays in your flow.
* ✅ **Repo-aware:** Understands the "big picture."
* ✅ **Privacy First:** Support for 100% offline local models.
* ✅ **Extensible:** Open-source architecture ready for custom analyzers.
* ✅ **Future-Proof:** Moving toward an autonomous "Claude Code" alternative.

---

## ⚙️ System Architecture
```text
User ➔ CLI Commands ➔ Project Scanner ➔ Analyzer ➔ Context Builder ➔ AI Provider Layer ➔ Response
```

---

## 🧩 Current Core Features

| Feature | Status |
| :--- | :--- |
| Repo Scanning & File Explanation | ✅ Complete |
| Architecture Mapping | ✅ Complete |
| Gemini / Mistral Support | ✅ Complete |
| Ollama Local AI Support | ✅ Complete |
| **Context DB (SQLite)** | 🚧 Phase 1 |
| **Tool Execution Layer** | 🚧 Planned |
| **Autonomous Coding Loop** | 🚧 Planned |

---

## 🚀 Quick Start

### 1. Install Globally
```bash
npm install -g devsense
```

### 2. Initialize Inside Your Project
```bash
devsense init
```

### 3. Configure Provider
* **For Cloud:** Add your key to `.devsense/.env` (e.g., `GEMINI_API_KEY=your_key`)
* **For Local:** Install [Ollama](https://ollama.com) and pull a model:
    ```bash
    ollama pull llama3
    ```

### 4. Start Using It
```bash
devsense summary
devsense ask "What does this project do?"
devsense explain src/server.ts
devsense chat
```

---

## 🛠️ Commands Reference

| Command | Description |
| :--- | :--- |
| `devsense init` | Initialize project configuration |
| `devsense summary` | Get a high-level project overview |
| `devsense ask "<q>"` | Ask questions about the repo |
| `devsense explain <f>` | Detailed explanation of a specific file |
| `devsense chat` | Open interactive repo chat |
| `devsense map` | Visualize project architecture |
| `devsense doctor` | Diagnose setup and model availability |

---

## 🗺️ Roadmap

* **Phase 0 ✅ Local AI:** Ollama integration and multi-backend support.
* **Phase 1 🚧 Context DB:** SQLite per-project memory and incremental scans.
* **Phase 2 🚧 Tool Layer:** Capability to read/write files and run terminal commands.
* **Phase 3 🚧 Diff Editing:** Safe patches and incremental code modifications.
* **Phase 4 🚧 Autonomous Agent:** Generate ➔ Execute ➔ Debug ➔ Retry loop.

---

## 🛠️ Build From Source
```bash
git clone https://github.com/your-repo/devsense
cd devsense
npm install
npm run build
npm link
```

---

## 🤝 Contributing & Support
We welcome feature requests, new provider integrations, and analyzer plugins!
1. Fork the repo.
2. Create your feature branch.
3. Submit a PR.

**If DevSense helps you, please star the repository ⭐**
