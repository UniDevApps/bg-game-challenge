<script>
    const slots = [
        {
            url: "/sprites/chaseplane/plane_1.png"
        },
        {
            url: "/sprites/chaseplane/plane_2.png"
        },
        {
            url: "/sprites/chaseplane/plane_3.png"
        },
        {
            url: "/sprites/chaseplane/plane_4.png"
        },
    ]
</script>

<div class="one-btn-block superball">
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
                {#each slots as slot}
                    <div class="slot">
                        <img src={slot.url} alt="ball">
                    </div>
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
    }
    
    .slot img {
        height: 70px;
    }
</style>