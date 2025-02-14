<script lang="js">
    import { wallet, walletCredit, walletPay } from "./store";

    const add = () => {
      walletCredit(10)
    }

    const pay = () => {
      console.log(walletPay(10))
    }
</script>

<main class="container">
  <h1>Welcome to Tauri + Svelte</h1>
  <p>{$wallet}</p>
  <button onclick={add}>Add</button>
  <button onclick={pay}>Pay</button>
</main>