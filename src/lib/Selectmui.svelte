<script>
	export let namesCats
	let namecat,idCat,Mycomponent,link, images
	console.log(namesCats)

	async function getLinks(subcat){
		const QUERY =  `{
			links(filters:{name:{contains:"${subcat}"}}){ data{id attributes{link}} }
			subcats(filters:{subslug:{contains:"${subcat}"}}){ data{id}}
	  }`  
		const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
		const res= await fetch(import.meta.env.VITE_strapiLocal, options)
		link= await res.json()
	}

	async function postToStrapi(subcat,fields,images){
		const QUERY =  `mutation{
          ${subcat}(data:{ ${fields} listimage:{${images}} })
          {data {attributes{name}} }
		}`
		const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
		const res= await fetch(import.meta.env.VITE_strapiLocal, options)
		const finres= await res.json()
		console.log(finres)
		
		if(finres.errors){alert('Что то пошло не так, возможно наименование или артикул не уникальны (уже существуют)')}
		else{Mycomponent=null;alert('Успешно загружено')}		
	}

	const changeCategory = (e)=>{
		console.log(e.target.id,e.target.nextElementSibling.textContent);idCat=e.target.id;namecat='Upload'+idCat
			getLinks(e.target.id).
				then(()=> import(`../products/${e.target.id}/${namecat}.svelte`)).
				then(res => Mycomponent = res.default)
		}
	const loadToStrapi = async (e)=>{
		if(document.getElementById('article').value==''||document.getElementById('name').value==''){alert('Нужно заполнить название и артикул')}
		else {
			try{
				let media = [],key='a',listim='',imgNewURL=[]
				
				if(images) imgNewURL = Array.from(images).filter(img => !img.url)				
				if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)
				if(media.length>0){
					for (let i=media.length-1; i>= 0; i--) {
					listim=listim+key+':"'+media[i].url+'",'
					key='a'+i
					}
				}
				else listim='a:"https://res.cloudinary.com/dxzefnveb/image/upload/v1653578851/jorql5rgzxlrilrlx0sy.svg"'
				console.log(139,listim)
				
				const inputs= document.getElementById('listValues')?.querySelectorAll('textarea,input')
				let fileds=''
				const finInp=Object.entries(inputs).filter(i=>i[1].value!="")
				finInp.forEach(j => {
					if(j[1].type=='textarea'){fileds=fileds+j[1].id+':'+'"'+j[1].value+'" '}
					else if(j[1].type=='text'||j[1].type=='number'){fileds=fileds+j[1].id+':'+j[1].value+' '}
					})
				fileds=fileds+'subcat:'+link.data.subcats.data[0].id+' '+'link:'+link.data.links.data[0].id
				const s='create'+idCat[0].toUpperCase() + idCat.slice(1)//createLamp
				console.log(s,fileds)
				postToStrapi(s,fileds,listim)
			}
			catch(err) {console.log(432,err);alert('Что то пошло не так, возможно наименование или артикул не уникальны (уже существуют). Или фотографии не загрузились на сервер')}
		}
	}
	const imageUpload = async (images) => {
		let imgArr = []
		for(const item of images){
			const formData = new FormData()
			formData.append("file", item)
			formData.append("upload_preset", import.meta.env.VITE_cloud_upload_preset)
			formData.append("cloud_name", import.meta.env.VITE_cloud_name)

			const res = await fetch(import.meta.env.VITE_cloudURL,{method: "POST",body: formData})
			const data = await res.json()

			deleteImage(0)
			imgArr.push({public_id: data.public_id, url: data.secure_url})
			//if(images.length==imgArr.length) alert("все загружено")
		}
		return imgArr;
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
		if(media.length>0){
            for (let i=media.length-1; i>= 0; i--) {
              listim=listim+key+':"'+media[i].url+'",'
              key='a'+i
            }
          }
          else listim='a:"https://res.cloudinary.com/dxzefnveb/image/upload/v1653578851/jorql5rgzxlrilrlx0sy.svg"'
          console.log(139,listim)
		}
		catch(err) {console.log(432,err)}
	}
 </script>

<div class="select" tabindex="1">
	<input class="selectopt" name="test" type="radio" id="opt1" checked on:change={() => Mycomponent=null}>
	<label for="opt1" class="option">Выберите категорию</label>
	{#each namesCats as el}
	 <input class="selectopt" name="test" type="radio" id={el.attributes.subslug}  on:change={changeCategory}>
	<label for={el.attributes.subslug} class="option">{el.attributes.name}</label>
      {/each}
</div>

{#if Mycomponent}
	<div>
		<svelte:component this="{Mycomponent}" links={link}/>
	</div>
	<input accept="image/png, image/jpeg" bind:files={images} id="inputImg" multiple type="file"/>

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

	<button on:click={loadToStrapi}>Загрузить на сервер</button>
{/if}

<style>
	#inputImg{position: unset;opacity: 1;}
	img{width: 300px;}
    span{ position: absolute;right:0; font-size: xx-large;color: red;cursor: pointer;}
    .parentImg{display: flex;flex-wrap: wrap;gap: 10px;margin-left: 10px;margin-top: 10px;}
    .childImg{position: relative;}
    button{cursor: pointer;}
    button:active {color: red;}

	.select {display:flex;flex-direction: column;position:relative;width:250px;height:40px;margin: 10px;}
	
	.option {
	  padding:0 30px 0 10px;
	  min-height:40px;
	  display:flex;
	  align-items:center;
	  background:rgb(229, 236, 238);
	  border-top:#222 solid 1px;
	  position:absolute;
	  top:0;
	  width: 100%;
	  pointer-events:none;
	  order:2;
	  z-index:1;
	  transition:background .4s ease-in-out;
	  box-sizing:border-box;
	  overflow:hidden;
	  white-space:nowrap;
	  
	}
	
	.option:hover {
	  background:#e3e0e0;
	}
	
	.select:focus .option {
	  position:relative;
	  pointer-events:all;
	}
	
	input {
	  opacity:0;
	  position:absolute;
	  left:-99999px;
	}
	
	input:checked + label {
	  order: 1;
	  z-index:2;
	  background:rgb(227, 224, 224);
	  border-top:none;
	  position:relative;
	}
	
	input:checked + label:after {
	  content:'';
	  width: 0; 
		height: 0; 
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid white;
	  position:absolute;
	  right:10px;
	  top:calc(50% - 2.5px);
	  pointer-events:none;
	  z-index:3;
	}
	
	input:checked + label:before {
	  position:absolute;
	  right:0;
	  height: 40px;
	  width: 40px;
	  content: '';
	  background:#666;
	}
</style>