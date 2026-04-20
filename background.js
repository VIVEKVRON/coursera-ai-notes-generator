const GEMINI_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your own key from Google AI Studio

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processNotes") {
    console.log(`Processing ${request.data.type}. Length:`, request.data.text.length);
    generateNotes(request.data.text, request.data.type);
  }
});

async function generateNotes(rawText, contentType) {
  try {
    console.log(`Sending ${contentType} request to Gemini API. Please wait...`);

    // --- THE DYNAMIC PROMPT LOGIC ---
    let prompt = "";
    
    if (contentType === "transcript") {
        prompt = `You are an expert tutor. Take the following Coursera video transcript and convert it into highly structured, easy-to-read study notes. Use markdown formatting with clear headings, bullet points, and highlight key terms. Here is the text:\n\n${rawText}`;
    } else if (contentType === "reading") {
        prompt = `You are an expert tutor. Take the following Coursera reading material and generate concise, structured study notes. Summarize key concepts, define new terms, extract all main points (like 'Key Principles'), and present it in a clear, hierarchical markdown format. Ignore any messy UI navigation text. Here is the reading:\n\n${rawText}`;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("🚨 GOOGLE API ERROR DETAILS 🚨:", JSON.stringify(errorDetails, null, 2));
      throw new Error("API request failed with status " + response.status);
    }

    const data = await response.json();
    const formattedNotes = data.candidates[0].content.parts[0].text;

    chrome.runtime.sendMessage({
      action: "notesReady",
      notes: formattedNotes
    }).catch(err => console.log("Popup closed, but notes generated!"));

  } catch (error) {
    console.error("Error generating notes:", error);
    chrome.runtime.sendMessage({
      action: "notesError",
      message: "Failed to generate notes. Check your API key and console."
    }).catch(err => console.log("Popup closed before error delivered."));
  }
}