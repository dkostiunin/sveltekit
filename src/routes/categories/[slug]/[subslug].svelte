<script context="module">
  import { fields } from '$lib/fields';

  export async function load({ params, fetch }) {
    console.log(params.slug,params.subslug)
    const f=fields(params.subslug).fields,s=params.subslug+'s'//,filt=fields(params.subslug).filters

    const QUERY =  `{
      categories(filters: {slug: { eq:"${params.slug}"}}){data{attributes{name}}}
      subcats(filters: {subslug: { eq:"${params.subslug}"}}){data{ attributes{name}}}
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
console.log(QUERY)
const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
const res= await fetch(import.meta.env.VITE_strapiURL, options)// http://localhost:1337/graphql
const fin= await res.json()
console.log(fin)
 return {
      props: {
        products:fin.data[s].data,
        catSubcat:[params.slug,params.subslug],
        namesCats:[fin.data.categories.data[0].attributes.name,fin.data.subcats.data[0].attributes.name],
      },
     /*  cache: {
        "maxage": 120,
        "private": false
      } */
    };
  }
</script>
 
<script>
   import {  onDestroy } from "svelte";
  import Sidebar from '$lib/Sidebar.svelte';
  let sidebar_show = false
  import Modal from '$lib/Modal.svelte';
  let modal_show = false,svgImage ,yes,New,AZ,Up,Down,Popular
  import addtocart from '$lib/addtocart';
  import flash from '$lib/flash.js';
  import { browser } from "$app/env";
  export let products,catSubcat,namesCats
  
  let filtersData=products

  let component, elementsVisible = [], page = 1,offset,idItem,idItem2,subcat,lastItem
  console.log(page)
  $:{
    if(component) component.addEventListener("scroll", onScroll)
   
    if (browser&&localStorage.getItem('myBook')){
      idItem=localStorage.getItem('myBook')
      localStorage.removeItem('myBook')
      idItem2=localStorage.getItem('myBook2')
      localStorage.removeItem('myBook2')
      subcat=localStorage.getItem('subcat')
      localStorage.removeItem('subcat')
      lastItem=localStorage.getItem('scrollEll');
      localStorage.removeItem('scrollEll')
     // console.log(subcat,catSubcat[1],idItem,idItem2)
    }
  }
 
  const onScroll = e => {offset =  e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop}
  onDestroy(() => {if (component) {component.removeEventListener("scroll", null)}});
  
  $:{
    if (Down){
    filtersData.sort(function (a, b) {
        if (a.attributes.price < b.attributes.price) {return 1}
        if (a.attributes.price > b.attributes.price) {return -1}
        return 0;
      })
    }
    else if (Up){
      filtersData.sort(function (a, b) {
        if (a.attributes.price > b.attributes.price) {return 1}
        if (a.attributes.price < b.attributes.price) {return -1}
        return 0;
      })
    }
    else if(AZ){
      filtersData.sort(function (a, b) {
        if (a.attributes.name.toLowerCase() > b.attributes.name.toLowerCase()) {return 1}
        if (a.attributes.name.toLowerCase() < b.attributes.name.toLowerCase()) {return -1}
        return 0;
      })
    }
    else if (Popular){
      filtersData.sort(function (a, b) {
        if (a.attributes.sold < b.attributes.sold) {return 1}
        if (a.attributes.sold > b.attributes.sold) {return -1}
        return 0;
      })
    }
    else{
      filtersData.sort(function (a, b) {
        if (+new Date(a.attributes.createdAt) < +new Date(b.attributes.createdAt)) {return 1}
        if (+new Date(a.attributes.createdAt) >+new Date(b.attributes.createdAt)) {return -1}
        return 0;
      })
    }
    filtersData=filtersData
    page=1
  }

  $:{if(idItem&&subcat==catSubcat[1]){
      filtersData=JSON.parse(idItem);elementsVisible=JSON.parse(idItem2);
      page=elementsVisible.length/5
      let c=document.getElementById('mainDiv')
      if(c) c.scrollTo(0,lastItem) 
    }
    else elementsVisible=filtersData.slice(0, 5)
  }

 /*  $:elementsVisible=filtersData.slice(0, 5) */

  $:{
    if(offset<600&&page*5<filtersData.length){ 
      if(elementsVisible.length+5<=filtersData.length){
        elementsVisible = [...elementsVisible,...filtersData.slice(page*5,(page*5)+5)]
        page++
      }
      else if(elementsVisible.length<filtersData.length&&elementsVisible.length+5>filtersData.length){
        elementsVisible = [...elementsVisible,...filtersData.slice(page*5,(page*5)+(filtersData.length-elementsVisible.length))]
        page++
      }
      //console.log(elementsVisible,filtersData,page)
    }
  }

  function inBasket(e){
        flash(e)
        let cart=[]
        cart=JSON.parse(localStorage.getItem('cart'))
        addtocart(cart,1,products[+e.target.id].attributes,catSubcat[0],catSubcat[1],products[+e.target.id].id)
    }
  
</script>

<svelte:head>
	<title>{namesCats[1]}</title>
	<meta name="description" content=${namesCats[1]}/>
</svelte:head>

<button class="sidebar2" on:click={() =>{ 
  modal_show = !modal_show
  idItem=undefined
  }}>
  <svg viewBox="0 0 24 24"><path  fill="white" d={svgImage}/></svg>
</button>
<Modal bind:show={modal_show} bind:svgImage bind:yes bind:New bind:AZ bind:Up bind:Down bind:Popular/>

<div bind:this={component} class="main" id="mainDiv"> 
  <button class="sidebar">
    <svg viewBox="0 0 24 24" on:click={() =>{
       sidebar_show = !sidebar_show
       idItem=undefined
    }}>
      <path fill="white" fill-rule="evenodd" d="M19,7.17070571 C20.1651924,7.58254212 21,8.69378117 21,10 C21,11.3062188 20.1651924,12.4174579 19,12.8292943 L19,19 C19,19.5522847 18.5522847,20 18,20 C17.4477153,20 17,19.5522847 17,19 L17,12.8292943 C15.8348076,12.4174579 15,11.3062188 15,10 C15,8.69378117 15.8348076,7.58254212 17,7.17070571 L17,5 C17,4.44771525 17.4477153,4 18,4 C18.5522847,4 19,4.44771525 19,5 L19,7.17070571 Z M15,15 C15,16.3062188 14.1651924,17.4174579 13,17.8292943 L13,19 C13,19.5522847 12.5522847,20 12,20 C11.4477153,20 11,19.5522847 11,19 L11,17.8292943 C9.83480763,17.4174579 9,16.3062188 9,15 C9,13.6937812 9.83480763,12.5825421 11,12.1707057 L11,5 C11,4.44771525 11.4477153,4 12,4 C12.5522847,4 13,4.44771525 13,5 L13,12.1707057 C14.1651924,12.5825421 15,13.6937812 15,15 Z M7,7.17070571 C8.16519237,7.58254212 9,8.69378117 9,10 C9,11.3062188 8.16519237,12.4174579 7,12.8292943 L7,19 C7,19.5522847 6.55228475,20 6,20 C5.44771525,20 5,19.5522847 5,19 L5,12.8292943 C3.83480763,12.4174579 3,11.3062188 3,10 C3,8.69378117 3.83480763,7.58254212 5,7.17070571 L5,5 C5,4.44771525 5.44771525,4 6,4 C6.55228475,4 7,4.44771525 7,5 L7,7.17070571 Z"/>
    </svg>
  </button> 
  <Sidebar bind:show={sidebar_show} bind:page bind:filtersData dataGoods={products} subcat={catSubcat[1]} instock={yes}/>  
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
  
  {#each elementsVisible as el,i}
    <div class="child">

      <div class="body">
        <a sveltekit:prefetch href={`/categories/${catSubcat[0]}/${catSubcat[1]}/${el.id}`} on:click={(e) =>{
          localStorage.setItem('myBook', JSON.stringify(filtersData ));
          localStorage.setItem('myBook2', JSON.stringify(elementsVisible ));
          localStorage.setItem('scrollEll',component.scrollTop);
          localStorage.setItem('subcat', catSubcat[1]);
        }}>
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
        <button id={i} on:click={inBasket}>В корзину</button>
        <button on:click={flash} class="nowButton">Оформить</button>
      </div>

    </div>
  {/each}
  
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
  @media (min-width: 960px) {
    .main{padding: 0 10%;}
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
  .sidebar{position: fixed;top: 75px;right: 0px;width: 48px;height: 36px;z-index: 1;}
  .sidebar2{position: fixed;top: 120px;right: 0px;width: 48px;height: 36px;z-index: 1;}
  svg{width: 40px;}

  @media only screen and (min-width: 600px) {
      .nav{display: block;margin-top: 65px;width: 100%;}
      .nav2{display: none;}
      .sidebar,.sidebar2{right: 24px;}
  }

</style>