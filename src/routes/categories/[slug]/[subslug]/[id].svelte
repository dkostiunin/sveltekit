<script context="module">
    import { fields } from '$lib/fields';   
    export async function load({ params, fetch }) {
      console.log(params.subslug,params.slug)
      const f=fields(params.subslug).fields
  
      const QUERY =  `{
                    categories(filters: {slug: { eq:"${params.slug}"}}){data{attributes{name}}}
                    subcats(filters: {subslug: { eq:"${params.subslug}"}}){data{ attributes{name}}}
                    ${params.subslug}(id:${params.id}){
                        data{id attributes{${f}
                        link{data{attributes{link}}}
                    }}
                    }
              }`
  
        const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
        
        const res= await fetch(import.meta.env.VITE_strapiURL, options)
                const fin= await res.json()
        return {props: {
                product:fin.data[params.subslug].data.attributes,
                catSubcat:[params.slug,params.subslug],
                namesCats:[fin.data.categories.data[0].attributes.name,fin.data.subcats.data[0].attributes.name],
                ID:fin.data[params.subslug].data.id
            }
        };
    }
</script>
   
<script>
    import Carousel from "$lib/Carousel.svelte"
    import Inputnumber from "$lib/Inputnumber.svelte"
    import Accordion from "$lib/Accordion.svelte"
    import flash from '$lib/flash.js';
    import addtocart from '$lib/addtocart';
    export let product,catSubcat,namesCats,ID
    let Mycomponent,qty
    const items=Object.values(product.listimage)
    const f = catSubcat[1][0].toUpperCase() + catSubcat[1].slice(1)
    console.log(product)
    
    import(`../../../../products/${catSubcat[1]}/${f}.svelte`).then(res => Mycomponent = res.default)

    function inBasket(e){
        flash(e)
        let cart=[]
        cart=JSON.parse(localStorage.getItem('cart'))
        addtocart(cart,qty,product,catSubcat[0],catSubcat[1],ID)
    }

</script>

<svelte:head>
	<title>{product.name}</title>
	<meta name="description" content=${product.name}/>
</svelte:head>

<div class="main">
    <nav class="nav">
        <ol>
            <li><a sveltekit:prefetch href="/categories"><p class="navP">Каталог</p></a></li>
            <li><p class="slash">/</p></li>
            <li><a sveltekit:prefetch href={`/categories/${catSubcat[0]}`}><p class="navP">{namesCats[0]}</p></a></li>
            <li><p class="slash">/</p></li>
            <li><a sveltekit:prefetch href={`/categories/${catSubcat[0]}/${catSubcat[1]}`}><p class="navP">{namesCats[1]}</p></a></li>
            <li><p class="slash">/</p></li>
            <li><p class="last">{product.name}</p></li>
        </ol>
    </nav>

    <div class="categories">
        <div class="fotoName">
            <h2 class="nameProd"> <span>{product.name}</h2>
            {#if !product.listimage}
            <img src="https://res.cloudinary.com/dxzefnveb/image/upload/v1653769068/%D1%80%D1%83%D1%81%D1%82%D0%B0%D0%BC_1_ijtxff.jpg" 
                alt={product.name}>
            {:else}
            <Carousel items={items}/>
            {/if}
                <div class="inputs">
                <Inputnumber bind:qty bind:max={product.instock}/>
                <button on:click={inBasket}>В корзину</button>
                </div>
        </div>
        <div class="descriptions">
            <div>
                <div class="price">{`${product.price} ₽`}</div>
                <div class="instock">
                    <span>{`В наличии ${product.instock}`}</span>
                    <span>{`Уже купили ${product.sold}`}</span>
                </div>
            </div>
            <Accordion>
                <span slot="head">Описание:<span class="desc">{` ${product.shortdesc} (подробнее...)`}</span></span>
                <div slot="details">
                    <p>{product.longdesc}</p>
                </div>
                <span slot="head2">Характеристики</span>
                <div slot="details2">
                    <!--  <Lamp name={product}></Lamp> -->
                    <svelte:component this="{Mycomponent}" name={product}/>
                </div>
            </Accordion>
        </div>
    </div>
    
</div>

<style>
    
    span{color: #323232;}
    .desc{color: dimgray;font-size: smaller;}

    .price{color: #ed0202;font-size: xx-large;margin-top: 20px; margin-left: 5%;}
    .instock{display: flex;justify-content: space-between;margin-top: 10px; margin-left: 5%;}
    .instock span{color: #ed0202;font-size: large;}

    .fotoName{width: 90%}
    h2{line-height: 2rem;color:#ed0202;margin-left: -1rem;}
    img{width: 100%;object-fit: contain;}
    .inputs{width: 90%;display: flex;justify-content: space-evenly;align-items: center;padding-top: 10px;}

    .descriptions{width: 90%;margin-right: 2rem; margin-left: -2rem;}

    p{margin: 0 3px;color: #323232;;}
    .slash{font-size: medium;}
    .navP{color: grey;}
    .last{color: black;}
    .nav{display: none;}

    ol{
    display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;
    -webkit-box-flex-wrap: wrap;-webkit-flex-wrap: wrap;-ms-flex-wrap: wrap;flex-wrap: wrap;
    align-items: center;-webkit-align-items: center;-webkit-box-align: center;-ms-flex-align: center;
    list-style: none;
    flex-direction: row;
    font-size: smaller;
    }

    .main{position: absolute;top:68px;width: 80%;margin: 0 10%;}
    .categories{display: flex; flex-wrap: wrap; justify-content: flex-end;width: 100%;}
    a {text-decoration: none;color: black;}

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
    
    /* .buttons{display: flex; width: 90%;height: 8%;justify-content: space-between;align-items: center;}
    .nowButton{background-color:#2e7d32} */

    @media (max-width: 960px) {
        .main{position: absolute;top:68px;width: 100%;margin: 0;}
    }

    @media only screen and (min-width: 600px) {
        .categories{justify-content: center;}
        .nav{display: block;}
        .fotoName{width: 33%;padding-left: 3%;}
        .descriptions{width: 61%;padding-right: 3%;margin-right: 0;margin-left: 0;}
        h2{margin-left: 0;}
    }

</style>