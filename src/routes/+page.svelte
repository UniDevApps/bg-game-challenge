<script lang="js">
    import Menu from "./Menu.svelte";
    import { wallet, walletCredit, walletPay } from "./store";

    const add = () => {
      walletCredit(10)
    }

    const pay = () => {
      console.log(walletPay(10))
    }
</script>

<div class="container">
  <Menu />
</div>

<style>
  .container {
    height: 100%;
    width: 100%;
  }
</style>