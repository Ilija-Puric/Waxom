import { projects } from "./data";

const camelCase = (str) => {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

export const loadProjects = () => {
  const projectsList = document.querySelector(".projects__items");
  const loadMoreBtn = document.querySelector("#load-btn");
  let projectsHTML = ``;

  // Mock requests
  const loadedProjects = projects.slice(0, 6);
  loadedProjects.forEach((project) => {
    const camelCaseCategory = camelCase(project.category);
    project.value = camelCaseCategory;
  });

  const getProjectHTML = ({ value, image, name, category }) => {
    return `
  <div class="projects__item grid__item" data-category="${value}">
  <img class="item__image" src="${image}" alt="${name}">
  <div class="item__controls">
    <div class="item__link"><i class="fa fa-link"></i></div>
    <div class="item__view"><i class="fa fa-eye"></i></div>
  </div>
  <div class="item__wrapper">
    <div class="item__triangle" style="clip-path: polygon(50% 70%, 0% 100%, 100% 100%);"></div>
    <p class="item__title">${name}</p>
    <p class="item__category">${category}</p>
  </div>
  </div>
  `;
  };
  loadedProjects.forEach((project) => (projectsHTML += getProjectHTML(project)));
  projectsList.innerHTML = projectsHTML;

  const handleLoadItems = () => {
    projectsHTML = ``;
    let projectsLoding = projects.slice(6, projects.length);
    projectsLoding.forEach((project) => {
      const camelCaseCategory = camelCase(project.category);
      project.value = camelCaseCategory;
    });

    loadedProjects.push(...projectsLoding);
    projectsLoding.forEach((project) => (projectsHTML += getProjectHTML(project)));
    projectsList.insertAdjacentHTML("beforeend", projectsHTML);
    loadMoreBtn.removeEventListener("click", handleLoadItems);
    loadMoreBtn.remove();
  };
  loadMoreBtn.addEventListener("click", handleLoadItems);

  //Handle Search
  const radioBtns = document.querySelectorAll("input[type='radio'");

  radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener("click", (e) => {
      const { id } = e.target;
      let matchedProjects = loadedProjects.filter(({ value }) => value === id);
      if (id === "all") {
        matchedProjects = loadedProjects;
      }
      let projectsHTML = ``;
      matchedProjects.forEach((project) => (projectsHTML += getProjectHTML(project)));
      projectsList.innerHTML = projectsHTML;
    });
  });
};
