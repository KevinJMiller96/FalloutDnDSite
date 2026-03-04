const inventoryButtons = document.querySelectorAll(".inventory-subnav button");
const inventoryPanels = document.querySelectorAll(".inventory-panel");

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
    });
});
