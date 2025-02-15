<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import { writable } from "svelte/store";
    import { wallet } from "./store";

    const getBackPath = (id: string) => {
        if (id == "/superball" || id == "/colordash" || id == "/chaseplane") {
            return "/";
        }
        return ""
    }

    const back_path = writable(getBackPath(window.location.pathname))
    afterNavigate(() => {
        $back_path = getBackPath(window.location.pathname)
    })
</script>

<header>
    <a class="back-btn" href={$back_path}>
        {#if $back_path != ""}
            <img class="back-btn-img" src="/items/back_button.png" alt="">
        {/if}
    </a>
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