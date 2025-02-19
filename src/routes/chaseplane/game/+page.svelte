<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { planes, selectedPlane, walletCredit } from "../../store";
    import { writable } from "svelte/store";
    import { afterNavigate, goto } from "$app/navigation";

    let timerInterval: number;
    let planeInterval: number;
    let plane: HTMLButtonElement;

    let timer = writable<number>(60)
    let isRunning = writable<boolean>(location.search != "?gameover")
    let earned = writable(0)

    onMount(() => {
        timerInterval = setInterval(() => {
            if ($isRunning) {
                if ($timer > 0) {
                    $timer -= 1;
                } else {
                    $isRunning = false;
                }
            }
        }, 1000);

        planeInterval = setInterval(() => {
            if ($isRunning) {
                plane.style.top = getRandomArbitrary(260, window.innerHeight-150-100) + "px";
                plane.style.left = getRandomArbitrary(25, window.innerWidth-80-25) + "px";
                plane.style.display = "block";
                setTimeout(() => {
                    plane.style.display = "none";
                }, 400);
            }
        }, 5000);
    })

    onDestroy(() => {
        clearInterval(timerInterval)
        clearInterval(planeInterval)
    })

    afterNavigate(() => {
        if (location.search == "?gameover") {
            $isRunning = false
        }
    })

    const reloadButton = () => {
        $isRunning = true
        $timer = 60
        $earned = 0
        // walls.items = []
        goto("/chaseplane/game")
    }

    const exitButton = () => {
        goto("/")
    }

    const getRandomArbitrary = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }

    const handleButton = () => {
        walletCredit(10)
        $earned += 10
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
                <img class="gameover-img" src="/items/exit_button.png" alt="">
            </button>
        </div>
    </div>
{/if}
<div class="game">
    <div id="timer">
        <img class="timer-img" src="/sprites/chaseplane/timer.png" alt="timer">
        <h1 class="grn-text">{$timer}</h1>
    </div>
    <button id="plane" bind:this={plane} onclick={handleButton}>
        <img src={$planes[$selectedPlane].src} alt="plane">
    </button>
</div>

<style>
    button {
        border: 0;
        background: none;
    }

    .game {
        background: url("/backgrounds/chaseplane.png") no-repeat center center;
        background-size: cover;
        height: 100%;
    }

    #timer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 150px;
    }

    #timer h1 {
        position: absolute;
    }

    .timer-img {
        width: 100px;
    }

    #plane {
        border: 0;
        background: none;
        position: absolute;
        display: none;
        user-select: none;
    }

    #plane img {
        width: 80px;
        height: 150px;
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