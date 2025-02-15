<script>

    import { goto } from "$app/navigation";

</script>
<div class="menu">
    <button class="grn-btn item-1" onclick={() => goto("superball")}>
        <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
        <h2 class="grn-btn-text">Super Ball</h2>
    </button>

    <button class="grn-btn item-2" onclick={() => goto("colordash")}>
        <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
        <h2 class="grn-btn-text">Color Dash</h2>
    </button>

    <button class="grn-btn" onclick={() => goto("chaseplane")}>
        <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
        <h2 class="grn-btn-text">Chase the Plane</h2>
    </button>
</div>

<style>
    .menu {
        background: url("/backgrounds/menu.png") no-repeat center center;
        background-size: cover;
        height: 100%;
        max-width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 80px;
    }

    .item-1 {
        align-self: flex-start;
        margin-left: -50px;
    }

    .item-2 {
        align-self: flex-end;
        margin-right: -50px;
    }
</style>