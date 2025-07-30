export default function run() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  canvas.width = 480
  canvas.height = 320
  canvas.style.background = "#eee"

  const canvasCtx = canvas.getContext("2d")
  if (!canvasCtx) return

  const ballRadius = 10
  const paddleHeight = 10
  const paddleWidth = 75

  let game: NodeJS.Timeout | null = null
  let x = canvas.width / 2
  let y = canvas.height - 30
  let dx = 2
  let dy = -2
  let paddleX = (canvas.width - paddleWidth) / 2
  let rightPressed = false
  let leftPressed = false
  const brickRowCount = 5
  const brickColumnCount = 3
  const brickWidth = 75
  const brickHeight = 20
  const brickPadding = 10
  const brickOffsetTop = 30
  const brickOffsetLeft = 30

  const bricks: {x: number; y: number}[][] = []
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = {x: 0, y: 0}
    }
  }

  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)

  function keyDownHandler(e: KeyboardEvent) {
    if (e.code === "ArrowRight") {
      rightPressed = true
    } else if (e.code === "ArrowLeft") {
      leftPressed = true
    }
  }
  function keyUpHandler(e: KeyboardEvent) {
    if (e.code === "ArrowRight") {
      rightPressed = false
    } else if (e.code === "ArrowLeft") {
      leftPressed = false
    }
  }

  function drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
  }

  function drawPaddle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
  }

  function drawBricks(ctx: CanvasRenderingContext2D) {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const brickX = r * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = c * (brickHeight + brickPadding) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#0095DD"
        ctx.fill()
        ctx.closePath()
      }
    }
  }

  // eslint-disable-next-line complexity
  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall(ctx)
    drawPaddle(ctx)
    drawBricks(ctx)

    const hasHitLeftEdge = x + dx < ballRadius
    const hasHitRightEdge = x + dx > canvas.width - ballRadius

    if (hasHitLeftEdge || hasHitRightEdge) {
      dx = -dx
    }

    const hasHitTopEdge = y + dy < ballRadius
    const hasHitBottomEdge = y + dy > canvas.height - ballRadius
    const hasHitPaddle = x > paddleX && x < paddleX + paddleWidth

    if (hasHitTopEdge) {
      dy = -dy
    } else if (hasHitBottomEdge) {
      if (hasHitPaddle) {
        dy = -dy
      } else {
        if (game) clearInterval(game)
        alert("GAME OVER")
        document.location.reload()
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7
    }

    x += dx
    y += dy
  }

  function startGame(ctx: CanvasRenderingContext2D) {
    game = setInterval(() => draw(ctx), 10)
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
