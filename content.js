// Add event listeners for when the user is inactive or active on the window
let timeout;
let isUserActive = true;

// function resetTimeout() {
//   isUserActive = true;
//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     isUserActive = false;
//     pauseVideos();
//   }, 3000);  // Pause after 3 seconds of inactivity
// }

function pauseVideos() {
  let videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    if (!video.paused) {
      video.pause();
    }
  });
}

function resumeVideos() {
  let videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    if (video.paused) {
      video.play();
    }
  });
}

// Detect user activity (mousemove, keypress, etc.)
// window.addEventListener('mousemove', resetTimeout);
// window.addEventListener('keypress', resetTimeout);

// If user is active and switches tab or window, resume videos
window.addEventListener('focus', () => {
  if (isUserActive) {
    resumeVideos();
  }
});



// Pause videos when user switches away
window.addEventListener('blur', pauseVideos);
