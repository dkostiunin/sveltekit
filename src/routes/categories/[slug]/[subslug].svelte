<script context="module">
  import { fields } from '$lib/fields';

  export async function load({ params, fetch }) {
    console.log(params.subslug,params.slug)
    const f=fields(params.subslug).fields,s=params.subslug+'s'//,filt=fields(params.subslug).filters

    const QUERY =  `{
      categories(filters: {slug: { contains:"${params.slug}"}}){data{attributes{name}}}
      subcats(filters: {subslug: { contains:"${params.subslug}"}}){data{ attributes{name}}}
      ${s}
              {data{id attributes{ ${f} link{data {attributes{link}} }
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
        namesCats:[fin.data.categories.data[0].attributes.name,fin.data.subcats.data[0].attributes.name],
       // filters:filt
      }
    };
  }
</script>
 
 <script>
    import Sidebar from '$lib/Sidebar.svelte';
    let sidebar_show = false

    import flash from '$lib/flash.js';
    import InfiniteScroll from "svelte-infinite-scroll";

    import { onMount } from "svelte";
    onMount(async () => {
      let s=document.getElementById('svelte-infinite-scroll')
      s.style.display="none"
    })

    export let products,catSubcat,namesCats
    let filtersData=products
   // console.log(catSubcat[1],products)

   // $: productsFilter=products.filter(i=>(console.log(filtersData)))

    let page = 0, size = 5, elementsVisible = []   
    $: elementsVisible = [
      ...elementsVisible,
      ...filtersData.slice(size * page, size * (page + 1))
    ];
    $: hasMore = elementsVisible.length < filtersData.length;

  </script>

<svelte:head>
	<title>Каталог</title>
	<meta name="description" content="Каталог"/>
</svelte:head>

<div class="main"> 
  <button class="sidebar">
    <svg viewBox="0 0 24 24" on:click={() => {sidebar_show = !sidebar_show
      }}
     >
      <path fill="white" fill-rule="evenodd" d="M19,7.17070571 C20.1651924,7.58254212 21,8.69378117 21,10 C21,11.3062188 20.1651924,12.4174579 19,12.8292943 L19,19 C19,19.5522847 18.5522847,20 18,20 C17.4477153,20 17,19.5522847 17,19 L17,12.8292943 C15.8348076,12.4174579 15,11.3062188 15,10 C15,8.69378117 15.8348076,7.58254212 17,7.17070571 L17,5 C17,4.44771525 17.4477153,4 18,4 C18.5522847,4 19,4.44771525 19,5 L19,7.17070571 Z M15,15 C15,16.3062188 14.1651924,17.4174579 13,17.8292943 L13,19 C13,19.5522847 12.5522847,20 12,20 C11.4477153,20 11,19.5522847 11,19 L11,17.8292943 C9.83480763,17.4174579 9,16.3062188 9,15 C9,13.6937812 9.83480763,12.5825421 11,12.1707057 L11,5 C11,4.44771525 11.4477153,4 12,4 C12.5522847,4 13,4.44771525 13,5 L13,12.1707057 C14.1651924,12.5825421 15,13.6937812 15,15 Z M7,7.17070571 C8.16519237,7.58254212 9,8.69378117 9,10 C9,11.3062188 8.16519237,12.4174579 7,12.8292943 L7,19 C7,19.5522847 6.55228475,20 6,20 C5.44771525,20 5,19.5522847 5,19 L5,12.8292943 C3.83480763,12.4174579 3,11.3062188 3,10 C3,8.69378117 3.83480763,7.58254212 5,7.17070571 L5,5 C5,4.44771525 5.44771525,4 6,4 C6.55228475,4 7,4.44771525 7,5 L7,7.17070571 Z"/>
    </svg>
  </button>
  <Sidebar bind:show={sidebar_show} bind:filtersData dataGoods={products} subcat={catSubcat[1]}/>
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
  
  {#each filtersData as el}
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
  
  <InfiniteScroll {hasMore} threshold={100} on:loadMore={() =>{ console.log(elementsVisible,)
    page++}}/>
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
    overflow-y: scroll;height: 100vh;display: flex;flex-wrap: wrap;gap: 15px;justify-content: center;
  }  
 
  
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
  .sidebar{position: fixed;top: 75px;right: 0px;width: 48px;height: 36px;}
  svg{width: 40px;}

  @media only screen and (min-width: 600px) {
      .nav{display: block;margin-top: 65px;width: 100%;}
      .nav2{display: none;}
      .sidebar{right: 24px;}
  }

</style>