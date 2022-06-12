<script>
    export let prods
    let Mycomponent
   // import(`../products/${subcat}/${f}.svelte`).then(res => Mycomponent = res.default)
    console.log(prods)
    import Doublerange from "$lib/doublerange/Doublerange.svelte";
    let range2 = [30, 40];

   
</script>

<div class="slider">
   <Doublerange max="200" step="10" bind:value={range2} range order/>
   left: {range2[0]}
    right: {range2[1]}
    <input type="number" bind:value={range2[0]}/>
    <input type="number"  bind:value={range2[1]}/>

</div>

<style>

	.slider{
		margin-top:100px;width:200px
	}
</style>