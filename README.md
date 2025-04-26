# 📰 Smart Article Analyzer

A full-stack AI-powered tool that fetches and summarizes web articles using **LangChain.js** and **OpenAI GPT-3.5**.

This project is an experimental AI pipeline for summarizing articles, built to explore LangChain’s capabilities in handling long text, contextual summarization, and structured outputs.

---

## 🚀 Features

- Fetch article content dynamically from any valid URL.
- Chunk-based **contextual summarization** for long articles, processed progressively.
- Extract **Key Points** and generate **Suggested Titles** based on user-selected options.
- Dynamic **prompt engineering** with structured JSON outputs.
- Frontend built with **Next.js**, allowing users to input URLs, select summary options, and view results in real-time.
- Support for **fake vs real pipeline**, for easy testing without API costs.

---

## ⚙️ How It Works

1. The user submits a URL and selects what they want (summary, key points, title).
2. The article content is fetched and split into manageable chunks.
3. Each chunk is summarized **contextually**, updating a global summary progressively (manual memory approach).
4. Once all chunks are processed, the final summary is analyzed again to extract key points and suggest a title.
5. The result is returned as a **structured JSON**, allowing for clean UI presentation.

---

## 💡 Why This Approach?

- **Contextual Summarization**: Summarizing progressively for better coherence.
- **Structured Output**: Returning JSON makes it easier to work with and extend.
- **API Experimentation**: This setup allows for learning how to manage AI-driven processes practically.

---

## 🛠 Tech Stack

- **Node.js / Next.js** – Full-stack JavaScript.
- **LangChain.js** – Orchestration for LLMs.
- **OpenAI GPT-3.5** – Language model for summarization.
- **Cheerio.js** – For extracting text from HTML content.
- **CSS Modules** – Scoped styling for clean UI.

---

## 📂 Project Status

This project is in progress and will be expanded to explore other AI techniques in the future.

Planned enhancements:
- Multi-document support.
- File uploads (PDF, DOCX).
- Rate limiting and caching.
- GitHub Actions for automated testing.

---

## 🔗 Demo & Progress

👉 [Project Board](https://github.com/users/TAGHREEDAA/projects/1/views/1)

---
