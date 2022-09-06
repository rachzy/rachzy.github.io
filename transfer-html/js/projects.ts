type tags = {
  title: string;
}[];

type project = {
  title: string;
  description: string;
  img: string;
  tags: tags;
  repositoryUrl: string;
};

type projects = project[];

const projectsSectionContentDiv = document.querySelector(
  "#projects-sectioncontent"
);

const projects: projects = [
  {
    title: "Oncoffee",
    description: `OnCoffee is an e-commerce marketplace that is focused on selling
        everything related to coffee, from simple coffee bags to coffee
        preparing machines. The project is being developed using JavaScript Slack (ReactJS and Node).`,
    img: "Oncoffee.png",
    tags: [
      {
        title: "HTML",
      },
      {
        title: "CSS",
      },
      {
        title: "JavaScript",
      },
      {
        title: "React",
      },
      {
        title: "Node",
      },
      {
        title: "MySQL",
      },
    ],
    repositoryUrl: "https://github.com/rachzy/oncoffee",
  },
  {
    title: "Fastalk",
    description: `Fastalk was a Fast-Chat by Rooms website with video-calls that I loved developing. 
      It got many users, but I shutted it down because I had no investment to keep it online.
      It was developed using PHP and JavaScript`,
    img: "Fastalk.png",
    tags: [
      {
        title: "HTML",
      },
      {
        title: "CSS",
      },
      {
        title: "JavaScript",
      },
      {
        title: "PHP",
      },
      {
        title: "MySQL",
      },
    ],
    repositoryUrl: "https://github.com/rachzy/fastalk",
  },
  {
    title: "TS Chat",
    description: `A fast-chat system coded on Typescript. 
      I created this project with the only intention of practicing my Typescript skills. It's being developed using
      React + Typescript, NodeJS and Websockets`,
    img: "TSChat.png",
    tags: [
      {
        title: "HTML",
      },
      {
        title: "CSS",
      },
      {
        title: "JavaScript",
      },
      {
        title: "TypeScript",
      },
      {
        title: "React",
      },
      {
        title: "Node",
      },
      {
        title: "Websockets",
      },
      {
        title: "MongoDB",
      },
    ],
    repositoryUrl: "https://github.com/rachzy/tschat",
  },
];

const displayProjects = (): void => {
  projects.forEach((project: project) => {
    const newProjectDiv = document.createElement("div");
    newProjectDiv.classList.add("project");
    projectsSectionContentDiv.appendChild(newProjectDiv);

    const projectDescriptionDiv = document.createElement("div");
    projectDescriptionDiv.classList.add("project-description");
    newProjectDiv.appendChild(projectDescriptionDiv);

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project.title;
    projectDescriptionDiv.appendChild(projectTitle);

    const projectDescription = document.createElement("p");
    projectDescription.textContent = project.description;
    projectDescriptionDiv.appendChild(projectDescription);

    const projectTagsDiv = document.createElement("div");
    projectTagsDiv.classList.add("project-tags");
    projectDescriptionDiv.appendChild(projectTagsDiv);

    project.tags.forEach((tag) => {
      const newTag = document.createElement("span");
      newTag.textContent = tag.title;
      projectTagsDiv.appendChild(newTag);
    });

    const projectRepositoryButton = document.createElement("button");
    projectRepositoryButton.innerHTML =
      'PROJECT REPOSITORY <i class="fa-solid fa-arrow-up-right-from-square"></i>';
    projectRepositoryButton.addEventListener("click", () => {
      window.open(project.repositoryUrl, "_blank");
    });
    projectDescriptionDiv.appendChild(projectRepositoryButton);

    const projectImageDiv = document.createElement("div");
    projectImageDiv.classList.add("project-image");
    newProjectDiv.appendChild(projectImageDiv);

    const projectImg = document.createElement("img");
    projectImg.src = `imgs/${project.img}`;
    projectImg.alt = `project-${project.title}`;
    projectImageDiv.appendChild(projectImg);
  });
};
displayProjects();
