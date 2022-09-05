const navmenu = document.querySelector("#nav-menu");
document.addEventListener("scroll", () => {
    const { scrollTop } = document.documentElement;
    if (scrollTop >= 100) {
        return navmenu.classList.add("solid");
    }
    navmenu.classList.remove("solid");
});
