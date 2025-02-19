<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { writable } from "svelte/store";
    
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let interval: number;

    let isRunning = writable<boolean>(location.search != "?gameover")
    let earned = writable(0)

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const generateId = () => Math.floor(Math.random() * 3) + 1;

    const background = {
        y: 0,
        speed: 1,
        image: new Image()
    };
    background.image.src = '/backgrounds/superball.png'; 

    const ball = {
        dx: () => canvas.width / 2 - ball.radius / 2,
        dy: () => canvas.height - ball.radius - 150,
        speed: 5,
        radius: 100,
        image: new Image(),
        id: generateId(),
    };
    ball.image.src = `/sprites/superball/ball_${ball.id}.png`;

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
            ball.dx(),
            ball.dy(),
            ball.radius, ball.radius);
        }
    }

    function update() {
        if (context != null) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawBall();
            
            requestAnimationFrame(update);
        }
    }

    const createEntities = () => {

    }

    onMount(() => {
        window.addEventListener('resize', handleResize);

        context = canvas.getContext('2d')
        handleResize()

        interval = setInterval(createEntities, 3000);

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
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        display: block;
        width: 100vw;
        height: 100vh;
    }
</style>