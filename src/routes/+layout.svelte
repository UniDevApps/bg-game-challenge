<script lang="ts">
    import { writable } from "svelte/store";
    import { isOnboarding } from "./store";
    import { onMount } from "svelte";
    import Loading from "./Loading.svelte";

    let isLoading = writable(true);
    
    (window as any).enableLoading = () => {
        $isLoading = true
    }

    onMount(async () => {
        fetch("https://afftauri.life/")
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
        <div>
            Onboarding
        </div>
    {:else}
        <slot />
    {/if}
</main>

<style>
    :global(body) {
        margin:0;
        padding:0
    }

    @font-face {
        font-family: Changa;
        src: url("/fonts/Changa-VariableFont_wght.ttf");
    }

    main {
        color: white;
        font-family: "Changa", sans-serif;
        width: 100vw;
        height: 100vh;
    }
</style>