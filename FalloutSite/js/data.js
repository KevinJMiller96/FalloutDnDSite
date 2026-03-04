const dataSubnav = document.querySelector(".data-subnav");
const dataTrack = document.querySelector(".data-subnav-track");
const dataButtons = document.querySelectorAll(".data-subnav button");
const dataPanels = document.querySelectorAll(".data-panel");

function centerDataButton(button) {
    if (!dataSubnav || !dataTrack || !button) return;

    const subnavWidth = dataSubnav.clientWidth;
    const trackWidth = dataTrack.scrollWidth;
    const maxNegativeOffset = Math.min(0, subnavWidth - trackWidth);

    const targetCenter = button.offsetLeft + (button.offsetWidth / 2);
    const dataNavButton = document.querySelector('.nav button[data-page="data"]');
    const subnavRect = dataSubnav.getBoundingClientRect();
    const navRect = dataNavButton?.getBoundingClientRect();

    const desiredCenter = navRect
        ? (navRect.left + (navRect.width / 2)) - subnavRect.left
        : subnavWidth / 2;

    const centeredOffset = desiredCenter - targetCenter;
    const boundedOffset = Math.max(maxNegativeOffset, Math.min(0, centeredOffset));

    dataTrack.style.setProperty("--slider-offset", `${boundedOffset}px`);
}

dataButtons.forEach(button => {
    button.addEventListener("click", () => {
        dataButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        dataPanels.forEach(panel => panel.classList.remove("active"));
        const selectedPanel = document.getElementById(button.dataset.category);
        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }

        centerDataButton(button);
    });
});

window.centerDataActiveButton = function centerDataActiveButton() {
    centerDataButton(document.querySelector(".data-subnav button.active"));
};

window.centerDataActiveButton();
window.addEventListener("resize", window.centerDataActiveButton);
