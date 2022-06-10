<script context="module">

  export async function load({ params, fetch }) {

    const QUERY =  `{
      subcats{
        data{id attributes{name subslug category{data{attributes{slug}}}}}
         }
    }`

      const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
      const res= await fetch(import.meta.env.VITE_strapiURL, options)//
      const fin= await res.json()

      return {
            props: {
              subcats:fin.data.subcats.data
            }
          };
  }
</script>

<script>
   import Selectmui from "$lib/Selectmui.svelte"
  //import Uploadlamp from "./../products/lamp/Uploadlamp.svelte";
  export let subcats
  console.log(subcats)
  let images

  const imageUpload = async (images) => {
    let imgArr = []

    for(const item of images){
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", import.meta.env.VITE_cloud_upload_preset)
        formData.append("cloud_name", import.meta.env.VITE_cloud_name)

        const res = await fetch(import.meta.env.VITE_cloudURL, {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        deleteImage(0)
        imgArr.push({public_id: data.public_id, url: data.secure_url})
        if(images.length==imgArr.length) alert("все загружено")
    }
    //
        
    /* for(const item of images){
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", "myuploads")
        formData.append("cloud_name", "dxzefnveb")

        const res = await fetch("https://api.cloudinary.com/v1_1/dxzefnveb/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    } */

    return imgArr;
}

  const handleUploadInput = e => {
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
  }

  const deleteImage = index => {
    const newArr = [...images]
    newArr.splice(index, 1)
    images=newArr
  }
  
const handleSubmit = async(e) => {
        let media = [],key='a',listim=''
        const imgNewURL = Array.from(images).filter(img => !img.url)
          try{
            if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)
            console.log(139,media)
          }
          catch(err) {console.log(432,err)}
}

//console.log(namecut)
</script>

<svelte:head>
	<title>Upload</title>
	<meta name="description" content="Upload" />
</svelte:head>
  
  <div class="main">
    <Selectmui namesCats={subcats}></Selectmui>
    
    <input accept="image/png, image/jpeg" bind:files={images}
      id="avatar" name="avatar" multiple type="file"
    />
 
  {#if images}
    <button on:click={handleSubmit}>Upload</button>
    <div class="parentImg">
      {#each Array.from(images) as img,i}
      <div class="childImg">
        <span on:click="{() => deleteImage(i)}">X</span>
        <img src={img.url ? img.url : URL.createObjectURL(img)} alt={img.name}>
      </div>
      {/each}
    </div>
  {/if}

 
  </div>

  <style>
    .main{position: absolute;top:68px}
    img{width: 300px;}
    span{ position: absolute;right:0; font-size: xx-large;color: red;cursor: pointer;}
    .parentImg{display: flex;flex-wrap: wrap;gap: 10px;margin-left: 10px;margin-top: 10px;}
    .childImg{position: relative;}
    button{cursor: pointer;}
    button:active {color: red;}
  </style>