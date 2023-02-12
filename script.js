const videoElement = document.getElementById("video");
const share = document.getElementById("share");
const start = document.getElementById("start");
const webCam = document.getElementById("web-cam");
const video = document.createElement("video");

// Prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    // Catch Error Here
  }
}

start.addEventListener("click", async () => {
  start.disabled = true;
  await videoElement.requestPictureInPicture();
  start.disabled = false;
});

webCam.addEventListener("click", async () => {
  video.srcObject = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.play();
  video.addEventListener("loadedmetadata", () => {
    video.requestPictureInPicture().catch(console.error);
  });
});

videoElement.addEventListener("enterpictureinpicture", () => {
  start.textContent = "EXIT ";
});

videoElement.addEventListener("leavepictureinpicture", () => {
  start.textContent = "ENTER";
});

share.addEventListener("click", selectMediaStream);
