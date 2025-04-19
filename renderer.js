// renderer.js
// This file is the renderer script for the Electron app. It handles loading and rendering markdown content in the DOM.

const contentEl = document.getElementById('content');

/**
 * Converts markdown text into HTML using the `shortcutAPI.parseMarkdown` method and updates the `content` element in the DOM.
 * @param {string} mdText - The markdown text to render.
 */
function renderMarkdown(mdText) {
  if (!window.shortcutAPI || !window.shortcutAPI.parseMarkdown) {
    console.error('shortcutAPI or parseMarkdown is not defined');
    return;
  }
  const html = window.shortcutAPI.parseMarkdown(mdText);
  contentEl.innerHTML = html;
}

/**
 * Loads a markdown file using `shortcutAPI.loadMarkdown` and renders its content as HTML using `renderMarkdown`.
 * @param {string} filename - The name of the markdown file to load and render.
 */
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

/**
 * Automatically loads and renders a default markdown file (`vscode.md`) when the DOM is fully loaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  const defaultFile = 'vscode.md';
  console.log('Loading the default file:', defaultFile);
  loadAndRender(defaultFile);
});