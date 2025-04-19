// preload.js
const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

contextBridge.exposeInMainWorld('shortcutAPI', {
  loadMarkdown: (filename) => {
    try {
      const filePath = path.join(__dirname, 'shortcuts', filename);
      return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
      console.error('Failed to read markdown file:', err);
      return '';
    }
  },
  parseMarkdown: (text) => {
    return marked.parse(text);
  },
});