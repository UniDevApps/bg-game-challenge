<script>
    import { wallet } from "./store";

    $: currentPath = window.location.pathname
</script>

<header>
    <button class="back-btn">
        {#if currentPath != "/"}
            <img class="back-btn-img" src="/items/back_button.png" alt="">
        {/if}
    </button>
    <div class="wallet">
        <h2>{$wallet}</h2>
        <img class="wallet-img" src="/items/money.svg" alt="Money">
    </div>
</header>

<style>
    header {
        position: absolute;
        width: 100%;
        padding: 20px;
        padding-top: 40px;
        display: flex;
        justify-content: space-between;
    }

    .wallet {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 50px;
    }

    .wallet-img {
        width: 30px;
    }

    .back-btn {
        border: none;
        background: none;
    }

    .back-btn-img {
        height: 50px;
    }
</style>