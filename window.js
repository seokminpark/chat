const { app, BrowserWindow } = require('electron');
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
        icon: path.join(__dirname, 'src/resources/icons/48x48.png'),
        backgroundColor: '#fff'
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
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