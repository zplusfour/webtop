/**
 * CEA - my own Create Electron App
 */



const fs = require('fs');
const { execSync } = require('child_process');
const fetch = import('node-fetch');
const path = require('path');

const atob = (str) => {
  return Buffer.from(str, 'base64').toString('binary');
};

const download = async (url, imgpth) => {
  const res = await fetch(url);
  const buffer = await res.buffer();
  fs.writeFileSync(imgpth, buffer);
};

/**
 * cea - create electron app
 * @param {string} url website's url
 * @param {string} pth app's path
 */
const cea = (url, pth) => {
  const icons = `https://s2.googleusercontent.com/s2/favicons?domain_url=`;
  var iconPath;

  if (url.includes('http') || url.includes('https')) {
    iconPath = `${pth}/${url.split('/')[2]}.png`;
    download(icons + url, iconPath);
    iconPath = iconPath.replace('/', '\\');
    console.log(iconPath);
  } else {
    iconPath = `${pth}/${url}.png`;
    download(icons + url, iconPath);
    iconPath = iconPath.replace('/', '\\');
    url = 'https://' + url;
    console.log(iconPath);
  }

  const scriptString = `
const { app, BrowserWindow } = require('electron');
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: '${path.resolve(iconPath)}',
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
      electron: '^8.0.0',
      'electron-packager': '^7.0.0',
    }
  };

  fs.writeFileSync(`${pth}/package.json`, JSON.stringify(pkg));
  execSync(`cd ${pth} && npm install && npm start`);
}

exports.cea = cea;
