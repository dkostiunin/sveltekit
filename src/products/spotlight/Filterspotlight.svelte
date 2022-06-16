<script>
    export let prods,filtersData=[],yes,page
   // console.log(prods)
    import Doublerange from "$lib/doublerange/Doublerange.svelte";
    import Multiselect from "$lib/Multiselect.svelte";
    
    let price=prods.map(i=>i.attributes.price).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        md=prods.map(i=>i.attributes.mortisediam).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })
    let range1 = [price[0], price[price.length-1]],range2 = [md[0], md[md.length-1]],

        brand=[],color=[],flaskshape=[],lampholder=[],ledbacklight=[],func=[],material=[],ipclass=[],
        fBrand=[],fColor=[],fFlaskshape=[],fLampholder=[],fLedbacklight=[],fFunc=[],fMaterial=[],fIpclass=[]

        prods.forEach(i => {
        if(!brand.map(i=>i.value).includes(i.attributes.brand)){
            brand.push({'value':i.attributes.brand, 'name':i.attributes.link.data.attributes.link.brand[i.attributes.brand]})
        }
        if(!color.map(i=>i.value).includes(i.attributes.color)){
            color.push({'value':i.attributes.color, 'name':i.attributes.link.data.attributes.link.color[i.attributes.color]})
        }
        if(!flaskshape.map(i=>i.value).includes(i.attributes.flaskshape)){
            flaskshape.push({'value':i.attributes.flaskshape, 'name':i.attributes.link.data.attributes.link.flaskshape[i.attributes.flaskshape]})
        }
        if(!lampholder.map(i=>i.value).includes(i.attributes.lampholder)){
            lampholder.push({'value':i.attributes.lampholder, 'name':i.attributes.link.data.attributes.link.lampholder[i.attributes.lampholder]})
        }
        if(!ledbacklight.map(i=>i.value).includes(i.attributes.ledbacklight)){
            ledbacklight.push({'value':i.attributes.ledbacklight, 'name':i.attributes.link.data.attributes.link.ledbacklight[i.attributes.ledbacklight]})
        }
        if(!func.map(i=>i.value).includes(i.attributes.function)){
            func.push({'value':i.attributes.function, 'name':i.attributes.link.data.attributes.link.function[i.attributes.function]})
        }
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
        if(!ipclass.map(i=>i.value).includes(i.attributes.ipclass)){
            ipclass.push({'value':i.attributes.ipclass, 'name':i.attributes.link.data.attributes.link.ipclass[i.attributes.ipclass]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){console.log(yes)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.mortisediam>=range2[0]&&i.attributes.mortisediam<=range2[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='flaskshape'){fFlaskshape[0]=['flaskshape'];fFlaskshape[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='lampholder'){fLampholder[0]=['lampholder'];fLampholder[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ledbacklight'){fLedbacklight[0]=['ledbacklight'];fLedbacklight[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='func'){fFunc[0]=['func'];fFunc[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ipclass'){fIpclass[0]=['ipclass'];fIpclass[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fFlaskshape[1]&&fFlaskshape[1].length>0){filtersData=filtersData.filter(i=>(fFlaskshape[1].includes(i.attributes.flaskshape)))}
    if(fLampholder[1]&&fLampholder[1].length>0){filtersData=filtersData.filter(i=>(fLampholder[1].includes(i.attributes.lampholder)))}
    if(fLedbacklight[1]&&fLedbacklight[1].length>0){filtersData=filtersData.filter(i=>(fLedbacklight[1].includes(i.attributes.ledbacklight)))}
    if(fFunc[1]&&fFunc[1].length>0){filtersData=filtersData.filter(i=>(fFunc[1].includes(i.attributes.function)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}
    if(fIpclass[1]&&fIpclass[1].length>0){filtersData=filtersData.filter(i=>(fIpclass[1].includes(i.attributes.ipclass)))}
    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
     console.log(filtersData)
   }

</script>

<div class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div class="slider slider2">
    <p>D врезного отверстия (мм)</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={md[0]} max={md[md.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цоколь (патрон)</p>
    <Multiselect id="lampholder" list ={lampholder} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Доп. подсветка</p>
    <Multiselect id="ledbacklight" list ={ledbacklight} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Назначение</p>
    <Multiselect id="func" list ={func} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цвет арматуры</p>
    <Multiselect id="color" list ={color} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Форма светильника</p>
    <Multiselect id="flaskshape" list ={flaskshape} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал арматуры</p>
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