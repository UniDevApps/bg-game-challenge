<div class="menu">
    <button class="grn-btn item-1">
        <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
        <h2 class="grn-btn-text">Super Ball</h2>
    </button>

    <button class="grn-btn item-2">
        <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
        <h2 class="grn-btn-text">Color Dash</h2>
    </button>

    <button class="grn-btn">
        <img class="grn-btn-img" src="/items/green_button.png" alt="btn">
        <h2 class="grn-btn-text">Chase the Plane</h2>
    </button>
</div>

<style>
    .menu {
        background: url("/backgrounds/loading.png") no-repeat center center;
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