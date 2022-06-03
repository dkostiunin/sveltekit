<script context="module">
  import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;

</script>

<svelte:head>
	<title>Корзина</title>
	<meta name="description" content="Корзина" />
</svelte:head>
  
  <div class="main">
    <h1>Корзина</h1>
  </div>

  <style>
    .main{position: absolute;top:68px}
  </style>