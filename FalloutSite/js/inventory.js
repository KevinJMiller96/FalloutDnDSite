const inventorySubnav = document.querySelector(".inventory-subnav");
const inventoryTrack = document.querySelector(".inventory-subnav-track");
const inventoryButtons = document.querySelectorAll(".inventory-subnav button");
const inventoryPanels = document.querySelectorAll(".inventory-panel");

function updateButtonDistanceOpacity(activeButton) {
    const activeIndex = Array.from(inventoryButtons).indexOf(activeButton);
    if (activeIndex === -1) return;

    inventoryButtons.forEach((button, index) => {
        const distance = Math.abs(index - activeIndex);
        button.dataset.distance = String(Math.min(distance, 3));
    });
}

function centerInventoryButton(button) {
    if (!inventorySubnav || !inventoryTrack || !button) return;

    const subnavWidth = inventorySubnav.clientWidth;
    const trackWidth = inventoryTrack.scrollWidth;
    const maxNegativeOffset = Math.min(0, subnavWidth - trackWidth);

    const targetCenter = button.offsetLeft + (button.offsetWidth / 2);
    const inventoryNavButton = document.querySelector('.nav button[data-page="inventory"]');
    const subnavRect = inventorySubnav.getBoundingClientRect();
    const navRect = inventoryNavButton?.getBoundingClientRect();

    const desiredCenter = navRect
        ? (navRect.left + (navRect.width / 2)) - subnavRect.left
        : subnavWidth / 2;

    const centeredOffset = desiredCenter - targetCenter;
    const boundedOffset = Math.max(maxNegativeOffset, Math.min(0, centeredOffset));

    inventoryTrack.style.setProperty("--slider-offset", `${boundedOffset}px`);
    updateButtonDistanceOpacity(button);
}

inventoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("active")) return;

        inventoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        inventoryPanels.forEach(panel => panel.classList.remove("active"));
        const selectedPanel = document.getElementById(button.dataset.category);
        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }

        centerInventoryButton(button);
    });
});

window.centerInventoryActiveButton = function centerInventoryActiveButton() {
    centerInventoryButton(document.querySelector(".inventory-subnav button.active"));
};

window.centerInventoryActiveButton();
window.addEventListener("resize", window.centerInventoryActiveButton);
