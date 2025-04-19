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

// Adjust dropdown width to exactly match the search bar width
function updateSearchResults(files) {
  const dropdown = document.getElementById('search-dropdown');
  if (!dropdown) {
    const newDropdown = document.createElement('ul');
    newDropdown.id = 'search-dropdown';
    newDropdown.style.position = 'absolute';
    newDropdown.style.backgroundColor = '#1e1e1e';
    newDropdown.style.color = '#d4d4d4';
    newDropdown.style.listStyle = 'none';
    newDropdown.style.padding = '0';
    newDropdown.style.margin = '0';
    newDropdown.style.border = '1px solid #3c3c3c';
    newDropdown.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
    newDropdown.style.maxHeight = '200px';
    newDropdown.style.overflowY = 'auto';
    newDropdown.style.fontFamily = 'Consolas, "Courier New", monospace';
    newDropdown.style.fontSize = '13px';
    document.getElementById('search-container').appendChild(newDropdown);
  }

  const dropdownList = document.getElementById('search-dropdown');
  dropdownList.style.width = `${searchBar.clientWidth}px`; // Use clientWidth for exact match
  dropdownList.innerHTML = '';

  files.forEach(file => {
    const listItem = document.createElement('li');
    listItem.textContent = file;
    listItem.style.cursor = 'pointer';
    listItem.style.padding = '8px 10px'; // Add padding for better spacing
    listItem.style.borderBottom = '1px solid #3c3c3c'; // Subtle separator for items
    listItem.style.backgroundColor = '#1e1e1e'; // Match dropdown background
    listItem.style.color = '#d4d4d4'; // Match text color
    listItem.addEventListener('mouseover', () => {
      listItem.style.backgroundColor = '#2a2d2e'; // Highlight on hover
    });
    listItem.addEventListener('mouseout', () => {
      listItem.style.backgroundColor = '#1e1e1e'; // Reset background on mouse out
    });
    listItem.addEventListener('click', () => {
      loadAndRender(file);
      dropdownList.innerHTML = ''; // Clear dropdown after selection
      dropdownList.style.display = 'none'; // Hide the dropdown
      searchBar.value = ''; // Clear the search bar text
      searchBar.blur(); // Unfocus the search bar
    });
    dropdownList.appendChild(listItem);
  });

  if (files.length > 0) {
    dropdownList.style.display = 'block'; // Ensure dropdown is visible
  } else {
    dropdownList.style.display = 'none'; // Hide the dropdown if no matches
  }
}

// Event listener for search bar input
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const allFiles = window.shortcutAPI.listMarkdownFiles();
  const matchingFiles = allFiles.filter(file => file.toLowerCase().includes(query));
  updateSearchResults(matchingFiles);
});

// Fix issue where multiple items are selected when navigating the dropdown
searchBar.addEventListener('keydown', (event) => {
  const dropdown = document.getElementById('search-dropdown');
  if (!dropdown || dropdown.children.length === 0) return;

  if (event.key === 'ArrowDown' || event.key === 'Tab') {
    event.preventDefault(); // Prevent default tab behavior
    selectedIndex = (selectedIndex + 1) % dropdown.children.length; // Move down
    updateDropdownSelection(dropdown);
  } else if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
    event.preventDefault(); // Prevent default shift+tab behavior
    selectedIndex = (selectedIndex - 1 + dropdown.children.length) % dropdown.children.length; // Move up
    updateDropdownSelection(dropdown);
  } else if (event.key === 'Enter' && selectedIndex >= 0) {
    event.preventDefault();
    const selectedItem = dropdown.children[selectedIndex];
    if (selectedItem) {
      const fileName = selectedItem.textContent;
      loadAndRender(fileName);
      dropdown.innerHTML = ''; // Clear dropdown after selection
      dropdown.style.display = 'none'; // Hide the dropdown
      searchBar.value = ''; // Clear the search bar text
      searchBar.blur(); // Unfocus the search bar
      selectedIndex = -1; // Reset selection index
    }
  }
});

function updateDropdownSelection(dropdown) {
  Array.from(dropdown.children).forEach((child, index) => {
    if (index === selectedIndex) {
      child.style.backgroundColor = '#2e2e2e'; // Highlight selected item
      child.style.color = 'white';
    } else {
      child.style.backgroundColor = '#1e1e1e'; // Reset others to match dropdown background
      child.style.color = '#d4d4d4';
    }
  });
}

// Ensure dropdown is cleared and hidden when clicking outside
document.addEventListener('click', (event) => {
  if (!document.getElementById('search-container').contains(event.target)) {
    const dropdown = document.getElementById('search-dropdown');
    if (dropdown) {
      dropdown.innerHTML = '';
      dropdown.style.display = 'none'; // Hide the dropdown
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

// Add keyboard navigation for the search dropdown
let selectedIndex = -1; // Track the currently selected index in the dropdown

// Add keyboard navigation for scrolling the content area
contentEl.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown' || event.key === 'j') {
    event.preventDefault(); // Prevent default scrolling behavior
    contentEl.scrollBy({ top: 30, behavior: 'smooth' }); // Scroll down
  } else if (event.key === 'ArrowUp' || event.key === 'k') {
    event.preventDefault(); // Prevent default scrolling behavior
    contentEl.scrollBy({ top: -30, behavior: 'smooth' }); // Scroll up
  }
});

// Ensure scrolling works anytime as long as the search bar isn't focused
window.addEventListener('keydown', (event) => {
  if (document.activeElement === searchBar) return; // Skip if search bar is focused

  if (event.key === 'ArrowDown' || event.key === 'j') {
    event.preventDefault(); // Prevent default scrolling behavior
    contentEl.scrollBy({ top: 30, behavior: 'auto' }); // Scroll down
  } else if (event.key === 'ArrowUp' || event.key === 'k') {
    event.preventDefault(); // Prevent default scrolling behavior
    contentEl.scrollBy({ top: -30, behavior: 'auto' }); // Scroll up
  }
});

// Add faster scrolling for 'D' (down) and 'U' (up)
window.addEventListener('keydown', (event) => {
  if (document.activeElement === searchBar) return; // Skip if search bar is focused

  if (event.key === 'd') {
    event.preventDefault(); // Prevent default scrolling behavior
    contentEl.scrollBy({ top: 200, behavior: 'smooth' }); // Scroll down faster
  } else if (event.key === 'u') {
    event.preventDefault(); // Prevent default scrolling behavior
    contentEl.scrollBy({ top: -200, behavior: 'smooth' }); // Scroll up faster
  }
});

// Ensure the content area is focusable to capture key events
contentEl.setAttribute('tabindex', '0');

// Add functionality to unfocus any focused area when 'Escape' is pressed
// Update ESC key functionality to hide search results when the search bar is no longer selected
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.activeElement.blur(); // Unfocus the currently focused element

    const dropdown = document.getElementById('search-dropdown');
    if (dropdown) {
      dropdown.innerHTML = ''; // Clear the dropdown
      dropdown.style.display = 'none'; // Hide the dropdown
    }
  }
});