const navButtons = document.querySelectorAll(".nav button");
const pages = document.querySelectorAll(".page");

// Create ONE reusable audio object
const tabClickSound = new Audio("/audio/tab-click.mp3");
tabClickSound.volume = 0.6; // adjust if needed

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // If already active → do nothing
        if (btn.classList.contains("active")) return;

        // 🔊 Play click sound
        tabClickSound.currentTime = 0; // rewind for rapid clicks
        tabClickSound.play().catch(() => {
            // prevents console warning if user hasn't interacted yet
        });

        // Remove active state from all buttons
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Switch visible page
        pages.forEach(p => p.classList.remove("active"));
        const newPage = document.getElementById(btn.dataset.page);
        newPage.classList.add("active");

        // If radio page → trigger canvas resize
        if (btn.dataset.page === "radio" && window.resizeWaveCanvas) {
            window.resizeWaveCanvas();
        }
    });
});