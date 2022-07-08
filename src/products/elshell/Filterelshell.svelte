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
        colautomat=prods.map(i=>i.attributes.colautomat).sort(function (a, b) {
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
        })

    let range1 = [price[0], price[price.length-1]],range2 = [colautomat[0], colautomat[colautomat.length-1]],
        range3=[height[0],height[height.length-1]],range4=[width[0],width[width.length-1]],
        range5 = [length[0], length[length.length-1]],

        brand=[],type=[],setting=[],lock=[],window=[],material=[],ipclass=[],
        fBrand=[],fType=[],fSetting=[],fLock=[],fWindow=[],fMaterial=[],fIpclass=[]

    prods.forEach(i => {
        if(!brand.map(i=>i.value).includes(i.attributes.brand)){
            brand.push({'value':i.attributes.brand, 'name':i.attributes.link.data.attributes.link.brand[i.attributes.brand]})
        }
        if(!type.map(i=>i.value).includes(i.attributes.type)){
            type.push({'value':i.attributes.type, 'name':i.attributes.link.data.attributes.link.type[i.attributes.type]})
        }
        if(!setting.map(i=>i.value).includes(i.attributes.setting)){
            setting.push({'value':i.attributes.setting, 'name':i.attributes.link.data.attributes.link.setting[i.attributes.setting]})
        }
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
        if(!lock.map(i=>i.value).includes(i.attributes.lock)){
            lock.push({'value':i.attributes.lock, 'name':i.attributes.link.data.attributes.link.lock[i.attributes.lock]})
        }
        if(!window.map(i=>i.value).includes(i.attributes.window)){
            window.push({'value':i.attributes.window, 'name':i.attributes.link.data.attributes.link.window[i.attributes.window]})
        }
        if(!ipclass.map(i=>i.value).includes(i.attributes.ipclass)){
            ipclass.push({'value':i.attributes.ipclass, 'name':i.attributes.link.data.attributes.link.ipclass[i.attributes.ipclass]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.colautomat>=range2[0]&&i.attributes.colautomat<=range2[1]))
    filtersData=filtersData.filter(i=>(i.attributes.height>=range3[0]&&i.attributes.height<=range3[1]))
    filtersData=filtersData.filter(i=>(i.attributes.width>=range4[0]&&i.attributes.width<=range4[1]))
    filtersData=filtersData.filter(i=>(i.attributes.length>=range5[0]&&i.attributes.length<=range5[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='setting'){fSetting[0]=['setting'];fSetting[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='lock'){fLock[0]=['lock'];fLock[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='window'){fWindow[0]=['window'];fWindow[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ipclass'){fIpclass[0]=['ipclass'];fIpclass[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fSetting[1]&&fSetting[1].length>0){filtersData=filtersData.filter(i=>(fSetting[1].includes(i.attributes.setting)))}
    if(fLock[1]&&fLock[1].length>0){filtersData=filtersData.filter(i=>(fLock[1].includes(i.attributes.lock)))}
    if(fWindow[1]&&fWindow[1].length>0){filtersData=filtersData.filter(i=>(fWindow[1].includes(i.attributes.window)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}
    if(fIpclass[1]&&fIpclass[1].length>0){filtersData=filtersData.filter(i=>(fIpclass[1].includes(i.attributes.ipclass)))}

    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
     console.log(filtersData)
   }

    function test(e){
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='colautomat'){
            if(range2[0]<colautomat[0]||range2[0]>=range2[1]){range2[0]=colautomat[0]}
            if(range2[1]> colautomat[colautomat.length-1]||range2[1]<=range2[0]){range2[1]= colautomat[colautomat.length-1]}
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

<div id="colautomat" class="slider">
    <p>Кол-во ячеек под автоматы</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={colautomat[0]} max={colautomat[colautomat.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div id="height" class="slider">
    <p>Высота ящика</p>
    <input type="number" bind:value={range3[0]} on:change={filtering}/>
    <Doublerange min={height[0]} max={height[height.length-1]} step="1" bind:value={range3} range order on:input={filtering}/>
    <input type="number" bind:value={range3[1]} on:change={filtering}/>
</div>

<div id="width" class="slider">
    <p>Ширина ящика</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={width[0]} max={width[width.length-1]} step="0.1" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div>

<div id="length" class="slider">
    <p>Глубина ящика</p>
    <input type="number" bind:value={range5[0]} on:change={filtering}/>
    <Doublerange min={length[0]} max={length[length.length-1]} step="0.1" bind:value={range5} range order on:input={filtering}/>
    <input type="number" bind:value={range5[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип ящика</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Вариант установки</p>
    <Multiselect id="setting" list ={setting} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал корпуса</p>
    <Multiselect id="material" list ={material} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Наличие замка</p>
    <Multiselect id="lock" list ={lock} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Наличие окна или прозр.двер</p>
    <Multiselect id="window" list ={window} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Защита от влаги/пыли</p>
    <Multiselect id="ipclass" list ={ipclass} on:message={filtering}></Multiselect>
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