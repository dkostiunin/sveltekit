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

        brand=[],type=[],color=[],flaskshape=[],base=[],kind=[],feature=[],material=[],ipclass=[],
        fBrand=[],fType=[],fColor=[],fFlaskshape=[],fBase=[],fKind=[],fFeature=[],fMaterial=[],fIpclass=[]

    prods.forEach(i => {
        if(!brand.map(i=>i.value).includes(i.attributes.brand)){
            brand.push({'value':i.attributes.brand, 'name':i.attributes.link.data.attributes.link.brand[i.attributes.brand]})
        }
        if(!type.map(i=>i.value).includes(i.attributes.type)){
            type.push({'value':i.attributes.type, 'name':i.attributes.link.data.attributes.link.type[i.attributes.type]})
        }
        if(!color.map(i=>i.value).includes(i.attributes.color)){
            color.push({'value':i.attributes.color, 'name':i.attributes.link.data.attributes.link.color[i.attributes.color]})
        }
        if(!flaskshape.map(i=>i.value).includes(i.attributes.flaskshape)){
            flaskshape.push({'value':i.attributes.flaskshape, 'name':i.attributes.link.data.attributes.link.flaskshape[i.attributes.flaskshape]})
        }
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
        if(!base.map(i=>i.value).includes(i.attributes.base)){
            base.push({'value':i.attributes.base, 'name':i.attributes.link.data.attributes.link.base[i.attributes.base]})
        }
        if(!kind.map(i=>i.value).includes(i.attributes.kind)){
            kind.push({'value':i.attributes.kind, 'name':i.attributes.link.data.attributes.link.kind[i.attributes.kind]})
        }
        if(!feature.map(i=>i.value).includes(i.attributes.feature)){
            feature.push({'value':i.attributes.feature, 'name':i.attributes.link.data.attributes.link.feature[i.attributes.feature]})
        }
        
        if(!ipclass.map(i=>i.value).includes(i.attributes.ipclass)){
            ipclass.push({'value':i.attributes.ipclass, 'name':i.attributes.link.data.attributes.link.ipclass[i.attributes.ipclass]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}

    if(e.detail&&e.detail[0]=='kind'){fKind[0]=['kind'];fKind[1]=Object.keys(e.detail[1])}

    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='flaskshape'){fFlaskshape[0]=['flaskshape'];fFlaskshape[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='base'){fBase[0]=['base'];fBase[1]=Object.keys(e.detail[1])}

    if(e.detail&&e.detail[0]=='feature'){fFeature[0]=['feature'];fFeature[1]=Object.keys(e.detail[1])}
   
    if(e.detail&&e.detail[0]=='ipclass'){fIpclass[0]=['ipclass'];fIpclass[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fKind[1]&&fKind[1].length>0){filtersData=filtersData.filter(i=>(fKind[1].includes(i.attributes.kind)))}

    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fFlaskshape[1]&&fFlaskshape[1].length>0){filtersData=filtersData.filter(i=>(fFlaskshape[1].includes(i.attributes.flaskshape)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}
    if(fBase[1]&&fBase[1].length>0){filtersData=filtersData.filter(i=>(fBase[1].includes(i.attributes.base)))}

    if(fFeature[1]&&fFeature[1].length>0){filtersData=filtersData.filter(i=>(fFeature[1].includes(i.attributes.feature)))}
   
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
    }

</script>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Вид изделия</p>
    <Multiselect id="kind" list ={kind} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цвет</p>
    <Multiselect id="color" list ={color} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Форма корпуса</p>
    <Multiselect id="flaskshape" list ={flaskshape} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал корпуса</p>
    <Multiselect id="material" list ={material} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Внутреннее основание</p>
    <Multiselect id="base" list ={base} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Особенности</p>
    <Multiselect id="feature" list ={feature} on:message={filtering}></Multiselect>
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