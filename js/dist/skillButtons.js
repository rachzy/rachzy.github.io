const skillButtonsDiv = document.querySelector("#skillbuttons-div");
const skillAboutDiv = document.querySelector("#skillabout-div");
const skillButtons = document.querySelectorAll(".skill-button");
const skills = [
    {
        id: "frontend",
        title: "Front-end",
        icons: [
            {
                class: "fa-brands fa-html5",
                title: "HTML",
                isHTML: false,
            },
            {
                class: "fa-brands fa-css3-alt",
                title: "CSS",
                isHTML: false,
            },
            {
                class: "fa-brands fa-js",
                title: "JavaScript",
                isHTML: false,
            },
            {
                class: "",
                title: "TypeScript",
                innerHTML: '<span class="iconify" data-icon="cib:typescript"></span>',
                isHTML: true,
            },
            {
                class: "fa-brands fa-react",
                title: "React",
                isHTML: false,
            },
            {
                class: "fa-brands fa-react",
                title: "React Native",
                isHTML: false,
            },
        ],
    },
    {
        id: "backend",
        title: "Back-end",
        icons: [
            {
                class: "fa-brands fa-node-js",
                title: "Node.JS",
                isHTML: false,
            },
            {
                class: "fa-solid fa-mug-hot",
                title: "Express.JS",
                isHTML: false,
            },
            {
                class: "fa-brands fa-php",
                title: "PHP",
                isHTML: false,
            },
            {
                class: "fa-brands fa-python",
                title: "Python",
                isHTML: false,
            },
        ],
    },
    {
        id: "databases",
        title: "Databases",
        icons: [
            {
                class: "icon-mysql",
                title: "MySQL",
                isHTML: false,
            },
            {
                class: "icon-mongodb",
                title: "MongoDB",
                isHTML: false,
            },
        ],
    },
    {
        id: "tools",
        title: "Tools",
        icons: [
            {
                class: "",
                title: "VS Code",
                innerHTML: '<span class="iconify" data-icon="bxl:visual-studio"></span>',
                isHTML: true,
            },
            {
                class: "fa-brands fa-git-alt",
                title: "Git",
                isHTML: false,
            },
            {
                class: "icon-shell",
                title: "Terminal",
                innerHTML: '<span class="iconify" data-icon="bi:terminal-fill"></span>',
                isHTML: true,
            },
        ],
    },
];
const openSkillButtons = () => {
    skillAboutDiv.classList.remove("active");
    setTimeout(() => {
        skillAboutDiv.style.display = "none";
        skillAboutDiv.innerHTML = "";
        skillButtonsDiv.style.display = "block";
        skillButtonsDiv.classList.add("active");
    }, 200);
};
const openSkillAbout = () => {
    skillButtonsDiv.classList.remove("active");
    setTimeout(() => {
        skillButtonsDiv.style.display = "none";
        skillAboutDiv.style.display = "block";
        skillAboutDiv.classList.add("active");
    }, 200);
};
skillButtons.forEach((skillButton) => {
    skillButton.addEventListener("click", () => {
        const { id } = skillButton;
        skills.forEach((skill) => {
            if (skill.id !== id)
                return;
            const title = document.createElement("h1");
            title.textContent = skill.title;
            skillAboutDiv.appendChild(title);
            skill.icons.forEach((icon) => {
                const newIcon = document.createElement("div");
                newIcon.classList.add("skill-smallbutton");
                if (icon.isHTML) {
                    newIcon.innerHTML = icon.innerHTML;
                }
                else {
                    let iconIC = document.createElement("i");
                    const splitIconClasses = icon.class.split(" ");
                    splitIconClasses.forEach((iconClass) => {
                        iconIC.classList.add(iconClass);
                    });
                    newIcon.appendChild(iconIC);
                }
                const iconTitle = document.createElement("p");
                iconTitle.textContent = icon.title;
                newIcon.appendChild(iconTitle);
                skillAboutDiv.appendChild(newIcon);
            });
        });
        const goBackButton = document.createElement("button");
        goBackButton.textContent = "Go Back";
        goBackButton.addEventListener("click", (e) => {
            e.preventDefault();
            openSkillButtons();
        });
        skillAboutDiv.appendChild(goBackButton);
        openSkillAbout();
    });
});
