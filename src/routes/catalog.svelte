<script context="module">
  //  import { onMount } from 'svelte';
/*   
    let finres = [];
    const QUERY_PRODS = () => `{ 
                        categories{
                        data{id attributes{name urlimage desc slug
                        subcats{data{id attributes{name}}} 
                        }}
                }
		}`

	const options = {  method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY_PRODS()})};
    onMount(async () => {//https://res.cloudinary.com/dxzefnveb/image/upload/v1653578851/jorql5rgzxlrilrlx0sy.svg
		const res= await fetch(`https://teststrapikost.herokuapp.com/graphql`, options)//https://teststrapikost.herokuapp.com/graphql http://localhost:1337/graphql
      const fin= await res.json()
      finres=fin.data.categories.data
       console.log(finres)
	}); */

   // let finres = [];
    const QUERY_PRODS = () => `{ 
                        categories{
                        data{id attributes{name urlimage desc slug
                        subcats{data{id attributes{name}}} 
                        }}
                }
		}`
        const options = {  method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY_PRODS()})};
  export async function load({ fetch }) {
    const res= await fetch(`https://teststrapikost.herokuapp.com/graphql`, options)//https://teststrapikost.herokuapp.com/graphql http://localhost:1337/graphql
      const fin= await res.json()
      /* finres=fin.data.categories.data
       console.log(finres) */
    return {
      props: {
        finres:  fin.data.categories.data
      }
    };
  }
  </script>

  <script>
      export let finres;
  </script>
  
  <div class="main">

    <a sveltekit:prefetch href="/">Go back to the landing page</a>
    <div class="categories">
        {#each finres as el}
            <a sveltekit:prefetch href="/">
                <figure class="child">
                    <img src={el.attributes.urlimage} alt={el.attributes.name}>
                    <figcaption>{el.attributes.name}</figcaption>
                </figure>
              </a>
        {/each}
    </div>
            {#each finres as el}
                <p>{el.attributes.desc}</p>           
            {/each}
  </div>

  <style>

    .main{position: absolute;top:68px;width: 80%;margin: 0 10%;}
    .categories{display: flex; flex-wrap: wrap; justify-content: center;width: 100%;}
    a {text-decoration: none;color: black;}

    .child{
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 20%) 0px 7px 8px -4px, rgb(0 0 0 / 14%) 0px 12px 17px 2px, rgb(0 0 0 / 12%) 0px 5px 22px 4px;
        display: flex;
        flex-flow: column nowrap;
        width: 120px; height: 144px;
        margin: 8px;
        place-content: space-evenly;
        -webkit-box-align: center;
        align-items: center;
    }

    img{height: 50%;}
    figcaption{font-size: smaller;word-break: break-all;
    overflow: overlay;}

    @media (max-width: 960px) {
      .main{position: absolute;top:68px;width: 100%;margin: 0;}
  }
 /*  @media (max-width: 412px) {
      .child{ width: 120px; height: 144px;margin: 8px;}
      figcaption{font-size: smaller;}
  } */

  @media only screen and (min-width: 600px) {
    .child{ width: 200px; height: 250px;margin: 16px;}
      figcaption{font-size: large;}
  }

  </style>