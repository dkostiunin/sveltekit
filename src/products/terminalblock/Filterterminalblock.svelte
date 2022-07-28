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
        amperage=prods.map(i=>i.attributes.amperage).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        qtycontacts=prods.map(i=>i.attributes.qtycontacts).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        wirethickmin=prods.map(i=>i.attributes.wirethickmin).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        wirethickmax=prods.map(i=>i.attributes.wirethickmax).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })

    let range1 = [price[0], price[price.length-1]],range2 = [amperage[0], amperage[amperage.length-1]],
        range3=[qtycontacts[0],qtycontacts[qtycontacts.length-1]],range4=[wirethickmin[0],wirethickmin[wirethickmin.length-1]],
        range5 = [wirethickmax[0], wirethickmax[wirethickmax.length-1]],

        conntype=[],color=[],material=[],
        fConntype=[],fColor=[],fMaterial=[]

    prods.forEach(i => {
        if(!conntype.map(i=>i.value).includes(i.attributes.conntype)){
            conntype.push({'value':i.attributes.conntype, 'name':i.attributes.link.data.attributes.link.conntype[i.attributes.conntype]})
        }
        if(!color.map(i=>i.value).includes(i.attributes.color)){
            color.push({'value':i.attributes.color, 'name':i.attributes.link.data.attributes.link.color[i.attributes.color]})
        }
        if(!material.map(i=>i.value).includes(i.attributes.material)){
            material.push({'value':i.attributes.material, 'name':i.attributes.link.data.attributes.link.material[i.attributes.material]})
        }
    });

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    console.log(price,range1)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.amperage>=range2[0]&&i.attributes.amperage<=range2[1]))
    filtersData=filtersData.filter(i=>(i.attributes.qtycontacts>=range3[0]&&i.attributes.qtycontacts<=range3[1]))
    filtersData=filtersData.filter(i=>(i.attributes.wirethickmin>=range4[0]&&i.attributes.wirethickmin<=range4[1]))
    filtersData=filtersData.filter(i=>(i.attributes.wirethickmax>=range5[0]&&i.attributes.wirethickmax<=range5[1]))

    if(e.detail&&e.detail[0]=='conntype'){fConntype[0]=['conntype'];fConntype[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='material'){fMaterial[0]=['material'];fMaterial[1]=Object.keys(e.detail[1])}

    if(fConntype[1]&&fConntype[1].length>0){filtersData=filtersData.filter(i=>(fConntype[1].includes(i.attributes.conntype)))}
    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fMaterial[1]&&fMaterial[1].length>0){filtersData=filtersData.filter(i=>(fMaterial[1].includes(i.attributes.material)))}

    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
     console.log(filtersData)
   }

    function test(e){
        if(((e.detail[0]||e.detail[0]==0)&&e.detail[1])&&(!Number.isInteger(e.detail[0])||!Number.isInteger(e.detail[1]))){
            e.detail[0]=+e.detail[0].toFixed(1);e.detail[1]=+e.detail[1].toFixed(1)
        }
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='amperage'){
            if(range2[0]<amperage[0]||range2[0]>=range2[1]){range2[0]=amperage[0]}
            if(range2[1]> amperage[amperage.length-1]||range2[1]<=range2[0]){range2[1]= amperage[amperage.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='qtycontacts'){
            if(range3[0]<qtycontacts[0]||range3[0]>=range3[1]){range3[0]=qtycontacts[0]}
            if(range3[1]> qtycontacts[qtycontacts.length-1]||range3[1]<=range3[0]){range3[1]= qtycontacts[qtycontacts.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='wirethickmin'){
            if(range4[0]<wirethickmin[0]||range4[0]>=range4[1]){range4[0]=wirethickmin[0]}
            if(range4[1]> wirethickmin[wirethickmin.length-1]||range4[1]<=range4[0]){range4[1]= wirethickmin[wirethickmin.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='wirethickmax'){
            if(range5[0]<wirethickmax[0]||range5[0]>=range5[1]){range5[0]=wirethickmax[0]}
            if(range5[1]> wirethickmax[wirethickmax.length-1]||range5[1]<=range5[0]){range5[1]= wirethickmax[wirethickmax.length-1]}
        }
    }

</script>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div id="amperage" class="slider">
    <p>Макс ток</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={amperage[0]} max={amperage[amperage.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div id="qtycontacts" class="slider">
    <p>Количество контактов</p>
    <input type="number" bind:value={range3[0]} on:change={filtering}/>
    <Doublerange min={qtycontacts[0]} max={qtycontacts[qtycontacts.length-1]} step="1" bind:value={range3} range order on:input={filtering}/>
    <input type="number" bind:value={range3[1]} on:change={filtering}/>
</div>

<div id="wirethickmin" class="slider">
    <p>Мин сечение провода</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={wirethickmin[0]} max={wirethickmin[wirethickmin.length-1]} step="0.1" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div>

<div id="wirethickmax" class="slider">
    <p>Макс сечение провода</p>
    <input type="number" bind:value={range5[0]} on:change={filtering}/>
    <Doublerange min={wirethickmax[0]} max={wirethickmax[wirethickmax.length-1]} step="0.1" bind:value={range5} range order on:input={filtering}/>
    <input type="number" bind:value={range5[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Тип соединения</p>
    <Multiselect id="conntype" list ={conntype} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цвет</p>
    <Multiselect id="color" list ={color} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Материал корпуса</p>
    <Multiselect id="material" list ={material} on:message={filtering}></Multiselect>
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