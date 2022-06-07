<script>
    export let open = false,open2=false
      import { slide } from 'svelte/transition';
      const handleClick = () =>{open = !open;open2 = false}
      const handleClick2 = () =>{open2 = !open2;open = false}
  </script>
  
  <div class="accordion">
      
      <div class="header">
          <div class="text"><slot name="head"></slot>	</div>		
          <button on:click={handleClick}>+/-</button>
      </div>
      
      {#if open}
          <div class="details" transition:slide><slot name="details"></slot></div>
      {/if}
      
      <div class="header">
          <div class="text"><slot name="head2"></slot>	</div>		
          <button on:click={handleClick2}>+/-</button>
      </div>
      
      {#if open2}
          <div class="details" transition:slide><slot name="details2"></slot></div>
      {/if}
      
  </div>
  
  <style>
      div.accordion {
          margin: 1rem 0;
      }
      
      div.header {
        display:flex;
        width:100%;
        background-color: #e1e6eb;
        padding: 0.6rem;margin-bottom: 1rem;  border-radius: 4px;
      }
      
      div.header .text {
          flex: 1;
          margin-right: 5px;
      }
      
      div.details {
        padding: 1rem;
        margin-top: -1.1rem;
        margin-bottom: 1.5rem;
        margin-left: 1rem;
        margin-right: 0rem;
        background-color: #e1e6eb;
      }
  </style>