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
        weight=prods.map(i=>i.attributes.weight).sort(function (a, b) {
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

    let range1 = [price[0], price[price.length-1]],range2=[weight[0],weight[weight.length-1]],
        range4=[width[0],width[width.length-1]],range5 = [length[0], length[length.length-1]],
        

        brand=[],type=[],mechtype=[],material=[],ground=[],
        fBrand=[],fType=[],fMechtype=[],fMaterial=[],fgGround=[]

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
        if(!ground.map(i=>i.value).includes(i.attributes.ground)){
            ground.push({'value':i.attributes.ground, 'name':i.attributes.link.data.attributes.link.ground[i.attributes.ground]})
        }
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.weight>=range2[0]&&i.attributes.weight<=range2[1]))
    filtersData=filtersData.filter(i=>(i.attributes.width>=range4[0]&&i.attributes.width<=range4[1]))
    filtersData=filtersData.filter(i=>(i.attributes.length>=range5[0]&&i.attributes.length<=range5[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='mechtype'){fMechtype[0]=['mechtype'];fMechtype[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='ground'){fgGround[0]=['ground'];fgGround[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fMechtype[1]&&fMechtype[1].length>0){filtersData=filtersData.filter(i=>(fMechtype[1].includes(i.attributes.mechtype)))}
    if(fgGround[1]&&fgGround[1].length>0){filtersData=filtersData.filter(i=>(fgGround[1].includes(i.attributes.ground)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}

    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
     console.log(filtersData)
   }

    function test(e){
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='weight'){
            if(range2[0]<weight[0]||range2[0]>=range2[1]){range2[0]=weight[0]}
            if(range2[1]> weight[weight.length-1]||range2[1]<=range2[0]){range2[1]= weight[weight.length-1]}
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
    <p>Тип инструмента</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div id="weight" class="slider">
    <p>Масса инструмента (гр)</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={weight[0]} max={weight[weight.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div id="width" class="slider">
    <p>Ширина лезвия/бойка (мм)</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={width[0]} max={width[width.length-1]} step="1" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div>

<div id="length" class="slider">
    <p>Длина рукоятки (мм)</p>
    <input type="number" bind:value={range5[0]} on:change={filtering}/>
    <Doublerange min={length[0]} max={length[length.length-1]} step="1" bind:value={range5} range order on:input={filtering}/>
    <input type="number" bind:value={range5[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал бойка/лезвия</p>
    <Multiselect id="material" list ={material} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал рукоятки</p>
    <Multiselect id="mechtype" list ={mechtype} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Гвоздодер</p>
    <Multiselect id="ground" list ={ground} on:message={filtering}></Multiselect>
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