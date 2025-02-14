<script lang="ts">
    import { writable } from "svelte/store";
    import { isOnboarding } from "./store";
    import { onMount } from "svelte";

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

<div>
    {#if $isLoading}
        <div>Loading</div>
    {:else if $isOnboarding}
        <div>
            Onboarding
        </div>
    {:else}
        <slot />
    {/if}
</div>