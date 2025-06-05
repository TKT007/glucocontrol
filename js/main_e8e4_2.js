const popupForm = document.querySelector(".div__popup-form");
const sectionForm = document.querySelector(".section-form");
const body = document.querySelector("body");

let video = document.querySelector("video");
let flagFormTimeUpdate = false;

// Observe for dynamically added video element
if (!video) {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "VIDEO") {
          video = node;
          setupVideoEvents(video);
          observer.disconnect();
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
} else {
  setupVideoEvents(video);
}

function setupVideoEvents(video) {
  video.addEventListener("ended", () => {
    // Show popup and disable background scrolling
    sectionForm.classList.remove("none");
    popupForm.classList.remove("none");
    body.style.overflow = "hidden";

    const btnClose = document.querySelector(".popup-form__btn-close");
    btnClose?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      popupForm.classList.add("none");
      body.style.overflow = "auto";
    });

    popupForm.addEventListener("click", (e) => {
      if (e.target.classList.contains("div__popup-form")) {
        popupForm.classList.add("none");
        body.style.overflow = "auto";
      }
    });
  });

  // Optional: show popup at a specific time
  /*
  video.addEventListener("timeupdate", () => {
    const timeVideo = Math.floor(video.currentTime);
    if (timeVideo > 1031 && !flagFormTimeUpdate) {
      sectionForm.classList.remove("none");
      flagFormTimeUpdate = true;
    }
  });
  */
}

// Format current date in dd/mm/yyyy
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

const currentDate = new Date();
document.querySelectorAll(".date-now").forEach((element) => {
  element.textContent = formatDate(currentDate);
});
