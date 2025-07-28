export default function run() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  canvas.classList.remove("hidden")
  canvas.width = 480
  canvas.height = 320
  canvas.style.background = "#eee"

  const canvasCtx = canvas.getContext("2d")
  if (!canvasCtx) return

  let x = canvas.width / 2
  let y = canvas.height - 30
  const dx = 2
  const dy = -2

  function drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
  }

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall(ctx)
    x += dx
    y += dy
  }

  setInterval(() => draw(canvasCtx), 10)
}
