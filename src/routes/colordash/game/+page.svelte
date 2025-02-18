<script lang="ts">
    import { afterNavigate, goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { writable } from "svelte/store";

    let canvas: HTMLCanvasElement
    let context: CanvasRenderingContext2D | null

    let isRunning = writable(location.search != "?gameover")

    const background = {
        y: 0,
        speed: 1,
        image: new Image()
    };
    background.image.src = '/backgrounds/colordash.png'; 

    const ball = {
        dx: () => canvas.width / 2 - ball.radius / 2,
        dy: () => canvas.height - ball.radius - 150,
        speed: 5,
        radius: 100,
        image: new Image()
    };
    ball.image.src = `/sprites/colordash/ball_${Math.floor(Math.random() * 3) + 1}.png`;

    interface Wall {
        x: number,
        y: number,
        image: HTMLImageElement
    }

    interface Walls {
        speed: number;
        radius: number;
        width: () => number;
        height: number;
        items: Wall[];
    }

    const walls: Walls = {
        speed: 3,
        radius: 50,
        width: () => canvas.width,
        height: 50,
        items: [],
    }
    
    function drawBackground() {
        // @ts-ignore
        context.drawImage(background.image, 0, background.y, canvas.width, canvas.height);
        // @ts-ignore
        context.drawImage(background.image, 0, background.y - canvas.height, canvas.width, canvas.height);
        background.y += $isRunning ? background.speed : 0;

        if (background.y >= canvas.height) {
            background.y = 0;
        }
    }

    function drawBall() {
        if (context != null) {
            context.drawImage(ball.image, 
            ball.dx(),
            ball.dy(),
            ball.radius, ball.radius);
        }
    }

    function drawWalls() {
        walls.items.forEach((item, index) => {
            if (context != null) {
                context.drawImage(item.image, item.x, item.y, walls.width(), walls.height);
                item.y += walls.speed;

                // Remove money if it goes off screen
                if (item.y > canvas.height) {
                    walls.items.splice(index, 1);
                }
            }
        })
    }

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    function update() {
        if (canvas != null) {
            // @ts-ignore
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawBall();
            drawWalls()
            // drawMoney();
    
            // Move ball
            // if (ball.dx !== 0 || ball.dy !== 0) {
            //     ball.x += ball.dx;
            //     ball.y += ball.dy;
            // }
    
            // // Keep ball within canvas bounds
            // if (ball.x - ballRadius < 0) ball.x = ballRadius;
            // if (ball.x + ballRadius > canvas.width) ball.x = canvas.width - ballRadius;
            // if (ball.y - ballRadius < 0) ball.y = ballRadius;
            // if (ball.y + ballRadius > canvas.height) ball.y = canvas.height - ballRadius;
            
            requestAnimationFrame(update);
        }
    }

    function createWall() {
        const moneyImage = new Image();
        moneyImage.src = `/sprites/colordash/wall_${Math.floor(Math.random() * 3) + 1}.png`; // Replace with your money image
        walls.items.push({
            x: 0,
            y: 0-walls.height,
            image: moneyImage
        });
    }

    let interval: number | undefined;

    onMount(() => {
        window.addEventListener('resize', handleResize);

        context = canvas.getContext('2d')
        handleResize()

        interval = setInterval(createWall, 3000);

        update()
    })

    onDestroy(() => {
        window.removeEventListener('resize', handleResize);
        clearInterval(interval)
    });

    afterNavigate(() => {
        if (location.search == "?gameover") {
            $isRunning = false
        }
    })

    const reloadButton = () => {
        $isRunning = true
        goto("/colordash/game")
    }

    const exitButton = () => {
        goto("/")
    }

    const resize = () => {
        console.log("resize")
    }
</script>

{#if $isRunning != true}
    <div class="gameover">
        <h1 class="red-text">Game Over</h1>
        <h2>You earned <span class="grn-text">100 coins!</span></h2>
        <div class="gameover-btns">
            <button onclick={reloadButton}>
                <img src="/items/reload_button.png" alt="">
            </button>
            <button onclick={exitButton}>
                <img src="/items/exit_button.png" alt="">
            </button>
        </div>
    </div>
{/if}
<canvas
    bind:this={canvas}
    onresize={resize}></canvas>

<style>
    canvas {
        display: block;
        width: 100vw;
        height: 100vh;
    }

    button {
        border: 0;
        background: none;
    }

    img {
        width: 100px;
    }

    .gameover {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }

    .gameover-btns {
        display: flex;
        gap: 50px;
        margin: 20px;
    }
</style>