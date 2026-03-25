function initRadio()
{
    const stations = document.querySelectorAll(".station");

    let currentStation = null;
    let activeWave = false;
    let currentAudio = null;

    stations.forEach(station => {
        station.addEventListener("click", () => {

           
            // If clicking selected station → turn OFF
            if (currentStation === station) {

                station.classList.remove("selected");

                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    currentAudio = null;
                }

                currentStation = null;
                activeWave = false;
                return;
            }

            // Remove highlight from others
            stations.forEach(s => s.classList.remove("selected"));
            station.classList.add("selected");

            // Stop previous audio
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // Start new audio
            const audioFile = station.dataset.audio;
            currentAudio = new Audio(audioFile);
            currentAudio.loop = true;
            currentAudio.volume = GetSiteSoundValue();
            currentAudio.play();

            currentStation = station;
            activeWave = true;
        });
    });

    // Used by wave.js
    window.isRadioActive = () => activeWave;
}