console.log("Coursera Notes content script loaded.");

function extractCourseraContent() {
  let contentText = "";
  let contentType = "unknown";

  // 1. Look for Reading Content First (Using expanded, modern Coursera selectors)
  // We use data-testid and rc-CML which are much more stable in Coursera's React frontend
  const readingContainer = document.querySelector('.cml-viewer, .rc-CML, [data-testid="cml-viewer"], .rc-ReadingItem, .rc-ReadingItemContent, .cml-text');
  
  if (readingContainer && readingContainer.innerText.trim().length > 50) {
    contentType = "reading";
    contentText = readingContainer.innerText.trim();
  } 
  // 2. If no reading text is found, look for Video Transcripts
  else {
    const transcriptElements = document.querySelectorAll('.rc-Phrase, .transcript-text, .rc-TranscriptContent p');
    
    if (transcriptElements.length > 0) {
      contentType = "transcript";
      const textArray = Array.from(transcriptElements).map(el => el.innerText.trim());
      contentText = textArray.join(' ');
    }
  }

  // 3. The Ultimate Fallback: If Coursera changes their CSS classes completely
  // We target the main page body and explicitly scrape paragraphs and lists to avoid grabbing the sidebar menu.
  if (!contentText || contentText.length < 50) {
    console.log("Specific containers failed. Using paragraph fallback...");
    const mainArea = document.querySelector('main, [role="main"], .rc-LessonContent');
    
    if (mainArea) {
      const paragraphs = mainArea.querySelectorAll('p, h1, h2, h3, li');
      if (paragraphs.length > 0) {
        contentType = "reading"; // Default to reading format for fallback text
        contentText = Array.from(paragraphs).map(el => el.innerText.trim()).join('\n');
      }
    }
  }

  return { text: contentText, type: contentType };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeContent") {
    const extractedData = extractCourseraContent();

    if (extractedData.text.length > 0) {
      console.log(`Extracted ${extractedData.text.length} characters of ${extractedData.type}.`);
      
      // Send the text AND the content type to the background script
      chrome.runtime.sendMessage({
        action: "processNotes",
        data: extractedData
      });
      
      sendResponse({ status: "success", message: `Found ${extractedData.type}! Sending to AI...` });
    } else {
      sendResponse({
        status: "error",
        message: "No transcript or reading found. Let the page load completely and try again."
      });
    }
  }
  return true;
});