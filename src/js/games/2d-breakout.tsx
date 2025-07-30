export default function run() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  canvas.width = 480
  canvas.height = 320
  canvas.style.background = "#eee"

  const canvasCtx = canvas.getContext("2d")
  if (!canvasCtx) return

  const ballRadius = 10
  let x = canvas.width / 2
  let y = canvas.height - 30
  let dx = 2
  let dy = -2

  function drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
  }

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall(ctx)

    const hasHitLeftEdge = x + dx < ballRadius
    const hasHitRightEdge = x + dx > canvas.width - ballRadius

    if (hasHitLeftEdge || hasHitRightEdge) {
      dx = -dx
    }

    const hasHitTopEdge = y + dy < ballRadius
    const hasHitBottomEdge = y + dy > canvas.height - ballRadius

    if (hasHitTopEdge || hasHitBottomEdge) {
      dy = -dy
    }

    x += dx
    y += dy
  }

  function startGame(ctx: CanvasRenderingContext2D) {
    setInterval(() => draw(ctx), 10)
  }

  const runButton = document.getElementById(
    "runButton",
  ) as HTMLButtonElement | null
  if (!runButton) return

  runButton.addEventListener("click", () => {
    startGame(canvasCtx)
    runButton.disabled = true
  })
}
