<script context="module">
  /* import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true; */

</script>

<svelte:head>
	<title>Корзина</title>
	<meta name="description" content="Корзина" />
</svelte:head>
  
<div class="main">
  <h1>Корзина</h1>
  <div class="list">
Оформить
  </div>
  <div class="checkout">
    список
  </div>
</div>

<style>
  .main{position: absolute;top:68px;display: flex;flex-wrap: wrap;width: 100%;}
  h1{width: 100%;}
  .list{width: 65%;}
  .checkout{width: 35%;}
</style>