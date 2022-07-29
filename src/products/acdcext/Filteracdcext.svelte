<script>
    export let prods,filtersData=[],yes,page
    console.log(prods)
    import Doublerange from "$lib/doublerange/Doublerange.svelte";
    import Multiselect from "$lib/Multiselect.svelte";
    import { onMount } from 'svelte'
    
    let price=prods.map(i=>i.attributes.price).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        amper=prods.map(i=>i.attributes.amper).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        watt=prods.map(i=>i.attributes.watt).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        qtysock=prods.map(i=>i.attributes.qtysock).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        wirelength=prods.map(i=>i.attributes.wirelength).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        wirethick=prods.map(i=>i.attributes.wirethick).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })

    let range1 = [price[0], price[price.length-1]],range2 = [amper[0], amper[amper.length-1]],
        range3=[qtysock[0],qtysock[qtysock.length-1]],range4=[wirelength[0],wirelength[wirelength.length-1]],
        range5 = [wirethick[0], wirethick[wirethick.length-1]],range6 = [watt[0], watt[watt.length-1]],

        color=[],material=[],mechtype=[],ipclass=[],type=[],ground=[],switc=[],curtains=[],usb=[],
        fColor=[],fMaterial=[],fMechtype=[],fIpclass=[],fType=[],fgGround=[],fSwitc=[],fCurtains=[],fUsb=[]

    onMount(() => { 
        range4=[wirelength[0],wirelength[wirelength.length-1]]; range5 = [wirethick[0], wirethick[wirethick.length-1]]
    })


    prods.forEach(i => {
        if(!color.map(i=>i.value).includes(i.attributes.color)){
            color.push({'value':i.attributes.color, 'name':i.attributes.link.data.attributes.link.color[i.attributes.color]})
        }
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
        if(!mechtype.map(i=>i.value).includes(i.attributes.mechtype)){
            mechtype.push({'value':i.attributes.mechtype, 'name':i.attributes.link.data.attributes.link.mechtype[i.attributes.mechtype]})
        }
        if(!ipclass.map(i=>i.value).includes(i.attributes.ipclass)){
            ipclass.push({'value':i.attributes.ipclass, 'name':i.attributes.link.data.attributes.link.ipclass[i.attributes.ipclass]})
        }
        if(!type.map(i=>i.value).includes(i.attributes.type)){
            type.push({'value':i.attributes.type, 'name':i.attributes.link.data.attributes.link.type[i.attributes.type]})
        }
        if(!ground.map(i=>i.value).includes(i.attributes.ground)){
            ground.push({'value':i.attributes.ground, 'name':i.attributes.link.data.attributes.link.ground[i.attributes.ground]})
        }
        if(!switc.map(i=>i.value).includes(i.attributes.switch)){
            switc.push({'value':i.attributes.switch, 'name':i.attributes.link.data.attributes.link.switch[i.attributes.switch]})
        }
        if(!curtains.map(i=>i.value).includes(i.attributes.curtains)){
            curtains.push({'value':i.attributes.curtains, 'name':i.attributes.link.data.attributes.link.curtains[i.attributes.curtains]})
        }
        if(!usb.map(i=>i.value).includes(i.attributes.usb)){
            usb.push({'value':i.attributes.usb, 'name':i.attributes.link.data.attributes.link.usb[i.attributes.usb]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.amper>=range2[0]&&i.attributes.amper<=range2[1]))
    filtersData=filtersData.filter(i=>(i.attributes.qtysock>=range3[0]&&i.attributes.qtysock<=range3[1]))
    filtersData=filtersData.filter(i=>(i.attributes.wirelength>=range4[0]&&i.attributes.wirelength<=range4[1]))
    filtersData=filtersData.filter(i=>(i.attributes.wirethick>=range5[0]&&i.attributes.wirethick<=range5[1]))
    filtersData=filtersData.filter(i=>(i.attributes.watt>=range6[0]&&i.attributes.watt<=range6[1]))

    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='mechtype'){fMechtype[0]=['mechtype'];fMechtype[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ipclass'){fIpclass[0]=['ipclass'];fIpclass[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}

    if(e.detail&&e.detail[0]=='ground'){fgGround[0]=['ground'];fgGround[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='switch'){fSwitc[0]=['switch'];fSwitc[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='curtains'){fCurtains[0]=['curtains'];fCurtains[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='usb'){fUsb[0]=['usb'];fUsb[1]=Object.keys(e.detail[1])}

    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}
    if(fMechtype[1]&&fMechtype[1].length>0){filtersData=filtersData.filter(i=>(fMechtype[1].includes(i.attributes.mechtype)))}
    if(fIpclass[1]&&fIpclass[1].length>0){filtersData=filtersData.filter(i=>(fIpclass[1].includes(i.attributes.ipclass)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}

    if(fgGround[1]&&fgGround[1].length>0){filtersData=filtersData.filter(i=>(fgGround[1].includes(i.attributes.ground)))}
    if(fSwitc[1]&&fSwitc[1].length>0){filtersData=filtersData.filter(i=>(fSwitc[1].includes(i.attributes.switch)))}
    if(fCurtains[1]&&fCurtains[1].length>0){filtersData=filtersData.filter(i=>(fCurtains[1].includes(i.attributes.curtains)))}
    if(fUsb[1]&&fUsb[1].length>0){filtersData=filtersData.filter(i=>(fUsb[1].includes(i.attributes.usb)))}


    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
    // console.log(filtersData)
   }

    function test(e){
        if(((e.detail[0]||e.detail[0]==0)&&e.detail[1])&&(!Number.isInteger(e.detail[0])||!Number.isInteger(e.detail[1]))){
            e.detail[0]=+e.detail[0].toFixed(2);e.detail[1]=+e.detail[1].toFixed(2)
        }
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='amper'){
            if(range2[0]<amper[0]||range2[0]>=range2[1]){range2[0]=amper[0]}
            if(range2[1]> amper[amper.length-1]||range2[1]<=range2[0]){range2[1]= amper[amper.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='qtysock'){
            if(range3[0]<qtysock[0]||range3[0]>=range3[1]){range3[0]=qtysock[0]}
            if(range3[1]> qtysock[qtysock.length-1]||range3[1]<=range3[0]){range3[1]= qtysock[qtysock.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='wirelength'){
            if(range4[0]<wirelength[0]||range4[0]>=range4[1]){range4[0]=wirelength[0]}
            if(range4[1]> wirelength[wirelength.length-1]||range4[1]<=range4[0]){range4[1]= wirelength[wirelength.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='wirethick'){
            if(range5[0]<wirethick[0]||range5[0]>=range5[1]){range5[0]=wirethick[0]}
            if(range5[1]> wirethick[wirethick.length-1]||range5[1]<=range5[0]){range5[1]= wirethick[wirethick.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='watt'){
            if(range6[0]<watt[0]||range6[0]>=range6[1]){range6[0]=watt[0]}
            if(range6[1]> watt[watt.length-1]||range6[1]<=range6[0]){range6[1]= watt[watt.length-1]}
        }
    }

</script>

<div class="slider slider3">
    <p>Тип изделия</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div id="amper" class="slider">
    <p>Макс ток</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={amper[0]} max={amper[amper.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div id="watt" class="slider">
    <p>Макс мощность</p>
    <input type="number" bind:value={range6[0]} on:change={filtering}/>
    <Doublerange min={watt[0]} max={watt[watt.length-1]} step="1" bind:value={range6} range order on:input={filtering}/>
    <input type="number" bind:value={range6[1]} on:change={filtering}/>
</div>

<div id="qtysock" class="slider">
    <p>Количество гнезд</p>
    <input type="number" bind:value={range3[0]} on:change={filtering}/>
    <Doublerange min={qtysock[0]} max={qtysock[qtysock.length-1]} step="1" bind:value={range3} range order on:input={filtering}/>
    <input type="number" bind:value={range3[1]} on:change={filtering}/>
</div>

<div id="wirelength" class="slider">
    <p>Длина провода</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={wirelength[0]} max={wirelength[wirelength.length-1]} step="0.01" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div>

<div id="wirethick" class="slider">
    <p>Сечение провода</p>
    <input type="number" bind:value={range5[0]} on:change={filtering}/>
    <Doublerange min={wirethick[0]} max={wirethick[wirethick.length-1]} step="0.01" bind:value={range5} range order on:input={filtering}/>
    <input type="number" bind:value={range5[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Заземление</p>
    <Multiselect id="ground" list ={ground} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Наличие рамки/катушки</p>
    <Multiselect id="mechtype" list ={mechtype} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Выключатель</p>
    <Multiselect id="switch" list ={switc} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Защитные шторки</p>
    <Multiselect id="curtains" list ={curtains} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>USB порт</p>
    <Multiselect id="usb" list ={usb} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цвет</p>
    <Multiselect id="color" list ={color} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал корпуса</p>
    <Multiselect id="material" list ={material} on:message={filtering}></Multiselect>
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