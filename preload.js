// preload.js
// This file is the preload script for the Electron app. It securely exposes specific APIs to the renderer process using Electron's contextBridge.

const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

/**
 * Exposes the `shortcutAPI` object to the renderer process with the following methods:
 * - `loadMarkdown(filename)`: Reads a markdown file from the `shortcuts` directory and returns its content as a string. Logs an error if the file cannot be read.
 * - `parseMarkdown(text)`: Converts markdown text into HTML using the `marked` library.
 * - `listMarkdownFiles()`: Lists all markdown files in the `shortcuts` directory.
 */
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
  listMarkdownFiles: () => {
    const shortcutsDir = path.join(__dirname, 'shortcuts');
    try {
      return fs.readdirSync(shortcutsDir).filter(file => file.endsWith('.md'));
    } catch (error) {
      console.error('Error reading shortcuts directory:', error);
      return [];
    }
  }
});