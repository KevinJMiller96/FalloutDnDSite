const navButtons = document.querySelectorAll(".nav button");
const pages = document.querySelectorAll(".page");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        if (btn.classList.contains("active")) return;

        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        pages.forEach(p => p.classList.remove("active"));
        const newPage = document.getElementById(btn.dataset.page);
        newPage.classList.add("active");

        // 🔥 If switching to radio → resize canvas
        if (btn.dataset.page === "radio" && window.resizeWaveCanvas) {
            window.resizeWaveCanvas();
        }
    });
});