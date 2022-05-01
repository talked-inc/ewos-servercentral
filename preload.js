// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ["chrome", "app", "node", "electron"]) {
        replaceText(`${type}-version`, process.versions[type]);
    }
    var pjson = require("./package.json");
    replaceText(`app-version`, pjson.version);
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("darkMode", {
    toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
    system: () => ipcRenderer.invoke("dark-mode:system"),
});
/*
//required fix until M2.

const NOTIFICATION_TITLE = "Title";
const NOTIFICATION_BODY =
    "Notification from the Renderer process. Click to log to console.";
const CLICK_MESSAGE = "Notification clicked!";

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick =
    () => (document.getElementById("output").innerText = CLICK_MESSAGE);
*/
