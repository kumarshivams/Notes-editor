# 📝 Notes Editor with Embedded Chat UI

A *Notion-style note-taking application* with an embedded *ChatGPT-style AI chat interface, built using modern tools like **Next.js, **TypeScript, **Tailwind CSS, and **TipTap v2*. Each note acts like a mini workspace with its own chat-powered AI assistant.

---

## 🔍 Objective

Simulate an *AI Copilot experience inside notes*. Users can take notes using a rich-text editor and chat with an AI assistant that replies using a dummy API.

---

## 🚀 Demo

> ⚡ Live demo link (optional)

[---](http://notes-editor-iota.vercel.app)

## 📦 Tech Stack

| Role          | Tech                         |
|---------------|------------------------------|
| Framework     | [Next.js (latest)](https://nextjs.org/)        |
| Language      | TypeScript                   |
| Styling       | [Tailwind CSS](https://tailwindcss.com/)       |
| Text Editor   | [TipTap v2](https://tiptap.dev/)               |
| State Manager | Zustand (optional/bonus)     |

> 🔗 Starter Template: [tip-tap-template](https://github.com/buddeshya/tip-tap-template)

---

## 📋 Features

### 🗂 Notes System

- Sidebar to view and switch between multiple notes
- Each note includes:
  - Title
  - Rich-text body powered by TipTap
- Editor supports:
  - Paragraph text
  - Headings (H1, H2, H3)
  - Bullet and numbered lists

### 🤖 AI Chat UI (Per Note)

- Circular AI button appears at bottom-right of each note
- Opens an *in-note floating chat interface* (non-modal, bottom of content)
- Features:
  - User input field for prompts
  - Sends prompts to a dummy API (returns mock response)
  - User messages: right-aligned
  - AI responses: left-aligned
- Each note has *its own chat history*

### 🧠 State Handling

- Local state via useState/useEffect
- Zustand recommended (bonus) for shared state
- Chat state is *note-specific*

---

## 📁 Folder Structure (Suggested)

```bash
├── components/
│   ├── Sidebar.tsx
│   ├── Editor.tsx
│   └── ChatUI.tsx
├── lib/
│   └── dummyApi.ts
├── pages/
│   └── index.tsx
├── store/
│   └── useStore.ts (if using Zustand)
└── styles/
    └── globals.css
