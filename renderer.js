// renderer.js
const contentEl = document.getElementById('content');

function renderMarkdown(mdText) {
  if (!window.shortcutAPI || !window.shortcutAPI.parseMarkdown) {
    console.error('shortcutAPI or parseMarkdown is not defined');
    return;
  }
  const html = window.shortcutAPI.parseMarkdown(mdText);
  contentEl.innerHTML = html;
}

function loadAndRender(filename) {
  if (!window.shortcutAPI || !window.shortcutAPI.loadMarkdown) {
    console.error('shortcutAPI or loadMarkdown is not defined');
    return;
  }
  console.log(`Loading file: ${filename}`);
  const fullContent = window.shortcutAPI.loadMarkdown(filename);
  if (!fullContent) {
    console.error('Failed to load content for file:', filename);
    return;
  }
  console.log(`File content loaded: ${fullContent.substring(0, 100)}...`);
  renderMarkdown(fullContent);
}

window.addEventListener('DOMContentLoaded', () => {
  const defaultFile = 'vscode.md';
  console.log('Loading the default file:', defaultFile);
  loadAndRender(defaultFile);
});