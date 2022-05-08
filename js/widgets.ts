type widget = {
  id: string,
  title: string,
  content: string
}

type widgets = widget[]

const widgetsDisclaimerDiv = document.querySelector(".widgets-disclaimer") as HTMLDivElement;
const disclaimerTitle = document.querySelector("#disclaimer-title") as HTMLTitleElement;
const disclaimerContent = document.querySelector("#disclaimer-content") as HTMLDivElement;
const widgetsContainer = document.querySelector(".widgets") as HTMLDivElement;
const widgets = document.querySelectorAll(".widget") as NodeList;

const widgetsResponse: widgets = [
  {
    id: "personal",
    title: "Personal Info",
    content: `
    <b>Name:</b> Henrique Ferreira <br>
    <b>Birthday:</b> February, 25th <br>
    <b>Age:</b> 16 years old <br>
    <b>Gender:</b> Boy (He/Him) <br>
    <b>Lives in:</b> Minas Gerais, Brazil <br>
    <b>Occupation:</b> Student <br>
    <b>Job experience:</b> None
    `,
  },
  {
    id: "education",
    title: "Education",
    content: `
        <b>Current Institution:</b> Federal Institue of Education, Science and Technology of Triângulo Mineiro <br> <br>
      <b>Currently cursing:</b> High school <br>
      <b>Graduating on:</b> Technical IT Course (3 years length)<br> <br>
      <b>English:</b> 5 years of course in 3 different institutions
      `,
  },
  {
    id: "languages",
    title: "Languages",
    content: `
    <b>Portuguese:</b> Native <br>
    <b>English:</b> Fluent
    `,
  },
  {
    id: "story",
    title: "My Story",
    content: `My first contact with lines of code came in 2018, when I tried to develop my own Roblox games using
    Lua Script and Minecraft plugins using Java. Even though I didn't go too far on it in that time, my passion
    for coding was born there. Some years later, in 2020, I started on Web-Developing and I created my first project:
    Patrocitizens (Unfinished), which was supposed to be a social media for my city. I made it on PHP only.
    In the end of 2020, I started the development of a project called Fastalk, which was a fast-chat with rooms.
    I made it with PHP and some JavaScript in some parts. After ending that project, I started another one some 
    months later with my friend, called OnCoffee, that I'm currently developing using ReactJS and NodeJS.`,
  },
];

const displayWidgets = (): void => {
  widgetsDisclaimerDiv.classList.remove("active");

  setTimeout(() => {
    widgetsDisclaimerDiv.style.display = "none";
    widgetsContainer.style.display = "flex";
    widgetsContainer.classList.add("active");
  }, 200);
};

const displayWidgetsDisclaimer = () => {
  widgetsContainer.classList.remove("active");

  setTimeout(() => {
    widgetsContainer.style.display = "none";
    widgetsDisclaimerDiv.style.display = "flex";
    widgetsDisclaimerDiv.classList.add("active");
  }, 200);
};

widgets.forEach((widget: Element) => {
  widget.addEventListener("click", () => {
    const { id } = widget;

    if (id === "return") return displayWidgets();

    widgetsResponse.forEach((wid) => {
      if (wid.id !== id) return;
      disclaimerTitle.innerHTML = wid.title;
      disclaimerContent.innerHTML = wid.content;
      displayWidgetsDisclaimer();
    });
  });
});
