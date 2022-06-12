<script>
    import { fly } from "svelte/transition";
    import { fade } from "svelte/transition";
    export let show = false,dataGoods,subcat
    let Mycomponent
    const f = 'Filter' + subcat
    import(`../products/${subcat}/${f}.svelte`).then(res => Mycomponent = res.default)
    console.log(dataGoods,subcat,f)
</script>
    
<!-- {#if show}
<div class="overlay" on:click={()=> show = false} transition:fade={{duration: 300}}/>
    <nav transition:fly={{x: 450, opacity: 1}}>
        <span on:click={()=> show = false}>&#10006;</span>
        {#if Mycomponent}
	
		    <svelte:component this="{Mycomponent}" prods={dataGoods}/>
        {/if}
    </nav>
{/if} -->

<nav class:navVisible="{show}">
    <span on:click={()=> show = false}>&#10006;</span>
    {#if Mycomponent}

        <svelte:component this="{Mycomponent}" prods={dataGoods}/>
    {/if}
</nav>

<style>
    nav {
        position: fixed;top: 0; left: 100%;height: 100%;padding: 2rem 1rem 0.6rem;
        border-left: 1px solid #aaa;background: #fff;overflow-y: auto;width: 100%;z-index: 6;
    }

    .navVisible{right: 0;left: unset;}

    @media only screen and (min-width: 413px) {
      nav{width:412px}
  }
    
    .overlay {
        position: fixed;top: 0;left: 0;width: 100%;height: 100%;
        background: rgba(0, 0, 0, 0.5); cursor: default;z-index: 5;
    }

    span{cursor: pointer;font-size: xx-large;position: absolute;top: 6px;left: 40px;}
    @media only screen and (min-width: 600px) {
      span{left: 10px;font-size: x-large;}
    }
</style>