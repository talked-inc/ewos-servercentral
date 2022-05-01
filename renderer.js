// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
document
    .getElementById("toggle-dark-mode")
    .addEventListener("click", async () => {
        const isDarkMode = await window.darkMode.toggle();
        document.getElementById("theme-source").innerHTML = isDarkMode
            ? "Dark"
            : "Light";
    });

document
    .getElementById("reset-to-system")
    .addEventListener("click", async () => {
        await window.darkMode.system();
        document.getElementById("theme-source").innerHTML = "System";
    });
