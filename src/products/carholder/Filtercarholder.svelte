<script>
    export let prods,filtersData=[],yes,page
    console.log(prods)
    import Doublerange from "$lib/doublerange/Doublerange.svelte";
    import Multiselect from "$lib/Multiselect.svelte";
    
    let price=prods.map(i=>i.attributes.price).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })

    let range1 = [price[0], price[price.length-1]],

        type=[],place=[],typebind=[],extension=[],rotation=[],charger=[],
        fType=[],fPlace=[],fTypebind=[],fExtension=[],fRotation=[],fCharger=[]

    prods.forEach(i => {
        if(!type.map(i=>i.value).includes(i.attributes.type)){
            type.push({'value':i.attributes.type, 'name':i.attributes.link.data.attributes.link.type[i.attributes.type]})
        }
        if(!place.map(i=>i.value).includes(i.attributes.place)){
            place.push({'value':i.attributes.place, 'name':i.attributes.link.data.attributes.link.place[i.attributes.place]})
        }
        if(!typebind.map(i=>i.value).includes(i.attributes.typebind)){
            typebind.push({'value':i.attributes.typebind, 'name':i.attributes.link.data.attributes.link.typebind[i.attributes.typebind]})
        }
        if(!extension.map(i=>i.value).includes(i.attributes.extension)){
            extension.push({'value':i.attributes.extension, 'name':i.attributes.link.data.attributes.link.extension[i.attributes.extension]})
        }
        if(!rotation.map(i=>i.value).includes(i.attributes.rotation)){
            rotation.push({'value':i.attributes.rotation, 'name':i.attributes.link.data.attributes.link.rotation[i.attributes.rotation]})
        }
        if(!charger.map(i=>i.value).includes(i.attributes.charger)){
            charger.push({'value':i.attributes.charger, 'name':i.attributes.link.data.attributes.link.charger[i.attributes.charger]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))

    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='place'){fPlace[0]=['place'];fPlace[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='typebind'){fTypebind[0]=['typebind'];fTypebind[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='extension'){fExtension[0]=['extension'];fExtension[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='rotation'){fRotation[0]=['rotation'];fRotation[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='charger'){fCharger[0]=['charger'];fCharger[1]=Object.keys(e.detail[1])}

    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fPlace[1]&&fPlace[1].length>0){filtersData=filtersData.filter(i=>(fPlace[1].includes(i.attributes.place)))}
    if(fTypebind[1]&&fTypebind[1].length>0){filtersData=filtersData.filter(i=>(fTypebind[1].includes(i.attributes.typebind)))}
    if(fExtension[1]&&fExtension[1].length>0){filtersData=filtersData.filter(i=>(fExtension[1].includes(i.attributes.extension)))}
    if(fRotation[1]&&fRotation[1].length>0){filtersData=filtersData.filter(i=>(fRotation[1].includes(i.attributes.rotation)))}
    if(fCharger[1]&&fCharger[1].length>0){filtersData=filtersData.filter(i=>(fCharger[1].includes(i.attributes.charger)))}

    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
     console.log(filtersData)
   }

    function test(e){
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
        }
    }

</script>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Применение</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Место установки</p>
    <Multiselect id="place" list ={place} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип крепления</p>
    <Multiselect id="typebind" list ={typebind} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Наличие удлинителя</p>
    <Multiselect id="extension" list ={extension} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Возможность поворота</p>
    <Multiselect id="rotation" list ={rotation} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Встроенная зарядка</p>
    <Multiselect id="charger" list ={charger} on:message={filtering}></Multiselect>
</div>

<style>

	.slider{display: flex;position: relative; margin-top: 70px;margin-left: 10px;
        width: 350px;border-bottom: 1px solid #b8b4b4;
    }

    .slider2{margin-top: 30px;}

    .slider3{margin-top: 40px;border: none;}

    .slider p{position: absolute;left: 80px;top: -40px;}

    .slider input[type="number"] {
        display: block;
        height: 32px;line-height: 32px;width: 70px;
        padding: 0;margin: 0;border: none;
        box-sizing: border-box;
        text-align: center;
        -moz-appearance: textfield;-webkit-appearance: textfield;appearance: textfield;
    }

    .slider input[type="number"]::-webkit-outer-spin-button,
        .slider input[type="number"]::-webkit-inner-spin-button {
            display: none;
    }

</style>