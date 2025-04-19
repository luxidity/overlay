// renderer.js
// This file is the renderer script for the Electron app. It handles loading and rendering markdown content in the DOM.

const contentEl = document.getElementById('content');
let searchBar = document.getElementById('search-bar'); // Use 'let' to avoid redeclaration issues

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
 * Automatically loads and renders a default markdown file (`VS Code.md`) when the DOM is fully loaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  const defaultFile = 'VS Code.md';
  console.log('Loading the default file:', defaultFile);
  loadAndRender(defaultFile);
});

// Add functionality to handle search and display matching files
const contentDiv = document.getElementById('content');

// Function to update the search results dropdown
function updateSearchResults(files) {
  const dropdown = document.getElementById('search-dropdown');
  if (!dropdown) {
    const newDropdown = document.createElement('ul');
    newDropdown.id = 'search-dropdown';
    newDropdown.style.position = 'absolute';
    newDropdown.style.backgroundColor = 'white';
    newDropdown.style.color = 'black';
    newDropdown.style.listStyle = 'none';
    newDropdown.style.padding = '5px';
    newDropdown.style.margin = '0';
    newDropdown.style.border = '1px solid gray';
    document.getElementById('search-container').appendChild(newDropdown);
  }

  const dropdownList = document.getElementById('search-dropdown');
  dropdownList.innerHTML = '';

  files.forEach(file => {
    const listItem = document.createElement('li');
    listItem.textContent = file;
    listItem.style.cursor = 'pointer';
    listItem.addEventListener('click', () => {
      loadAndRender(file);
      dropdownList.innerHTML = ''; // Clear dropdown after selection
    });
    dropdownList.appendChild(listItem);
  });
}

// Event listener for search bar input
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const allFiles = window.shortcutAPI.listMarkdownFiles();
  const matchingFiles = allFiles.filter(file => file.toLowerCase().includes(query));
  updateSearchResults(matchingFiles);
});

// Update search functionality to clear the search bar and unfocus it after selection
searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const dropdown = document.getElementById('search-dropdown');
    if (dropdown && dropdown.firstChild) {
      const firstResult = dropdown.firstChild.textContent;
      loadAndRender(firstResult);
      dropdown.innerHTML = ''; // Clear dropdown after selection
      searchBar.value = ''; // Clear the search bar text
      searchBar.blur(); // Unfocus the search bar
    }
  }
});

// Ensure dropdown is cleared when clicking outside
document.addEventListener('click', (event) => {
  if (!document.getElementById('search-container').contains(event.target)) {
    const dropdown = document.getElementById('search-dropdown');
    if (dropdown) {
      dropdown.innerHTML = '';
    }
  }
});

// Update the '/' key focus logic to avoid conflicts
window.addEventListener('keydown', (event) => {
  if (event.key === '/' && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
    event.preventDefault(); // Prevent default behavior of '/'
    if (!searchBar) {
      searchBar = document.getElementById('search-bar'); // Reassign if necessary
    }
    if (searchBar) {
      searchBar.focus();
    }
  }
});