var projectsSectionContentDiv = document.querySelector("#projects-sectioncontent");
var projects = [
    {
        title: "Oncoffee",
        description: "OnCoffee is an e-commerce marketplace that is focused on selling\n        everything related to coffee, from simple coffee bags to coffee\n        preparing machines. The project is being developed using JavaScript Slack (ReactJS and Node).",
        img: "Oncoffee.png",
        tags: [
            {
                title: "HTML"
            },
            {
                title: "CSS"
            },
            {
                title: "JavaScript"
            },
            {
                title: "React"
            },
            {
                title: "Node"
            },
            {
                title: "MySQL"
            },
        ],
        repositoryUrl: "https://github.com/rachzy/oncoffee"
    },
    {
        title: "Fastalk",
        description: "Fastalk was a Fast-Chat by Rooms website with video-calls that I loved developing. \n      It got many users, but I shutted it down because I had no investment to keep it online.\n      It was developed using PHP and JavaScript",
        img: "Fastalk.png",
        tags: [
            {
                title: "HTML"
            },
            {
                title: "CSS"
            },
            {
                title: "JavaScript"
            },
            {
                title: "PHP"
            },
            {
                title: "MySQL"
            },
        ],
        repositoryUrl: "https://github.com/rachzy/fastalk"
    },
    {
        title: "TS Chat",
        description: "A fast-chat system coded on Typescript. \n      I created this project with the only intention of practicing my Typescript skills. It's being developed using\n      React + Typescript, NodeJS and Websockets",
        img: "TSChat.png",
        tags: [
            {
                title: "HTML"
            },
            {
                title: "CSS"
            },
            {
                title: "JavaScript"
            },
            {
                title: "TypeScript"
            },
            {
                title: "React"
            },
            {
                title: "Node"
            },
            {
                title: "Websockets"
            },
            {
                title: "MongoDB"
            },
        ],
        repositoryUrl: "https://github.com/rachzy/tschat"
    },
];
var displayProjects = function () {
    projects.forEach(function (project) {
        var newProjectDiv = document.createElement("div");
        newProjectDiv.classList.add("project");
        projectsSectionContentDiv.appendChild(newProjectDiv);
        var projectDescriptionDiv = document.createElement("div");
        projectDescriptionDiv.classList.add("project-description");
        newProjectDiv.appendChild(projectDescriptionDiv);
        var projectTitle = document.createElement("h1");
        projectTitle.textContent = project.title;
        projectDescriptionDiv.appendChild(projectTitle);
        var projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        projectDescriptionDiv.appendChild(projectDescription);
        var projectTagsDiv = document.createElement("div");
        projectTagsDiv.classList.add("project-tags");
        projectDescriptionDiv.appendChild(projectTagsDiv);
        project.tags.forEach(function (tag) {
            var newTag = document.createElement("span");
            newTag.textContent = tag.title;
            projectTagsDiv.appendChild(newTag);
        });
        var projectRepositoryButton = document.createElement("button");
        projectRepositoryButton.innerHTML =
            'PROJECT REPOSITORY <i class="fa-solid fa-arrow-up-right-from-square"></i>';
        projectRepositoryButton.addEventListener("click", function () {
            window.open(project.repositoryUrl, "_blank");
        });
        projectDescriptionDiv.appendChild(projectRepositoryButton);
        var projectImageDiv = document.createElement("div");
        projectImageDiv.classList.add("project-image");
        newProjectDiv.appendChild(projectImageDiv);
        var projectImg = document.createElement("img");
        projectImg.src = "imgs/".concat(project.img);
        projectImg.alt = "project-".concat(project.title);
        projectImageDiv.appendChild(projectImg);
    });
};
displayProjects();
