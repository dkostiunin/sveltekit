<script>
    export let open = false,open2=false
      import { slide } from 'svelte/transition';
      const handleClick = () =>{open = !open;open2 = false}
      const handleClick2 = () =>{open2 = !open2;open = false}
  </script>
  
  <div class="accordion">
      
      <div class="header" on:click={handleClick}>
          <div class="text"><slot name="head"></slot></div>
          <svg class:rotate="{open}" viewBox="0 0 24 24"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
      </div>
      
      {#if open}
          <div class="details" transition:slide><slot name="details"></slot></div>
      {/if}
      
      <div class="header" on:click={handleClick2}>
          <div class="text"><slot name="head2"></slot></div>
          <svg class:rotate="{open2}" viewBox="0 0 24 24"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
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
        margin-left: 0;
        margin-right: -1.2rem;
        background-color: #e1e6eb;
      }

      svg{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 1em;
        height: 1em;
        display: inline-block;
        fill: #0000008a;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        font-size: 1.5rem;
      }

      .rotate{
          transform: rotate(180deg);
          -webkit-transition: -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
           transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }

  </style>