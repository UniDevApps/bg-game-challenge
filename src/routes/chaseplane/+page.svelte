<script lang="ts">
    import { goto } from "$app/navigation";
    import { buyPlane, planes, selectedPlane } from "../store";

    const selectBall = (index: number) => {
        if ($planes[index].buyed == true) {
            $selectedPlane = index
        } else {
            buyPlane(index)
        }
    }

    const handleButton = () => goto("/chaseplane/game")
</script>

<div class="one-btn-block chaseplane">
    <div class="rest-content">
        <h1 class="grn-text">Chase the Plane!</h1>
        <h2>Catch the plane as it soars across the screen!</h2>
        <p class="game-desc red-text">Act fast — the clock is ticking</p>
        <p class="game-desc">Start now and prove your reflexes are unbeatable!</p>
    </div>
    <div class="bottom">
        <div class="planes">
            <h2>Choose your plane:</h2>
            <div class="slots">
                {#each $planes as plane, i}
                <button
                class={`slot ${plane.buyed ? "" : "paywall"} ${$selectedPlane == i ? "selected" : ""}`}
                onclick={() => selectBall(i)}>
                    <img src={plane.src} alt="ball">
                    {#if plane.buyed == false}
                        <div class="wall">
                            <img src="/items/lock.png" alt="">
                            <div class="price-box">
                                <p>{plane.price}</p>
                                <img src="/items/money.svg" alt="">
                            </div>
                        </div>
                    {/if}
                </button>
            {/each}
            </div>
        </div>
        <button class="grn-btn" onclick={handleButton}>
            <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
            <h2 class="grn-btn-text">Start now</h2>
        </button>
    </div>
</div>

<style>
    .chaseplane {
        background: url("/backgrounds/chaseplane.png") no-repeat center center;
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

    .planes {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px
    }

    .slots {
        display: flex;
        justify-content: space-between;
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
        color: white;
    }
    
    .slot img {
        height: 70px;
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