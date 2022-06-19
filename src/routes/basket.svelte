<!-- <script context="module">
  import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;

</script> -->

<script>
  import { browser } from '$app/env'
  import { countBasket } from '$lib/stores';
  import Inputnumber  from "$lib/Inputnumber.svelte"

  let cart

  $:if (browser){
    cart=JSON.parse(localStorage.getItem('cart'))
    console.log(cart)
  }
 

</script>

<svelte:head>
	<title>Корзина</title>
	<meta name="description" content="Корзина" />
</svelte:head>
  
<div class="main">

  <h1>Корзина</h1>
  <div class="list">
    {#if cart}
      {#each cart as el}
      <div class="child">
        <div class="content">
          <img src={el.image} alt={el.name}>
          <div>
            <p class="name">{el.name}</p>
            <p class="price">{el.price} ₽</p>
            <p class="name">В наличии: {el.instock}</p>
          </div>
        </div>
        <div class="control">
          <Inputnumber/>
         
            <svg viewBox="0 0 24 24" on:click={() =>{
              cart=cart.filter((i)=>(i.name!=el.name))
              countBasket.set(cart.length);
              cart.length==0?(localStorage.removeItem('cart'),countBasket.set('')):
                (localStorage.setItem('cart', JSON.stringify(cart)),countBasket.set(cart.length))
           }}>
             <path fill="#ed0202" d="M14.12 10.47 12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/>
           </svg>
         
        </div>
      </div>
      {/each}
    {/if}
  </div>
  <div class="checkout">
    список
  </div>

</div>

<style>
  .main{position: absolute;top:68px;display: flex;flex-wrap: wrap;width: 100%;flex-direction: column;}
  h1{width: 100%;}

  .list{width: 100%;}
  .checkout{width: 100%;}

  .child{display: flex;border-bottom: 1px solid grey;flex-wrap: wrap;}

  .content{width: 100%;display: flex;}
  .content img{width:40%;object-fit: contain;padding-left: 10px;}
  .content p{word-break: break-word; padding: 0 10px;}
  .price{color: #ed0202;font-size: x-large;}
  .name{color:#000000;}

  .control{width: 100%;display: flex;justify-content: center;gap: 20px;align-items: center;}
  .control svg{width: 50px;cursor: pointer;}

  @media only screen and (min-width: 600px) {
    .main {flex-direction: row;}
    .child{height: 200px;margin-left: 30px;margin-bottom: 20px;padding: 20px 0}
    .content{width: 80%;}
    .content img{width: 22%;}
    .control{width: 20%;flex-direction: column;}
    .list{width: 100%;}
  .checkout{width: 100%;}
  }

  @media only screen and (min-width: 960px) {
    .main {flex-direction: row;}
    .list{width: 65%;}
    .checkout{width: 35%;}
    .control svg{width:65px}
  }

  @media only screen and (min-width: 1200px) {
    .main {width: 80%;margin-left: 10%;}
   
  }
  

</style>