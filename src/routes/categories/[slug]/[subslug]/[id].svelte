<script context="module">
    import { fields } from '$lib/fields';   
    export async function load({ params, fetch }) {
      console.log(params.subslug,params.slug)
      const f=fields(params.subslug).fields
  
      const QUERY =  `{
                    categories(filters: {slug: { contains:"${params.slug}"}}){data{attributes{name}}}
                    subcats(filters: {subslug: { contains:"${params.subslug}"}}){data{ attributes{name}}}
                    ${params.subslug}(id:${params.id}){
                        data{id attributes{${f}
                        link{data{attributes{link}}}
                    }}
                    }
              }`
  
        const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
        
        const res= await fetch(`https://teststrapikost.herokuapp.com/graphql`, options)//https://teststrapikost.herokuapp.com/graphql http://localhost:1337/graphql
                const fin= await res.json()
        return {props: {
                product:fin.data[params.subslug].data.attributes,
                catSubcat:[params.slug,params.subslug],
                namesCats:[fin.data.categories.data[0].attributes.name,fin.data.subcats.data[0].attributes.name]
            }
        };
    }
  </script>
   
   <script>
        import Carousel from "$lib/Carousel.svelte"
        import Inputnumber from "$lib/Inputnumber.svelte"
        import Accordion from "$lib/Accordion.svelte"
        import flash from '$lib/flash.js';
        export let product,catSubcat,namesCats
        const items=Object.values(product.listimage)
        console.log(product,catSubcat,namesCats)
    </script>
    
    <div class="main">
        <nav class="nav">
            <ol>
                <li><a sveltekit:prefetch href="/categories"><p>Каталог</p></a></li>
                <li><p class="slash">/</p></li>
                <li><a sveltekit:prefetch href={`/categories/${catSubcat[0]}`}><p>{namesCats[0]}</p></a></li>
                <li><p class="slash">/</p></li>
                <li><a sveltekit:prefetch href={`/categories/${catSubcat[0]}/${catSubcat[1]}`}><p>{namesCats[1]}</p></a></li>
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
                    <Inputnumber/>
                    <button on:click={flash}>В корзину</button>
                 </div>
            </div>
            <div class="descriptions">
                <Accordion>
                    <span slot="head">Описание:<span class="desc">{` ${product.shortdesc} (подробнее...)`}</span></span>
                    <div slot="details">
                        <p>{product.longdesc}</p>
                    </div>
                    <span slot="head2">This is my header2</span>
                    <div slot="details2">
                        <p class="longdesc">{product.longdesc}</p>
                    </div>
                </Accordion>
            </div>
        </div>
   
       
    </div>
  
    <style>
        
        span{color: #323232;}
        .desc{color: dimgray;font-size: smaller;}
        .longdesc{margin: 0 3px;color: #6b6666;}

        .fotoName{width: 90%}
        h2{line-height: 2rem;color:#ed0202;}
        img{width: 100%;object-fit: contain;}
        .inputs{width: 90%;display: flex;justify-content: space-evenly;align-items: center;padding-top: 10px;}

        .descriptions{width: 90%;}
  
      p{margin: 0 3px;color: grey;}
      .slash{font-size: medium;}
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
  
    /*   .child{
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
  
      .nameProd{ overflow: overlay; width: 90%;height: 13%;text-align: center;}
      .priceInstock{
        display: flex; width: 90%;height: 8%;
        justify-content: space-between;align-items: center;
        border-top: 1px solid grey; border-bottom: 1px solid grey;
      }
      .price{color: #ed0202;font-size: x-large;}
      .instock{color: #ed0202;font-size: large;}
      .instockChild{font-size: small;color:grey}
  
      */
     /*  span{word-break: break-word;} */
  
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
  
      @media (max-width: 960px) {
        .main{position: absolute;top:68px;width: 100%;margin: 0;}
    }
   /*  @media (max-width: 412px) {
        .child{ width: 120px; height: 144px;margin: 8px;}
        figcaption{font-size: smaller;}
    } */
  
    @media only screen and (min-width: 600px) {
      /* .child{ width: 200px; height: 250px;margin: 16px;}
        figcaption{font-size: large;} */
        .categories{justify-content: center;}
        .nav{display: block;}
        .fotoName{width: 33%;padding-left: 3%;}
        .descriptions{width: 61%;padding-right: 3%;}
    }
  
    </style>