async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

async function initComponents() {

    await loadComponent("nav-container",    "/components/navbar.html");
    await loadComponent("status",           "/components/status.html");
    await loadComponent("inventory",        "/components/inventory.html");
    await loadComponent("data",             "/components/data.html");
    await loadComponent("map",              "/components/map.html");
    await loadComponent("radio",            "/components/radio.html");
    await loadComponent("settings",         "/components/settings.html");

    initNavigation();
    initStatus();
    initData();
    initMap();
    initRadio();
    initWave();
    GetSiteSoundValue();
}
document.addEventListener("DOMContentLoaded", () => {
    initComponents();
});