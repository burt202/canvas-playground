import "../style.css"

import run2DBreakout from "./games/2d-breakout"

function hideLinks() {
  const links = document.getElementById("links") as HTMLDivElement
  links.classList.add("hidden")
}

document.querySelector("a.breakout-link")?.addEventListener("click", () => {
  hideLinks()
  run2DBreakout()
})
