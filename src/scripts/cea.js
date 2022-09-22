/**
 * CEA - my own Create Electron App
 */

import * as fs from 'fs'
import { execSync } from 'child_process';
import fetch from 'node-fetch';
import path from 'path';

// const download = async (url, imgpth) => {
//   const res = await fetch(url);
//   const buffer = await res.arrayBuffer();
//   fs.writeFileSync(imgpth, buffer);
// };

/**
 * cea - create electron app
 * @param {string} url website's url
 * @param {string} pth app's path
 */
export const cea = (url, pth) => {
  console.log('Working on that...');
  // const icons = `https://s2.googleusercontent.com/s2/favicons?domain_url=`;
  // var iconPath;

  if (url.includes('http') || url.includes('https')) {
    // okay
  } else {
    url = 'https://' + url;
  }

  const scriptString = `
const { app, BrowserWindow } = require('electron');
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.setMenu(null);
  win.loadURL('${url}');
};
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });  
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
  `;

  // check if path exists
  if (!fs.existsSync(pth)) {
    fs.mkdirSync(pth);
  }

  // write script to file
  fs.writeFileSync(`${pth}/index.js`, scriptString);

  // create package.json
  const pkg = {
    name: 'cea',
    version: '1.0.0',
    main: 'index.js',
    scripts: {
      start: 'electron .',
      build: 'npx electron-packager . cea --platform=windows --arch=x86 --out=dist --overwrite',
    },
    dependencies: {
      electron: '^20.2.0',
      'electron-packager': '^16.0.0',
    }
  };

  fs.writeFileSync(`${pth}/package.json`, JSON.stringify(pkg));
  console.log('Done! Running the application...');
  execSync(`cd ${pth} && npm install && npm start`);
}