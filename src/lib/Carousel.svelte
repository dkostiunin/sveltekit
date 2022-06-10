<script>
    // Props
    export let items, scrollBy = 1;
    import { onMount } from "svelte";
    let size,srcImage

    onMount(async () => {
      console.log(size.clientWidth)
      paginationFactor=size.clientWidth
      totalPaginationPixels = scrollBy * paginationFactor;
    })
    const test =(e)=>{srcImage=e.target.src;fullImage.style.display="block"}
    
    $: paginationFactor = 0;
    $: totalPaginationPixels = scrollBy * paginationFactor;
  
    $: offset = 0;
    $: atStart = offset === 0;
    $: atEnd = offset <= paginationFactor * (items.length - scrollBy) * -1;
  
    const move = direction => {//console.log(totalPaginationPixels)
      if (direction > 0 && !atEnd) {
        offset -= totalPaginationPixels;
      } else if (direction < 0 && !atStart) {
        offset += totalPaginationPixels;
      }
    };

    const resize = () => {paginationFactor=size.clientWidth;
      totalPaginationPixels = scrollBy * paginationFactor;
      offset=0
    console.log(size.clientWidth)};

  </script>

  <svelte:window on:resize={resize} />

  <img id="fullImage" on:click={(e) => fullImage.style.display="none"} src={srcImage} alt="e"/> 

  <div bind:this={size} id="divimg">
    <div class="items" style="transform: translateX({offset}px);">
      {#each items as item, i}
     <!--  <div class="item" style="background-color: hsla({i * 25}deg, 75%, 55%);">{item}</div> -->
     <img on:click={test} src={item} alt="eee">
      {/each}
    </div>
    <button class="left B" disabled={atStart} on:click="{() => move(-1)}">
      <span class="b2">&lsaquo;</span><span class="b1">&lsaquo;</span>&lsaquo;
    </button>
    <button class="right B" disabled={atEnd} on:click="{() => move(1)}">
      &rsaquo;<span class="b1">&rsaquo;</span><span class="b2">&rsaquo;</span>
    </button>
  </div>
  
<!--   <div class="details">
    offset: {offset}px<br>
    atStart: {atStart}<br>
    atEnd: {atEnd}
  </div> -->
  
  <style>

    #divimg {position: relative;width:80%;overflow: hidden;left: 5%;}

    #fullImage{display:none;position:fixed;width:100%;height:100%;z-index:99;background:white;top:0;left: 0;}

    .B{
      position: absolute;top: 50%;background: none;cursor: pointer;border: 0;font-size: xx-large;font-weight: bolder;
      -webkit-transform: translate(0, -50%);-moz-transform: translate(0, -50%);-ms-transform: translate(0, -50%);
      -o-transform: translate(0, -50%);transform: translate(0, -50%);
    }
    .b1{color: lightgrey;} .b2{color: white;}
    .left{left: 0;} 
    .right{
      left: 100%;
      -webkit-transform: translate(-100%, -50%);-moz-transform: translate(-100%, -50%);-ms-transform: translate(-100%, -50%);
      -o-transform: translate(-100%, -50%);transform: translate(-100%, -50%);
    }
  
    .items { display: flex;transition: transform 0.4s ease-in-out;transform: translateX(0px)}

    img{width: 100%;object-fit: contain;}

   

  
   /*  .item {
      min-width: 167px;
      height: 100px;
      margin: 0 4px;
      background-color: #ef4322;
      border-radius: 0.7rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 10rem;
      user-select: none;
      overflow: hidden;
    }
  
    .items .item:first-child {
      margin-left: 0;
    }
  
    .items .item:last-child {
      margin-right: 0;
    }
   */
 /*    .details {
      margin-top: 20px;
      font-style: italic;
      color: #9f9f9f;
    } */
  </style>