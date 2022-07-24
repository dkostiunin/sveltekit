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
        lm=prods.map(i=>i.attributes.luminous).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        wirelength=prods.map(i=>i.attributes.wirelength).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })

    let range1 = [price[0], price[price.length-1]],range3 = [lm[0], lm[lm.length-1]],
                    range4=[wirelength[0],wirelength[wirelength.length-1]],

        brand=[],type=[],mechtype=[],color=[],material=[],ground=[],switc=[],ipclass=[],
        fBrand=[],fType=[],fMechtype=[],fColor=[],fMaterial=[],fgGround=[],fSwitc=[],fIpclass=[]

    prods.forEach(i => {
        if(!brand.map(i=>i.value).includes(i.attributes.brand)){
            brand.push({'value':i.attributes.brand, 'name':i.attributes.link.data.attributes.link.brand[i.attributes.brand]})
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
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
        if(!ground.map(i=>i.value).includes(i.attributes.ground)){
            ground.push({'value':i.attributes.ground, 'name':i.attributes.link.data.attributes.link.ground[i.attributes.ground]})
        }
        if(!switc.map(i=>i.value).includes(i.attributes.switch)){
            switc.push({'value':i.attributes.switch, 'name':i.attributes.link.data.attributes.link.switch[i.attributes.switch]})
        }
        if(!ipclass.map(i=>i.value).includes(i.attributes.ipclass)){
            ipclass.push({'value':i.attributes.ipclass, 'name':i.attributes.link.data.attributes.link.ipclass[i.attributes.ipclass]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.luminous>=range3[0]&&i.attributes.luminous<=range3[1]))
    filtersData=filtersData.filter(i=>(i.attributes.wirelength>=range4[0]&&i.attributes.wirelength<=range4[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='mechtype'){fMechtype[0]=['mechtype'];fMechtype[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ground'){fgGround[0]=['ground'];fgGround[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='switch'){fSwitc[0]=['switch'];fSwitc[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ipclass'){fIpclass[0]=['ipclass'];fIpclass[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fMechtype[1]&&fMechtype[1].length>0){filtersData=filtersData.filter(i=>(fMechtype[1].includes(i.attributes.mechtype)))}
    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}
    if(fgGround[1]&&fgGround[1].length>0){filtersData=filtersData.filter(i=>(fgGround[1].includes(i.attributes.ground)))}
    if(fSwitc[1]&&fSwitc[1].length>0){filtersData=filtersData.filter(i=>(fSwitc[1].includes(i.attributes.switch)))}
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
        else if(e.target&&e.target.parentElement.id=='lm'){
            if(range3[0]<lm[0]||range3[0]>=range3[1]){range3[0]=lm[0]}
            if(range3[1]> lm[lm.length-1]||range3[1]<=range3[0]){range3[1]= lm[lm.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='wirelength'){
            if(range4[0]<wirelength[0]||range4[0]>=range4[1]){range4[0]=wirelength[0]}
            if(range4[1]> wirelength[wirelength.length-1]||range4[1]<=range4[0]){range4[1]= wirelength[wirelength.length-1]}
        }
    }

</script>

<div class="slider slider3">
    <p>Вид фонаря</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div  id="lm" class="slider slider2">
    <p>Световой поток (люмен)</p>
    <input type="number" bind:value={range3[0]} on:change={filtering}/>
    <Doublerange min={lm[0]} max={lm[lm.length-1]} step="5" bind:value={range3} range order on:input={filtering}/>
    <input type="number" bind:value={range3[1]} on:change={filtering}/>
</div>

<div id="wirelength" class="slider">
    <p>Дальность освещения (м)</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={wirelength[0]} max={wirelength[wirelength.length-1]} step="0.1" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип питания</p>
    <Multiselect id="mechtype" list ={mechtype} on:message={filtering}></Multiselect>
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
    <p>Фокусировка</p>
    <Multiselect id="ground" list ={ground} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Регулировка яркости</p>
    <Multiselect id="switch" list ={switc} on:message={filtering}></Multiselect>
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