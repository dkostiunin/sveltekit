<script>
    import { fly } from "svelte/transition";
    import { fade } from "svelte/transition";
    
    export let show = false;
</script>
    
{#if show}
<div class="overlay" on:click={()=> show = false} transition:fade={{duration: 300}}/>
    <nav transition:fly={{x: 450, opacity: 1}}>
    <div>
    Hello
    </div>
    <button on:click={()=> show = false}>Close</button>
    </nav>
{/if}

<style>
    nav {
        position: fixed;top: 0; right: 0;height: 100%;padding: 2rem 1rem 0.6rem;
        border-left: 1px solid #aaa;background: #fff;overflow-y: auto;width: 100%;z-index: 6;
    }

    @media only screen and (min-width: 413px) {
      nav{width:412px}
  }
    
    .overlay {
        position: fixed;top: 0;left: 0;width: 100%;height: 100%;
        background: rgba(0, 0, 0, 0.5); cursor: default;z-index: 5;
    }
</style>