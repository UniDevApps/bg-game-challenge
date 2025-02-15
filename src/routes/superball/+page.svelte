<script>
    const slots = [
        {
            url: "/sprites/superball/ball_1.png"
        },
        {
            url: "/sprites/superball/ball_2.png"
        },
        {
            url: "/sprites/superball/ball_3.png"
        },
        {
            url: "/sprites/superball/ball_4.png"
        },
    ]
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