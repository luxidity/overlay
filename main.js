// main.js
// This file is the main process of the Electron app. It handles the creation of the main application window and manages global shortcuts.

const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

/**
 * Creates the main application window with specific properties:
 * - Width: 500px, Height: 600px
 * - Always on top of other windows
 * - Frameless and transparent
 * - Preloads the `preload.js` script for secure communication with the renderer process
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true, // set to true for fs to work in preload if not bundled
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.hide();
}

app.whenReady().then(() => {
  createWindow();

  /**
   * Registers a global shortcut (CommandOrControl+Shift+P) to toggle the visibility of the main window.
   */
  globalShortcut.register('CommandOrControl+Shift+P', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  /**
   * Ensures the app creates a window when activated and no windows are open (e.g., on macOS).
   */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/**
 * Add a listener for the '/' key to focus the search bar when the overlay is active
 */
app.on('browser-window-focus', () => {
  mainWindow.webContents.removeAllListeners('before-input-event'); // Remove any existing listeners to avoid duplicates
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === '/' && !input.alt && !input.control && !input.meta && !input.shift) {
      event.preventDefault(); // Prevent default behavior of '/'
      mainWindow.webContents.executeJavaScript(`
        (function() {
          const searchBar = document.getElementById('search-bar');
          if (searchBar) {
            searchBar.focus();
          }
        })();
      `);
    }
  });
});

/**
 * Unregisters all global shortcuts when the app is about to quit.
 */
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});