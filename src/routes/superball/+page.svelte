<script lang="ts">
    import { balls, buyBall, selectedBall } from "../store";

    const selectBall = (index: number) => {
        if ($balls[index].buyed == true) {
            $selectedBall = index
        } else {
            buyBall(index)
        }
    }
</script>

<div class="one-btn-block superball">
    <div class="rest-content">
        <h1 class="grn-text">Super Ball!</h1>
        <h2>Overcome sports obstacles, collect coins, and set new records!</h2>
        <p class="game-desc">Control the ball, dodge obstacles, and prove you're the champion!</p>
    </div>
    <div class="bottom">
        <div class="balls">
            <h2>Choose your ball:</h2>
            <div class="slots">
                {#each $balls as ball, i}
                    <button
                    class={`slot ${ball.buyed ? "" : "paywall"} ${$selectedBall == i ? "selected" : ""}`}
                    onclick={() => selectBall(i)}>
                        <img src={ball.src} alt="ball">
                        {#if ball.buyed == false}
                            <div class="wall">
                                <img src="/items/lock.png" alt="">
                                <div class="price-box">
                                    <p>{ball.price}</p>
                                    <img src="/items/money.svg" alt="">
                                </div>
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        </div>
        <button class="grn-btn">
            <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
            <h2 class="grn-btn-text">Start now</h2>
        </button>
    </div>
</div>

<style>
    .superball {
        background: url("/backgrounds/superball.png") no-repeat center center;
        background-size: cover;
    }

    .rest-content {
        gap: 10px;
    }

    .bottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px
    }

    .balls {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px
    }

    .slots {
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;
    }

    .slot {
        width: 100%;
        height: 80px;
        background: linear-gradient(#23EE88, #036600);
        border-radius: 5px;
        border: 1px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 200px;
        color: white;
    }

    .slot.selected {
        border: 3px solid #23EE88;
    }
    
    .slot img {
        height: 70px;
    }

    .paywall {
        position: relative;
    }

    .wall {
        position: absolute;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        border-radius: 5px;
        font-family: "Changa", sans-serif;
    }

    .wall img {
        width: 40px;
        height: 50px;
    }

    .price-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .price-box img {
        width: 20px;
        height: 15px;
    }
</style>