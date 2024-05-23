export const playVideo = () => {
  const videoElement = document.querySelector("video");
  const playPauseButton = document.querySelector(".video-control");
  const videoTimeElement = document.querySelector(".video__time");

  playPauseButton.addEventListener("click", () => {
    playPauseButton.classList.toggle("playing");
    if (playPauseButton.classList.contains("playing")) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  });

  videoElement.addEventListener("ended", () => {
    playPauseButton.classList.remove("playing");
  });

  videoElement.addEventListener("timeupdate", () => {
    const currentTime = videoElement.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    videoTimeElement.textContent = formattedTime;
  });
};
