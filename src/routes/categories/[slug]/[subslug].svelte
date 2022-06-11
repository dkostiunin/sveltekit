<script context="module">
  import { fields } from '$lib/fields';

  export async function load({ params, fetch }) {
    console.log(params.subslug,params.slug)
    const f=fields(params.subslug).fields,s=params.subslug+'s'

    const QUERY =  `{
      categories(filters: {slug: { contains:"${params.slug}"}}){data{attributes{name}}}
      subcats(filters: {subslug: { contains:"${params.subslug}"}}){data{ attributes{name}}}
      
      ${s}
              {data{id attributes{
                        listimage name price instock link{data{attributes{link}}}
                    }}
              }
            }`
  /*  {${s}(filters:${filt})
              {data{id attributes{
                        ${f} link{data{attributes{link}}}
                    }}
              }
            } */

const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
const res= await fetch(import.meta.env.VITE_strapiURL, options)// http://localhost:1337/graphql
const fin= await res.json()

 return {
      props: {
        products:fin.data[s].data,
        catSubcat:[params.slug,params.subslug],
        namesCats:[fin.data.categories.data[0].attributes.name,fin.data.subcats.data[0].attributes.name]
      }
    };
  }
</script>
 
 <script>
    import Sidebar from '$lib/Sidebar.svelte';
    let sidebar_show = false;

    import flash from '$lib/flash.js';
    import InfiniteScroll from "svelte-infinite-scroll";
    export let products,catSubcat,namesCats
    console.log(products,catSubcat,namesCats)

    let page = 0, size = 5, elementsVisible = [];
    $: elementsVisible = [
      ...elementsVisible,
      ...products.slice(size * page, size * (page + 1))
    ];
    $: hasMore = elementsVisible.length < products.length;
    
  </script>

<svelte:head>
	<title>Каталог</title>
	<meta name="description" content="Каталог"/>
</svelte:head>

<div class="main">
  <button class="sidebar" on:click={() => sidebar_show = !sidebar_show}>Toggle Sidebar</button>
  <Sidebar bind:show={sidebar_show} />
  <nav class="nav">
    <ol>
      <li><a sveltekit:prefetch href="/categories"><p>Каталог</p></a></li>
      <li><p class="slash">/</p></li>
      <li> <a sveltekit:prefetch href={`/categories/${catSubcat[0]}`}><p>{namesCats[0]}</p></a></li>
      <li><p class="slash">/</p></li>
      <li><p  class="last">{namesCats[1]}</p></li>
    </ol>
  </nav>
  <div class="nav2"></div>
  {#each elementsVisible as el}
    <div class="child">

      <div class="body">
        <a sveltekit:prefetch href={`/categories/${catSubcat[0]}/${catSubcat[1]}/${el.id}`}>
          {#if !el.attributes.listimage}
          <img src="https://res.cloudinary.com/dxzefnveb/image/upload/v1653769068/%D1%80%D1%83%D1%81%D1%82%D0%B0%D0%BC_1_ijtxff.jpg" 
            alt={el.attributes.name}>
          {:else}
          <img src={el.attributes.listimage.a} alt={el.attributes.name}>
          {/if}
          <div class="nameProd"> <span>{el.attributes.name}</span></div>
          <div class="priceInstock">
            <span class="price">{`${el.attributes.price} ₽`}</span>
            <span class="instock"><span class="instockChild">в наличии:</span>{` ${el.attributes.instock}`}</span>
          </div>
        </a> 
      </div>
    
      <div class="buttons">
        <button on:click={flash}>В корзину</button>
        <button on:click={flash} class="nowButton">Оформить</button>
      </div>

    </div>
  {/each}
  <InfiniteScroll {hasMore} threshold={1000} on:loadMore={() => page++} />
</div>

<style>

  p{margin: 0 3px;color: grey;}
  .slash{font-size: medium;}
  .last{color: black;}
  .nav{display: none;}
  .nav2{display: block;margin-top: 75px;width: 100%;}

  ol{
    display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;
    -webkit-box-flex-wrap: wrap;-webkit-flex-wrap: wrap;-ms-flex-wrap: wrap;flex-wrap: wrap;
    align-items: center;-webkit-align-items: center;-webkit-box-align: center;-ms-flex-align: center;
    list-style: none;
    flex-direction: row;
    font-size: smaller;
    }

  .main{
    overflow-y: scroll;height: 100vh;display: flex;flex-wrap: wrap;gap: 15px;justify-content: center;}
  
  a {text-decoration: none;color: black;}

  .child{
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 20%) 0px 7px 8px -4px, rgb(0 0 0 / 14%) 0px 12px 17px 2px, rgb(0 0 0 / 12%) 0px 5px 22px 4px;
      display: flex;
      flex-flow: column nowrap;
      width: 300px; height: 500px;
      margin: 8px;
      place-content: space-around;
      -webkit-box-align: center;
      align-items: center;
  }

  .body{width: 100%;height: 92%;}
  .nameProd{ overflow: overlay; padding: 0 2%;height: 22%;text-align: center;display: flex;align-items: center;justify-content: center;}
  .priceInstock{
    display: flex; padding: 0 2%;height: 8%;
    justify-content: space-between;align-items: center;
    border-top: 1px solid grey; border-bottom: 1px solid grey;
  }
  .price{color: #ed0202;font-size: x-large;}
  .instock{color: #ed0202;font-size: large;}
  .instockChild{font-size: small;color:grey}

  img{width: 100%;height: 65%;object-fit: contain;}

  button{
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: inherit;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 4px;
    -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: #fff;
    background-color: #556cd6;
  }
  .buttons{display: flex; width: 90%;height: 8%;justify-content: space-between;align-items: center;}
  .nowButton{background-color:#2e7d32}
  .sidebar{position: fixed;top: 75px;right: 0;}

  @media only screen and (min-width: 600px) {
      .nav{display: block;margin-top: 65px;width: 100%;}
      .nav2{display: none;}
  }

</style>