<script context="module">
  export async function load({ params, fetch }) {

    const QUERY =  `{
      subcats{ data{id attributes{name subslug category{data {attributes {slug} } }}} }
    }`

      const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
      const res= await fetch(import.meta.env.VITE_strapiURL, options)//
      const fin= await res.json()

      return {
            props: {subcats:fin.data.subcats.data}
          }
  }
</script>

<script>
  import Selectmui from "$lib/Selectmui.svelte"  //import Uploadlamp from "./../products/lamp/Uploadlamp.svelte";
  export let subcats
  console.log(subcats)

/*   const handleUploadInput = e => {
    console.log(38,e.target.files)
    let newImages = []
    let num = 0
    let err = ''
    const files = [...e.target.files]

    if(files.length === 0) return console.log('not files')

    files.forEach(file => {

        if(file.type !== 'image/jpeg' && file.type !== 'image/png'&&file.type !=='image/svg+xml')
        return err = 'Формат файла с изображением не правильный'

         newImages.push(file)
        return newImages;
    })
    if(err)  console.log(err)
    images=[...images, ...newImages]
  } */

</script>

<svelte:head>
	<title>Upload</title>
	<meta name="description" content="Upload"/>
</svelte:head>
  
  <div class="main">
    <Selectmui namesCats={subcats}></Selectmui>
  </div>

  <style>
    .main{position: absolute;top:68px}
  </style>