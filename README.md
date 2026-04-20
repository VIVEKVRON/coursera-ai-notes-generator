# 🎓 Coursera AI Study Notes Generator

A Manifest V3 Chrome Extension that transforms Coursera video lectures and reading materials into beautifully formatted, downloadable PDF study guides using the Google Gemini 2.5 Flash API.

## 🚀 Features

* **Smart DOM Scraping:** Automatically detects whether you are on a video lecture or a reading page and extracts the relevant content (bypassing Coursera's hybrid React UI components).
* **AI-Powered Summarization:** Feeds raw transcripts and reading text into Google's Gemini LLM to generate structured, hierarchical study notes.
* **Syntax Highlighting:** Automatically formats inline code and multi-line code blocks (perfect for computer science and software engineering courses).
* **Native PDF Export:** Renders the AI markdown into a clean, A4-styled HTML document and seamlessly triggers Chrome's native print-to-PDF engine for offline studying.

## 🛠️ Tech Stack

* **Architecture:** Chrome Extension API (Manifest V3)
* **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
* **AI Integration:** Google Gemini API (`gemini-2.5-flash`)
* **Data Handling:** Chrome Local Storage, Blob URLs

## ⚙️ Installation & Setup

Because this is a developer build, you will need to load it into Chrome manually.

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/VIVEKVRON/coursera-ai-notes-generator.git
   \`\`\`
2. **Get a free Gemini API Key:**
   * Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and generate a free API key.
   * Open `background.js` in your code editor.
   * Replace `'YOUR_API_KEY_HERE'` on line 1 with your actual key. *(Never commit your active API key to a public repository!)*
3. **Load the extension in Chrome:**
   * Open Google Chrome and navigate to `chrome://extensions/`.
   * Enable **Developer mode** (toggle in the top right corner).
   * Click **Load unpacked** in the top left.
   * Select the folder containing this repository.

## 📖 How to Use

1. Navigate to any Coursera video lecture or reading material.
2. Ensure the page has fully loaded (specifically the transcript or reading text).
3. Click the extension icon in your Chrome toolbar.
4. Click **"Download as PDF"**.
5. Wait a few seconds for the AI to process the text. A new tab will open with your formatted study guide.
6. Click the blue **Download as PDF** button at the top of the generated document.

## 🔮 Future Roadmap

* Add support for Udemy and EdX DOM structures.
* Implement a secure "Options" page so users can input their API key via the UI rather than hardcoding it.
* Add manual screenshot capturing via HTML5 Canvas for capturing video diagrams.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
