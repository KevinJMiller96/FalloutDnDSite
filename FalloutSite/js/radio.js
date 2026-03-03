const stations = document.querySelectorAll(".station");
let currentStation = null;
let activeWave = false;

stations.forEach(station => {
    station.addEventListener("click", () => {

        if (currentStation === station) {
            station.classList.remove("selected");
            currentStation = null;
            activeWave = false;
            return;
        }

        stations.forEach(s => s.classList.remove("selected"));
        station.classList.add("selected");
        currentStation = station;
        activeWave = true;
    });
});

// Make activeWave globally available
window.isRadioActive = () => activeWave;