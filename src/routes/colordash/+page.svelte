<script>
    import { goto } from "$app/navigation";

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

    const handleButton = () => goto("/colordash/game")
</script>

<div class="one-btn-block superball">
    <div class="rest-content">
        <h1 class="grn-text">Color Dash</h1>
        <h2>Match the colors, pass the barriers, and break your high score!</h2>
        <p class="game-desc">Tap the Right Color to Pass the Barrier and Keep Rolling!</p>
    </div>
    <div class="bottom">
        <img class="ops" src="/items/chaseplane_ops.png" alt="">
        <button class="grn-btn" onclick={handleButton}>
            <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
            <h2 class="grn-btn-text">Start now</h2>
        </button>
    </div>
</div>

<style>
    .superball {
        background: url("/backgrounds/colordash.png") no-repeat center center;
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

    .ops {
        width: 100vw;
    }
</style>