document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Activate the Print Button safely (Complies with Chrome Security)
  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });

  // 2. Load the raw notes we saved in popup.js
  const rawNotes = localStorage.getItem('courseraNotes') || "No notes found. Please generate them again.";

    // 3. Safely parse Markdown to HTML
  let htmlText = rawNotes
    .replace(/```[a-z]*\n([\s\S]*?)```/gim, '<pre><code>$1</code></pre>') 
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>') 
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^---\s*$/gim, '<hr>') // <--- NEW: Fixes the dashes
    .replace(/:\s*\*/g, ':<br><span class="bullet">&bull;</span> ')
    .replace(/\s\*\s/g, '<br><span class="bullet">&bull;</span> ')
    .replace(/^\s*[\*-]\s(.*$)/gim, '<span class="bullet">&bull;</span> $1<br>')
    .replace(/\n\n/g, '<br><br>');


  // 4. Inject the beautifully formatted notes into the white document container
  document.getElementById('noteContent').innerHTML = htmlText;
});
