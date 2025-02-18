<script>
    import { afterNavigate, goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    /**
     * @type {HTMLCanvasElement}
     */
    let canvas
    /**
     * @type {CanvasRenderingContext2D | null}
     */
    let context

    let isRunning = writable(location.search != "?gameover")

    const background = {
        y: 0,
        speed: 1,
        image: new Image()
    };
    background.image.src = '/backgrounds/colordash.png'; 
    
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

    function update() {
        // @ts-ignore
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        // drawBall();
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

    onMount(() => {
        context = canvas.getContext('2d')

        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;

        update()
    })

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