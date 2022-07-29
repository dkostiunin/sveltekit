<script>
    export let prods,filtersData=[],yes,page
    console.log(prods)
    import Doublerange from "$lib/doublerange/Doublerange.svelte";
    import Multiselect from "$lib/Multiselect.svelte";
    
    let price=prods.map(i=>i.attributes.price).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        height=prods.map(i=>i.attributes.height).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        width=prods.map(i=>i.attributes.width).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        length=prods.map(i=>i.attributes.length).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        qtysock=prods.map(i=>i.attributes.qtysock).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })

    let range1 = [price[0], price[price.length-1]],range2=[qtysock[0],qtysock[qtysock.length-1]],
        range3=[height[0],height[height.length-1]],range4=[width[0],width[width.length-1]],
        range5 = [length[0], length[length.length-1]],

        brand=[],diff=[],type=[],mechtype=[],color=[],sensor=[],dimmer=[],material=[],
        fBrand=[],fDiff=[],fType=[],fMechtype=[],fColor=[],fSensor=[],fDimmer=[],fMaterial=[]

    prods.forEach(i => {
        if(!brand.map(i=>i.value).includes(i.attributes.brand)){
            brand.push({'value':i.attributes.brand, 'name':i.attributes.link.data.attributes.link.brand[i.attributes.brand]})
        }
        if(!diff.map(i=>i.value).includes(i.attributes.diff)){
            diff.push({'value':i.attributes.diff, 'name':i.attributes.link.data.attributes.link.diff[i.attributes.diff]})
        }
        if(!type.map(i=>i.value).includes(i.attributes.type)){
            type.push({'value':i.attributes.type, 'name':i.attributes.link.data.attributes.link.type[i.attributes.type]})
        }
        if(!mechtype.map(i=>i.value).includes(i.attributes.mechtype)){
            mechtype.push({'value':i.attributes.mechtype, 'name':i.attributes.link.data.attributes.link.mechtype[i.attributes.mechtype]})
        }
        if(!color.map(i=>i.value).includes(i.attributes.color)){
            color.push({'value':i.attributes.color, 'name':i.attributes.link.data.attributes.link.color[i.attributes.color]})
        }
        if(!sensor.map(i=>i.value).includes(i.attributes.sensor)){
            sensor.push({'value':i.attributes.sensor, 'name':i.attributes.link.data.attributes.link.sensor[i.attributes.sensor]})
        }
        if(!dimmer.map(i=>i.value).includes(i.attributes.dimmer)){
            dimmer.push({'value':i.attributes.dimmer, 'name':i.attributes.link.data.attributes.link.dimmer[i.attributes.dimmer]})
        }
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.qtysock>=range2[0]&&i.attributes.qtysock<=range2[1]))
    filtersData=filtersData.filter(i=>(i.attributes.height>=range3[0]&&i.attributes.height<=range3[1]))
    filtersData=filtersData.filter(i=>(i.attributes.width>=range4[0]&&i.attributes.width<=range4[1]))
    filtersData=filtersData.filter(i=>(i.attributes.length>=range5[0]&&i.attributes.length<=range5[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='diff'){fDiff[0]=['diff'];fDiff[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='mechtype'){fMechtype[0]=['mechtype'];fMechtype[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='sensor'){fSensor[0]=['sensor'];fSensor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='dimmer'){fDimmer[0]=['dimmer'];fDimmer[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fDiff[1]&&fDiff[1].length>0){filtersData=filtersData.filter(i=>(fDiff[1].includes(i.attributes.diff)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fMechtype[1]&&fMechtype[1].length>0){filtersData=filtersData.filter(i=>(fMechtype[1].includes(i.attributes.mechtype)))}
    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fSensor[1]&&fSensor[1].length>0){filtersData=filtersData.filter(i=>(fSensor[1].includes(i.attributes.sensor)))}
    if(fDimmer[1]&&fDimmer[1].length>0){filtersData=filtersData.filter(i=>(fDimmer[1].includes(i.attributes.dimmer)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}

    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
     console.log(filtersData)
   }

    function test(e){
        /* if(((e.detail[0]||e.detail[0]==0)&&e.detail[1])&&(!Number.isInteger(e.detail[0])||!Number.isInteger(e.detail[1]))){
            e.detail[0]=+e.detail[0].toFixed(1);e.detail[1]=+e.detail[1].toFixed(1)
        } */
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='qtysock'){
            if(range2[0]<qtysock[0]||range2[0]>=range2[1]){range2[0]=qtysock[0]}
            if(range2[1]> qtysock[qtysock.length-1]||range2[1]<=range2[0]){range2[1]= qtysock[qtysock.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='height'){
            if(range3[0]<height[0]||range3[0]>=range3[1]){range3[0]=height[0]}
            if(range3[1]> height[height.length-1]||range3[1]<=range3[0]){range3[1]= height[height.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='width'){
            if(range4[0]<width[0]||range4[0]>=range4[1]){range4[0]=width[0]}
            if(range4[1]> width[width.length-1]||range4[1]<=range4[0]){range4[1]= width[width.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='length'){
            if(range5[0]<length[0]||range5[0]>=range5[1]){range5[0]=length[0]}
            if(range5[1]> length[length.length-1]||range5[1]<=range5[0]){range5[1]= length[length.length-1]}
        }
    }

</script>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div id="qtysock" class="slider">
    <p>Количество ламп</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={qtysock[0]} max={qtysock[qtysock.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div id="height" class="slider">
    <p>Высота светильника</p>
    <input type="number" bind:value={range3[0]} on:change={filtering}/>
    <Doublerange min={height[0]} max={height[height.length-1]} step="1" bind:value={range3} range order on:input={filtering}/>
    <input type="number" bind:value={range3[1]} on:change={filtering}/>
</div>

<div id="width" class="slider">
    <p>Ширина (диаметр) мм</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={width[0]} max={width[width.length-1]} step="1" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div>

<div id="length" class="slider">
    <p>Длина (диаметр) мм</p>
    <input type="number" bind:value={range5[0]} on:change={filtering}/>
    <Doublerange min={length[0]} max={length[length.length-1]} step="1" bind:value={range5} range order on:input={filtering}/>
    <input type="number" bind:value={range5[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Форма/тип светильника</p>
    <Multiselect id="diff" list ={diff} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип установки/крепления</p>
    <Multiselect id="mechtype" list ={mechtype} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цоколь/патрон</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цвет корпуса</p>
    <Multiselect id="color" list ={color} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал корпуса</p>
    <Multiselect id="material" list ={material} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Сенсорное включение</p>
    <Multiselect id="sensor" list ={sensor} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Регулировка яркости</p>
    <Multiselect id="dimmer" list ={dimmer} on:message={filtering}></Multiselect>
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