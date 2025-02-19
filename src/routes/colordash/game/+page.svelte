<script lang="ts">
    import { afterNavigate, goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { writable } from "svelte/store";
    import { walletCredit } from "../../store";

    let canvas: HTMLCanvasElement
    let context: CanvasRenderingContext2D | null

    let isRunning = writable(location.search != "?gameover")

    let earned = writable(0)

    const background = {
        y: 0,
        speed: 1,
        image: new Image()
    };
    background.image.src = '/backgrounds/colordash.png'; 

    const generateId = () => Math.floor(Math.random() * 4) + 1;

    const ball = {
        dx: () => canvas.width / 2 - ball.radius / 2,
        dy: () => canvas.height - ball.radius - 150,
        speed: 5,
        radius: 100,
        image: new Image(),
        id: generateId(),
    };
    ball.image.src = `/sprites/colordash/ball_${ball.id}.png`;

    interface Wall {
        x: number,
        y: number,
        id: number,
        image: HTMLImageElement,
        paid: boolean,
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
                context.drawImage(item.image, item.x, item.y-walls.height, walls.width(), walls.height);
                item.y += $isRunning ? walls.speed : 0;

                if (item.y > ball.dy()) {
                    if (item.paid) {
                        // Remove money if it goes off screen
                        if (item.y > canvas.height + walls.height) {
                            walls.items.splice(index, 1);
                        }
                    } else {
                        item.paid = true
                        if (item.id == ball.id) {
                            walletCredit(10)
                            $earned += 10
                        } else {
                            $isRunning = false
                        }
                        console.log("Handle")
                    }
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
            
            requestAnimationFrame(update);
        }
    }

    function createWall() {
        const moneyImage = new Image();
        let id = generateId()
        moneyImage.src = `/sprites/colordash/wall_${id}.png`; // Replace with your money image
        walls.items.push({
            x: 0,
            y: 0-walls.height,
            image: moneyImage,
            paid: false,
            id: id
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
        $earned = 0
        walls.items = []
        goto("/colordash/game")
    }

    const exitButton = () => {
        goto("/")
    }

    const changeBall = (id: number) => {
        ball.id = id
        ball.image.src = `/sprites/colordash/ball_${ball.id}.png`;
    }
</script>

{#if $isRunning != true}
    <div class="gameover">
        <h1 class="red-text">Game Over</h1>
        <h2>You earned <span class="grn-text">{$earned} coins!</span></h2>
        <div class="gameover-btns">
            <button onclick={reloadButton}>
                <img class="gameover-img" src="/items/reload_button.png" alt="">
            </button>
            <button onclick={exitButton}>
                <img src="/items/exit_button.png" alt="">
            </button>
        </div>
    </div>
{/if}
<div class="choose-menu">
    <button class="choose-btn" onclick={() => changeBall(1)}>
        <img class="choose-img" src="/sprites/colordash/btn_1.svg" alt="btn">
    </button>
    <button class="choose-btn" onclick={() => changeBall(2)}>
        <img class="choose-img" src="/sprites/colordash/btn_2.svg" alt="btn">
    </button>
    <button class="choose-btn" onclick={() => changeBall(3)}>
        <img class="choose-img" src="/sprites/colordash/btn_3.svg" alt="btn">
    </button>
    <button class="choose-btn" onclick={() => changeBall(4)}>
        <img class="choose-img" src="/sprites/colordash/btn_4.svg" alt="btn">
    </button>
</div>
<canvas bind:this={canvas}></canvas>

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
        z-index: 2;
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

    .choose-menu {
        position: absolute;
        z-index: 1;
        bottom: 0;
        width: 100%;
        padding-bottom: 40px;
    }

    .choose-menu {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100vw;
    }

    .choose-btn {
        width: 100%;
    }

    .choose-img {
        width: 100%;
    }
</style>