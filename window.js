const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function initWindow() {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 660,
        minWidth: 960,
        minHeight: 660,
        frame: false,
        show: false,
        icon: path.join(__dirname, '/src/assets/resources/icons/48x48.png'),
        backgroundColor: '#fff'
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/dist/views/index.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('blur', () => {
        mainWindow.webContents.send('app:blur');
    });

    mainWindow.on('focus', () => {
        mainWindow.webContents.send('app:focus');
    });

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('app:maximize', true);
    });

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('app:unmaximize', false);
        mainWindow.setSize(960, 660);
    });

    ipcMain.on('app:isMaximized', function () {
        mainWindow.webContents.send('app:isMaximized', mainWindow.isMaximized());
    });

    ipcMain.on('app:minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('app:maximize', () => {
        mainWindow.maximize();
    });

    ipcMain.on('app:unmaximize', () => {
        mainWindow.unmaximize();
        mainWindow.setSize(960, 660);
    });

    ipcMain.on('app:close', () => {
        mainWindow.close();
    });

    ipcMain.on('app:openDevTools', () => {
        mainWindow.webContents.openDevTools();
    });
}

app.on('ready', initWindow);
app.on('activate', () => {
    if (mainWindow === null) {
        initWindow();
    }
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});