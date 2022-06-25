<script context="module">
	export const prerender = true;
</script>

<svelte:head>
	<title>Все почти даром</title>
	<meta name="description" content="Все почти даром" />
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>

		Здесь можно купить дешевле
	</h1>

	<h2>
		На <a sveltekit:prefetch href="/search">Главной</a> поиск по всему каталогу
	</h2>
	<h2>
		В <a sveltekit:prefetch href="/categories">Каталоге</a> ищите по категориям
	</h2>

</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		position: absolute;
		top: 68px;
		width: 90%;		
    	padding: 0 5%;
		text-align: center;
	}

	h1 {
		width: 100%;
	}

	h1,h2{line-height: 2.4rem;}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
