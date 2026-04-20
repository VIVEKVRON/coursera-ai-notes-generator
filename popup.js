document.getElementById('generateBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.innerText = "Scanning page for content...";

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url.includes("coursera.org/learn")) {
    chrome.tabs.sendMessage(tab.id, { action: "scrapeContent" }, (response) => {
      if (chrome.runtime.lastError) {
        statusDiv.innerText = "Error: Please refresh the Coursera page and try again.";
      } else if (response && response.status === "error") {
        statusDiv.innerText = response.message;
      } else if (response && response.status === "success") {
        statusDiv.innerText = "Content found! Sending to AI for processing...";
      }
    });
  } else {
    statusDiv.innerText = "Please navigate to a Coursera lesson page.";
  }
});

// Listen for messages coming back from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const statusDiv = document.getElementById('status');

  if (request.action === "notesReady") {
    statusDiv.innerText = "Notes ready! Opening document...";
    
    // 1. Save the raw notes securely in the extension's local memory
    localStorage.setItem('courseraNotes', request.notes);
    
    // 2. Open our dedicated, secure notes page
    chrome.tabs.create({ url: "notes.html" });
    
  } else if (request.action === "notesError") {
    statusDiv.innerText = request.message;
  }
});
