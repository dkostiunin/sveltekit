<script context="module">
 // import { fields } from '$lib/fields';

  export async function load({ fetch,url }) {
  //  console.log(url)
    let quer = url.searchParams.get('search')
    if (!quer) quer=''
  //console.log(params.subslug,params.slug)
  //  const f=fields(params.subslug).fields,s=params.subslug+'s'//,filt=fields(params.subslug).filters

    const QUERY =  `{
          subcats{
        data{attributes{subslug
          category{data{attributes{slug}}}
        }}
    }}`

const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
const res= await fetch(import.meta.env.VITE_strapiURL, options)
const fin= await res.json()

const cats=fin.data.subcats.data,arr=[]
 // console.log(cats)
  for (let i=cats.length-1; i>= 0; i--) {
      const s=cats[i].attributes.subslug,ss=s+'s',cat=cats[i].attributes.category.data.attributes.slug
    //  console.log(s,ss,cat)
      const QUERY2 =  `{ ${ss}(filters:{name:{containsi:"${quer}"}})
        {
          data{id attributes{
            createdAt name price shortdesc listimage instock
                  }
               }
          }
      }`
      const opt = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY2})};
      const result= await fetch(import.meta.env.VITE_strapiURL, opt)
      const prods= await result.json()
      arr.push([prods.data[ss].data,s,cat])
    }

 return {
      props: {
        products:arr
      },
   
    };
  }
</script>
 
<script>
  import {  onDestroy,onMount } from "svelte";
  import { goto } from '$app/navigation';
  let sidebar_show = false
  import Modal from '$lib/Modal.svelte';
  let modal_show = false,svgImage ,yes,New,AZ,Up,Down,Popular
  import addtocart from '$lib/addtocart';
  import flash from '$lib/flash.js';
  import { browser } from "$app/env";
  export let products

  onMount(() => {
    let returning=localStorage.getItem('return')
    if(!returning) goto(`/search`)
    else localStorage.removeItem('return')  
  })

//  console.log(products)

$: products.forEach((el,j) => {el[0].map(i=>{i.c=products[j][2];i.s=products[j][1];})});

  $:newarr=products.map(i=>i=i[0]).flat()

 console.log(newarr)
  
 // let filtersData=products

  let component, elementsVisible = [], page = 1,offset,idItem,idItem2,subcat,lastItem
  console.log(page)
  $:{
    if(component) component.addEventListener("scroll", onScroll)
   
   /*  if (browser&&localStorage.getItem('myBook')){
      idItem=localStorage.getItem('myBook')
      localStorage.removeItem('myBook')
      idItem2=localStorage.getItem('myBook2')
      localStorage.removeItem('myBook2')
      subcat=localStorage.getItem('subcat')
      localStorage.removeItem('subcat')
      lastItem=localStorage.getItem('scrollEll');
      localStorage.removeItem('scrollEll')
     // console.log(subcat,catSubcat[1],idItem,idItem2)
    } */
  }
 
  const onScroll = e => {offset =  e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop}
  onDestroy(() => {if (component) {component.removeEventListener("scroll", null)}});
  
  $:{
    if (Down){
      newarr.sort(function (a, b) {
        if (a.attributes.price < b.attributes.price) {return 1}
        if (a.attributes.price > b.attributes.price) {return -1}
        return 0;
      })
    }
    else if (Up){
      newarr.sort(function (a, b) {
        if (a.attributes.price > b.attributes.price) {return 1}
        if (a.attributes.price < b.attributes.price) {return -1}
        return 0;
      })
    }
    else if(AZ){
      newarr.sort(function (a, b) {
        if (a.attributes.name.toLowerCase() > b.attributes.name.toLowerCase()) {return 1}
        if (a.attributes.name.toLowerCase() < b.attributes.name.toLowerCase()) {return -1}
        return 0;
      })
    }
    else if (Popular){
      newarr.sort(function (a, b) {
        if (a.attributes.sold < b.attributes.sold) {return 1}
        if (a.attributes.sold > b.attributes.sold) {return -1}
        return 0;
      })
    }
    else{
      newarr.sort(function (a, b) {
        if (+new Date(a.attributes.createdAt) < +new Date(b.attributes.createdAt)) {return 1}
        if (+new Date(a.attributes.createdAt) >+new Date(b.attributes.createdAt)) {return -1}
        return 0;
      })
    }
    newarr=newarr
    page=1
  }

/*   $:{if(idItem&&subcat==catSubcat[1]){
      filtersData=JSON.parse(idItem);elementsVisible=JSON.parse(idItem2);
      page=elementsVisible.length/5
      let c=document.getElementById('mainDiv')
      if(c) c.scrollTo(0,lastItem) 
    }
    else elementsVisible=filtersData.slice(0, 5)
  } */

  $:elementsVisible=newarr.slice(0, 5)

  $:{
    if(offset<600&&page*5<newarr.length){ 
      if(elementsVisible.length+5<=newarr.length){
        elementsVisible = [...elementsVisible,...newarr.slice(page*5,(page*5)+5)]
        page++
      }
      else if(elementsVisible.length<newarr.length&&elementsVisible.length+5>newarr.length){
        elementsVisible = [...elementsVisible,...newarr.slice(page*5,(page*5)+(newarr.length-elementsVisible.length))]
        page++
      }
      console.log(elementsVisible,newarr,page)
    }
  }

  function inBasket(e){
        flash(e)
        let cart=[]
        cart=JSON.parse(localStorage.getItem('cart'))
        console.log(e.target.id,newarr[+e.target.id])
        addtocart(cart,1,newarr[+e.target.id].attributes,newarr[+e.target.id].c,newarr[+e.target.id].s,newarr[+e.target.id].id)
    }

 
  let timerId
  const checkList = (e) => {
   if(timerId)  clearInterval(timerId)
   let t=0
    timerId=setInterval(() => {
      t++
      if(t>5){
        clearInterval(timerId)
        goto(`/search?search=${e.target.value}`);
      }
    }, 100);

      
  }

</script>

<svelte:head>
	<title>Поиск по каталогу</title>
	<meta name="description" content="Поиск по каталогу"/>
</svelte:head>

<button class="sidebar2" on:click={() =>{ 
  modal_show = !modal_show
  idItem=undefined
  }}>
  <svg viewBox="0 0 24 24"><path  fill="white" d={svgImage}/></svg>
</button>
<Modal bind:show={modal_show} bind:svgImage bind:yes bind:New bind:AZ bind:Up bind:Down bind:Popular/>
<input placeholder="Искать товар…" type="text" aria-label="search" class="" value=""  on:input={checkList}>

<div bind:this={component} class="main" id="mainDiv"> 

  <div class="nav2"></div>
  
  {#each elementsVisible as el,i}
    <div class="child">

      <div class="body">
        <a sveltekit:prefetch href="{`/categories/${el.c}/${el.s}/${el.id}`}"  on:click={(e) =>{
         localStorage.setItem('return','return');
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

  input{position: fixed; top: 75px; left: calc(50% - 150px);width: 280px;
    border: none;border-radius: 4px; padding: 10px;
    background-color: #556cd6; color: white;z-index: 1;
   }
  input::placeholder {
    color: #ffffffb3;font-style: italic;
  }
  input[type=text]:focus {
  border: none;
}
  
  .nav2{display: block;margin-top: 97px;width: 100%;}

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
  .sidebar2{position: fixed;top: 120px;right: 0px;width: 48px;height: 36px;z-index: 1;}
  svg{width: 40px;}

  @media only screen and (min-width: 600px) {
      .sidebar2{right: 24px;}
      input{right: 24px;left: unset;}
  }

</style>