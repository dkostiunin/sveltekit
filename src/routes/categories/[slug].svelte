<script context="module">

  export async function load({ params, fetch}) {
    console.log(params.slug)
    const QUERY = `{categories(filters: {slug: { contains:"${params.slug}"} }){
        data{id attributes{name urlimage desc slug
         subcats{data{id attributes{name urlimage desc subslug}}}
       }}
     
   }}`

const options = {  method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};

const res= await fetch(import.meta.env.VITE_strapiLocal, options)//http://localhost:1337/graphql
      const fin= await res.json()
 return {
      props: {
        subcats:  fin.data.categories.data[0]
      }
    };
  }
</script>
 
 <script>
      export let subcats;
      console.log(subcats.attributes)
  </script>

<svelte:head>
	<title>Каталог</title>
	<meta name="description" content="Каталог"/>
</svelte:head>
  
  <div class="main">

    <nav class="nav">
      <ol>
        <li><a sveltekit:prefetch href="/categories"><p>Каталог</p></a></li>
        <li><p class="slash">/</p></li>
        <li><p  class="last">{subcats.attributes.name}</p></li>
      </ol>
    </nav>

    <div class="categories">
      {#each subcats.attributes.subcats.data as el}
          <a sveltekit:prefetch href={`/categories/${subcats.attributes.slug}/${el.attributes.subslug}`}>
              <figure class="child">
                  <img src={el.attributes.urlimage} alt={el.attributes.name}>
                  <figcaption>{el.attributes.name}</figcaption>
              </figure>
            </a>
      {/each}
  </div>
          {#each subcats.attributes.subcats.data as el}
              <p>{el.attributes.desc}</p>
          {/each}

  </div>

  <style>

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

    img{width: 70%;}
    figcaption{font-size: smaller;word-break: break-word;text-align: center;overflow: overlay;width: 95%;}

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
      .nav{display: block;}
  }

  </style>