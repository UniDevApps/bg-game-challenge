<script>
    import { writable } from "svelte/store";
    import { setOnboarding } from "./store";

    const onboarding_screen_idx = writable(1)

    const handleButton = () => {
        if ($onboarding_screen_idx == 3) {
            setOnboarding(false)
        } else {
            $onboarding_screen_idx += 1;
        }
    }

    const onboarding = [
        {
            label: "Master precision and focus to claim victory!",
            description: "Test your reflexes and sharpen your observation in exhilarating challenges!",
            button: "Next"
        },
        {
            label: "Pass through barriers of the same color to keep moving forward",
            description: "Tap the matching color button to change your ball's color",
            button: "Next"
        },
        {
            label: "Collect Coins and Conquer Obstacles!",
            description: "Tap the matching color button to change your ball's color",
            button: "Start now"
        },
    ]
</script>

<div id="onboarding" class="one-btn-block"
style="
    background: url(/backgrounds/onboarding_{$onboarding_screen_idx}.png) no-repeat center center;
    background-size: cover;
"
>
    <div class="rest-content">
        <h2 class="grn-text">{onboarding[$onboarding_screen_idx-1].label}</h2>
        <p>{onboarding[$onboarding_screen_idx-1].description}</p>
    </div>
    <button class="grn-btn" onclick={handleButton}>
        <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
        <h2 class="grn-btn-text">{onboarding[$onboarding_screen_idx-1].button}</h2>
    </button>
</div>

<style>
    h2 {
        padding: 0 !important;
        margin: 0 !important;
        line-height: 35px;
    }

    p {
        line-height: 25px;
    }
</style>