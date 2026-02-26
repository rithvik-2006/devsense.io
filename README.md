DevSense:

DevSense is a **Developer Intelligence Command-Line Interface (CLI) tool** built with TypeScript. Its primary purpose is to provide insights into software projects, detect project characteristics, and leverage Google's Gemini AI to answer questions, explain code, and facilitate conversations about a codebase.

Here's a detailed breakdown of the project:

### 1. Core Purpose & Vision

DevSense aims to be a "Developer Intelligence CLI" that offers:
*   **Repo Awareness**: Understanding the structure and content of a project.
*   **Multi-Framework Detection**: Identifying the language, frameworks, and databases used in a project.
*   **Gemini AI Ready**: Integrating with Google's Gemini AI for intelligent assistance.

It presents a welcoming interface with a gradient "DevSense" title and highlights its key capabilities and commands.

### 2. Key Features & Functionality

DevSense provides several commands to interact with a project:

*   **`devsense init`**: Initializes DevSense within a project by creating a `.devsense` directory. This directory contains `config.json` (for provider/model settings, currently hardcoded to `openai`/`gpt-4o-mini` but the Gemini provider is implemented) and an empty `.env` file where the `GEMINI_API_KEY` should be placed.
*   **`devsense summary`**: Scans the project files and provides a high-level summary including the detected language, frameworks, and databases.
*   **`devsense ask "<question>"`**: Allows users to ask a specific question about the project. It scans the project, builds a context from the files, and sends this context along with the question to the Gemini AI to get an answer.
*   **`devsense explain <file>`**: Explains the content of a specific file. It builds a context around that file (and some surrounding files) and asks the AI to explain it.
*   **`devsense chat`**: Initiates an interactive chat session with the Gemini AI, maintaining context based on the entire repository.
*   **`devsense map`**: Generates a conceptual map of the project's directories by labeling common patterns (e.g., `auth`, `api`, `components` as `Auth`, `API`, `UI`).
*   **`devsense doctor`**: Runs checks to ensure DevSense is set up correctly, verifying the presence of the Gemini API key, scanned files, and detected project information.
*   **`devsense testScan`**: A utility command to simply scan the project and report the number of files found.

### 3. Technical Stack & Dependencies

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **CLI Framework**: `commander` for defining commands and arguments.
*   **AI Integration**: `@google/generative-ai` for interacting with the Google Gemini API (specifically `gemini-2.5-flash`).
*   **File System & Scanning**: `fs` (Node.js built-in), `path` (Node.js built-in), `glob` for pattern-matching files, and `ignore` for respecting `.gitignore` rules.
*   **Environment Management**: `dotenv` for loading environment variables (e.g., `GEMINI_API_KEY`) from `.devsense/.env`.
*   **User Interface & Styling**:
    *   `chalk` for terminal text coloring.
    *   `figlet` for ASCII art banners (used for the "DevSense" welcome title).
    *   `gradient-string` for colorful text gradients.
    *   `boxen` for drawing boxes around text in the terminal.
    *   `ora` for displaying spinner animations during AI processing.
    *   `prompts` for interactive user input in `chat` command.
*   **Build Tool**: `tsc` (TypeScript Compiler) to compile TypeScript code to JavaScript.
*   **Development Tool**: `ts-node` for running TypeScript files directly without prior compilation.

### 4. Project Structure

The project is logically organized into several directories:

*   **`bin/`**: Contains the main CLI entry point (`devsense.ts`). This file uses `commander` to set up all the available commands and links them to their respective implementations.
*   **`src/commands/`**: Houses the implementation for each CLI command (e.g., `init.ts`, `summary.ts`, `ask.ts`, `chat.ts`).
*   **`src/core/`**: Contains the core logic of DevSense:
    *   `analyzer.ts`: Detects project language, frameworks, and databases by delegating to specific analyzers.
    *   `scanner.ts`: Scans project files, ignoring those specified in `.gitignore`.
    *   `contextBuilder.ts`: Prepares the textual context (project info, file snippets) to be sent to the AI.
    *   `mapper.ts`: Logic for mapping project paths to conceptual labels.
    *   `env.ts`: Configures `dotenv` to load environment variables from the `.devsense/.env` file.
*   **`src/analyzers/`**: Contains specific logic for detecting frameworks and databases for different languages/ecosystems, such as `node.ts`, `flutter.ts`, `python.ts`, and `rust.ts`.
*   **`src/providers/`**: Defines the `LLMProvider` interface and contains implementations for specific Large Language Models, currently `gemini.ts` for Google Gemini.
*   **`src/ui/`**: Manages user interface components for the terminal:
    *   `welcome.ts`: Displays the initial welcome message.
    *   `tips.ts`: Provides helpful tips and command suggestions.
    *   `header.ts`: Prints a consistent session header with project information.
    *   `badge.ts`: A utility for creating stylized badges.

### 5. Workflow and AI Integration

1.  **Scanning**: When a command that requires repository knowledge is run (e.g., `ask`, `summary`), `scanProject` reads files from the current working directory, respecting `.gitignore` rules.
2.  **Analysis**: `analyzeProject` takes the scanned files and determines the project's characteristics (language, frameworks, databases) by checking for common configuration files (e.g., `package.json`, `Cargo.toml`, `pubspec.yaml`, `requirements.txt`).
3.  **Context Building**: For AI-powered commands, `buildContext` (or `buildContextForFile`) constructs a detailed prompt for the AI. This context includes project metadata (language, frameworks, databases) and relevant code snippets from the scanned files (currently limited to the first 25 files and 500 characters per file).
4.  **AI Interaction**: The `GeminiProvider` sends this context and the user's question/prompt to the Google Gemini API.
5.  **Response**: The AI's response is streamed back and displayed to the user.

In essence, DevSense acts as an intelligent layer over your codebase, allowing you to quickly gain insights and interact with your project using natural language, powered by AI.