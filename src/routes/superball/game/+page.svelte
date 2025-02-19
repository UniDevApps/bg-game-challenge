<script lang="ts">
    import { afterNavigate, goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { writable } from "svelte/store";
    import { selectedBall, walletCredit } from "../../store";
    
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let interval: number;

    let isRunning = writable<boolean>(location.search != "?gameover")
    let earned = writable(0)

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ball.dx = canvas.width / 2 - ball.width / 2
        ball.dy = canvas.height - ball.height - 150
    };

    const generateId = () => Math.floor(Math.random() * 4) + 1;

    const getRandomArbitrary = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }

    function checkCollision(ball: { dx: number; dy: number; width: number; height: any; }, wall: { x: number; width: any; y: number; height: any; }) {
        return ball.dx < wall.x + wall.width &&
            ball.dx + ball.width > wall.x &&
            ball.dy < wall.y + wall.height &&
            ball.dy + ball.height > wall.y;
    }

    const background = {
        y: 0,
        speed: 1,
        image: new Image()
    };
    background.image.src = '/backgrounds/superball.png'; 

    const ball = {
        dx: 0,
        dy: 0,
        speed: 5,
        width: 100,
        height: 100,
        image: new Image(),
        id: $selectedBall+1,
    };
    ball.image.src = `/sprites/superball/ball_${ball.id}.png`;

    interface Wall {
        x: number,
        y: number,
        image: HTMLImageElement,
        width: number,
        height: number
    }

    interface Walls {
        speed: number;
        radius: number;
        items: Wall[];
    }

    const walls: Walls = {
        speed: 3,
        radius: 50,
        items: [],
    }

    const wallTempletes = [
        {
            src: "/sprites/superball/wall_1.png",
            width: 150,
            height: 150
        },
        {
            src: "/sprites/superball/wall_2.png",
            width: 150,
            height: 150
        },
        {
            src: "/sprites/superball/wall_3.png",
            width: 150,
            height: 150
        },
        {
            src: "/sprites/superball/wall_4.png",
            width: 150,
            height: 100
        },
    ]

    interface MoneyItem {
        x: number,
        y: number,
        image: HTMLImageElement
    }

    interface Money {
        speed: number;
        radius: number;
        width: number;
        height: number;
        items: MoneyItem[];
    }

    const money: Money = {
        speed: 3,
        radius: 50,
        width: 40,
        height: 40,
        items: [],
    }

    function drawBackground() {
        if (context != null) {
            context.drawImage(background.image, 0, background.y, canvas.width, canvas.height);
            context.drawImage(background.image, 0, background.y - canvas.height, canvas.width, canvas.height);
            background.y += $isRunning ? background.speed : 0;
    
            if (background.y >= canvas.height) {
                background.y = 0;
            }
        }
    }
    
    function drawBall() {
        if (context != null) {
            context.drawImage(ball.image, 
            ball.dx,
            ball.dy,
            ball.width, ball.height);
        }
    }

    function drawWalls() {
        walls.items.forEach((item, index) => {
            if (context != null) {
                context.drawImage(item.image, item.x, item.y, item.width, item.height);
                
                if (checkCollision(ball, item)) {
                    $isRunning = false
                }

                item.y += $isRunning ? walls.speed : 0;

                // Remove money if it goes off screen
                if (item.y > canvas.height + item.height) {
                    walls.items.splice(index, 1);
                }
            }
        })
    }

    function drawMoney() {
        money.items.forEach((item, index) => {
            if (context != null) {
                context.drawImage(item.image, item.x, item.y - money.height, money.width, money.height);
                item.y += $isRunning ? money.speed : 0;

                // Collision detection between ball and money
                if (ball.dx < item.x + money.width &&
                    ball.dx + ball.width > item.x &&
                    ball.dy < item.y + money.height &&
                    ball.dy + ball.height > item.y) {
                    // Collision detected
                    money.items.splice(index, 1); // Remove the money item
                    walletCredit(10); // Credit the wallet
                    $earned += 10; // Increase the earned amount
                }

                // Remove money if it goes off screen
                if (item.y > canvas.height + money.height) {
                    money.items.splice(index, 1);
                }
            }
        })
    }

    function update() {
        if (context != null) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawBall();
            drawWalls();
            drawMoney();
            
            requestAnimationFrame(update);
        }
    }

    const createEntities = () => {
        if ($isRunning) {
            const wallImage = new Image();
            const id = generateId();
            wallImage.src = wallTempletes[id].src
            walls.items.push({
                x: getRandomArbitrary(0, window.innerWidth-wallTempletes[id].width),
                y: 0-wallTempletes[id].height,
                image: wallImage,
                width: wallTempletes[id].width,
                height: wallTempletes[id].height,
            })
    
            const moneyImage = new Image();
            moneyImage.src = `/sprites/superball/coin.svg`
            money.items.push({
                x: getRandomArbitrary(0, window.innerWidth-money.width),
                y: 0-money.height-150,
                image: moneyImage
            })
        }
    }

    const reloadButton = () => {
        $isRunning = true
        $earned = 0
        walls.items = []
        money.items = []
        goto("/superball/game")
    }

    const exitButton = () => {
        goto("/")
    }

    const moveBall = (event: TouchEvent) => {
        if ($isRunning) {
            ball.dx = Math.max(
                Math.min(event.touches[0].clientX-ball.width/2, canvas.width-ball.width),
                0
            )
        }
    }

    onMount(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener("touchmove", moveBall);

        context = canvas.getContext('2d')
        handleResize()

        interval = setInterval(createEntities, 3000);

        update()
    })

    onDestroy(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener("touchmove", moveBall);
        clearInterval(interval)
    });

    afterNavigate(() => {
        if (location.search == "?gameover") {
            $isRunning = false
        }
    })
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

    .gameover-img {
        width: 100px;
    }

    .gameover-btns {
        display: flex;
        gap: 50px;
        margin: 20px;
    }
</style>