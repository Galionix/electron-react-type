/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import path from 'path';
import { app, BrowserWindow, shell,ipcMain,remote } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Store from './utils/store';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',

  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 600, height: 600 },
    logged: false,
    startpage: 'call-help-main',
    google_profile: {
      id: '',
      given_name: '',
      family_name: '',
      email: '',
      picture: '',
    },
  },
});

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {

  console.log("%c #️⃣: createWindow -> createWindow ",
  "font-size:16px;background-color:#3bc1f7;color:white;",
  'createWindow')

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  // const RESOURCES_PATH = app.isPackaged
  //   ? path.join(process.resourcesPath, 'assets')
  //   : path.join(__dirname, '../assets');

  // const getAssetPath = (...paths: string[]): string => {
  //   return path.join(RESOURCES_PATH, ...paths);
  // };
  const { x, y, width, height } = store.get('windowBounds');
  mainWindow = new BrowserWindow({
    x,
    y,
    // show: false,
    width,
    height,
    minWidth: 285,
    minHeight: 400,
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    frame: false,
    // icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.setAlwaysOnTop(true, 'normal');

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {



    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {

    console.log("%c 🏺: createWindow -> 'did-finish-load' ",
    "font-size:16px;background-color:#6f7330;color:white;",
    'new-window')

    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  ipcMain.on('app_minimize', (event) => {
    console.log('minimizing');
    // mainWindow.minimize();

mainWindow?.minimize();
  });

  ipcMain.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {

console.log("%c 🆗: 'activate' ",
"font-size:16px;background-color:#7caa73;color:white;",
'activate')

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});




