function initStatus()
{
    function selectMenu(button, component) {
        document.querySelectorAll(".menu-btn")
            .forEach(btn => btn.classList.remove("active"))

        button.classList.add("active")

        loadComponent(component)
    }
}