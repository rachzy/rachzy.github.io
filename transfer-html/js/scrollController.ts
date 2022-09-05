const navmenu = document.querySelector("#nav-menu");

document.addEventListener("scroll", (): void => {
    const { scrollTop } = document.documentElement;
    if(scrollTop >= 100) {
        return navmenu.classList.add("solid");
    }
    navmenu.classList.remove("solid");
});