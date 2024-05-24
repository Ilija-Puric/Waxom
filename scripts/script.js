import "../styles/styles.scss";
import { loadProjects } from "./loadProjects";
import { initilizeSwiper } from "./initSwiper";
import { playVideo } from "./playVideo";
import { setAnimations } from "./animations";

setAnimations();
initilizeSwiper();
loadProjects();
playVideo();
