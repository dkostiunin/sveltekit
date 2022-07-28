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

    let range1 = [price[0], price[price.length-1]], 
        range4=[width[0],width[width.length-1]],range5 = [length[0], length[length.length-1]],

        brand=[],type=[],mechtype=[],color=[],material=[],base=[],ground=[],typebind=[],rotation=[],ledbacklight=[],
        fBrand=[],fType=[],fMechtype=[],fColor=[],fMaterial=[],fBase=[],fgGround=[],fTypebind=[],fRotation=[],fLedbacklight=[]

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
        if(!base.map(i=>i.value).includes(i.attributes.base)){
            base.push({'value':i.attributes.base, 'name':i.attributes.link.data.attributes.link.base[i.attributes.base]})
        }
        if(!ground.map(i=>i.value).includes(i.attributes.ground)){
            ground.push({'value':i.attributes.ground, 'name':i.attributes.link.data.attributes.link.ground[i.attributes.ground]})
        }
        if(!typebind.map(i=>i.value).includes(i.attributes.typebind)){
            typebind.push({'value':i.attributes.typebind, 'name':i.attributes.link.data.attributes.link.typebind[i.attributes.typebind]})
        }
        if(!rotation.map(i=>i.value).includes(i.attributes.rotation)){
            rotation.push({'value':i.attributes.rotation, 'name':i.attributes.link.data.attributes.link.rotation[i.attributes.rotation]})
        }
        if(!ledbacklight.map(i=>i.value).includes(i.attributes.ledbacklight)){
            ledbacklight.push({'value':i.attributes.ledbacklight, 'name':i.attributes.link.data.attributes.link.ledbacklight[i.attributes.ledbacklight]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.width>=range4[0]&&i.attributes.width<=range4[1]))
    filtersData=filtersData.filter(i=>(i.attributes.length>=range5[0]&&i.attributes.length<=range5[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='mechtype'){fMechtype[0]=['mechtype'];fMechtype[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='base'){fBase[0]=['base'];fBase[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ground'){fgGround[0]=['ground'];fgGround[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='typebind'){fTypebind[0]=['typebind'];fTypebind[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='rotation'){fRotation[0]=['rotation'];fRotation[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ledbacklight'){fLedbacklight[0]=['ledbacklight'];fLedbacklight[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fMechtype[1]&&fMechtype[1].length>0){filtersData=filtersData.filter(i=>(fMechtype[1].includes(i.attributes.mechtype)))}
    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}
    if(fBase[1]&&fBase[1].length>0){filtersData=filtersData.filter(i=>(fBase[1].includes(i.attributes.base)))}
    if(fgGround[1]&&fgGround[1].length>0){filtersData=filtersData.filter(i=>(fgGround[1].includes(i.attributes.ground)))}
    if(fTypebind[1]&&fTypebind[1].length>0){filtersData=filtersData.filter(i=>(fTypebind[1].includes(i.attributes.typebind)))}
    if(fRotation[1]&&fRotation[1].length>0){filtersData=filtersData.filter(i=>(fRotation[1].includes(i.attributes.rotation)))}
    if(fLedbacklight[1]&&fLedbacklight[1].length>0){filtersData=filtersData.filter(i=>(fLedbacklight[1].includes(i.attributes.ledbacklight)))}

    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
     console.log(filtersData)
   }

    function test(e){
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
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

<div class="slider slider3">
    <p>Вид товара</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div id="length" class="slider">
    <p>Длина шнура (метр)</p>
    <input type="number" bind:value={range5[0]} on:change={filtering}/>
    <Doublerange min={length[0]} max={length[length.length-1]} step="0.1" bind:value={range5} range order on:input={filtering}/>
    <input type="number" bind:value={range5[1]} on:change={filtering}/>
</div>

<div id="width" class="slider">
    <p>Толщина шнура (мм)</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={width[0]} max={width[width.length-1]} step="0.1" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип разъема</p>
    <Multiselect id="mechtype" list ={mechtype} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал оболочки</p>
    <Multiselect id="material" list ={material} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цвет</p>
    <Multiselect id="color" list ={color} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал проводника</p>
    <Multiselect id="base" list ={base} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Экранирующая оплетка</p>
    <Multiselect id="ground" list ={ground} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Место монтажа разъема</p>
    <Multiselect id="typebind" list ={typebind} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Форма разъема</p>
    <Multiselect id="rotation" list ={rotation} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Подсветка шнура/разъема</p>
    <Multiselect id="ledbacklight" list ={ledbacklight} on:message={filtering}></Multiselect>
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