// Modules to control application life and create native browser window
const {
    app,
    Tray,
    Menu,
    nativeImage,
    BrowserWindow,
    ipcMain,
    nativeTheme,
} = require("electron");
const { EventEmitter } = require("events");
const path = require("path");

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 768,
        width: 1024,
        icon: "favicon.png",
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    var splash = new BrowserWindow({
        icon: "favicon.png",
        width: 500,
        height: 180,
        frame: false,
        alwaysOnTop: true,
    });

    splash.loadFile("splash.html");
    splash.center();
    setTimeout(function () {
        splash.close();
        mainWindow.center();
        mainWindow.show();
    }, 5000);

    // and load the index.html of the app.
    mainWindow.loadFile("index.html");
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = "light";
        } else {
            nativeTheme.themeSource = "dark";
        }
        return nativeTheme.shouldUseDarkColors;
    });

    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system";
    });
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
let tray;

app.whenReady().then(() => {
    const icon = nativeImage.createFromPath("favicon.png");
    const contextMenu = Menu.buildFromTemplate([
        { label: "Running", type: "text" },
        { label: "Item2", type: "radio" },
        { label: "Item3", type: "radio", checked: true },
        { label: "Item4", type: "radio" },
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip("Running as expected");
    tray.setTitle("EWOS ServerCentral");
    tray = new Tray(icon);

    // note: your contextMenu, Tooltip and Title code will go here!
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
