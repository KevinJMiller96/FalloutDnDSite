function initNavigation()
{
    const navButtons = document.querySelectorAll(".nav button");
    const pages = document.querySelectorAll(".page");

    // Create ONE reusable audio object
    const tabClickSound = new Audio("/audio/tab-click.mp3");
    tabClickSound.volume = 0.01; // adjust if needed

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
        });
    });


    function triggerCRTGlitch() {

        const screen = document.querySelector(CRT_GLITCH_TARGET);
        if (!screen) return;

        if (Math.random() < CRT_GLITCH_CHANCE) {

            screen.classList.remove("crt-glitch");

            // restart animation
            void screen.offsetWidth;

            screen.classList.add("crt-glitch");
        }
    }
}