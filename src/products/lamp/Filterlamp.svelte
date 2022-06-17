<script>
    export let prods,filtersData=[],yes,page
    //console.log(prods)
    import Doublerange from "$lib/doublerange/Doublerange.svelte";
    import Multiselect from "$lib/Multiselect.svelte";
    
    let price=prods.map(i=>i.attributes.price).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        watt=prods.map(i=>i.attributes.Wattage).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        lm=prods.map(i=>i.attributes.luminous).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        brand=[], color=[], flaskshape=[], lampholder=[], type=[], func=[], Voltage=[],
        fBrand=[], fColor=[], fFlaskshape=[], fLampholder=[], fType=[], fFunc=[], fVoltage=[]
        

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
        if(!type.map(i=>i.value).includes(i.attributes.type)){
            type.push({'value':i.attributes.type, 'name':i.attributes.link.data.attributes.link.type[i.attributes.type]})
        }
        if(!func.map(i=>i.value).includes(i.attributes.function)){
            func.push({'value':i.attributes.function, 'name':i.attributes.link.data.attributes.link.function[i.attributes.function]})
        }
        if(!Voltage.map(i=>i.value).includes(i.attributes.Voltage)){
            Voltage.push({'value':i.attributes.Voltage, 'name':i.attributes.link.data.attributes.link.Voltage[i.attributes.Voltage]})
        }
    });

    let range1 = [price[0], price[price.length-1]],range2 = [watt[0], watt[watt.length-1]],range3 = [lm[0], lm[lm.length-1]]

    $: if(yes||!yes)filtering()

   function filtering(e={detail:[]}){test(e)
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
    filtersData=filtersData.filter(i=>(i.attributes.Wattage>=range2[0]&&i.attributes.Wattage<=range2[1]))
    filtersData=filtersData.filter(i=>(i.attributes.luminous>=range3[0]&&i.attributes.luminous<=range3[1]))

    if(e.detail&&e.detail[0]=='brand'){fBrand[0]=['brand'];fBrand[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='color'){fColor[0]=['color'];fColor[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='flaskshape'){fFlaskshape[0]=['flaskshape'];fFlaskshape[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='lampholder'){fLampholder[0]=['lampholder'];fLampholder[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='type'){fType[0]=['type'];fType[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='func'){fFunc[0]=['func'];fFunc[1]=Object.keys(e.detail[1])}
    if(e.detail&&e.detail[0]=='Voltage'){fVoltage[0]=['Voltage'];fVoltage[1]=Object.keys(e.detail[1])}

    if(fBrand[1]&&fBrand[1].length>0){filtersData=filtersData.filter(i=>(fBrand[1].includes(i.attributes.brand)))}
    if(fColor[1]&&fColor[1].length>0){filtersData=filtersData.filter(i=>(fColor[1].includes(i.attributes.color)))}
    if(fFlaskshape[1]&&fFlaskshape[1].length>0){filtersData=filtersData.filter(i=>(fFlaskshape[1].includes(i.attributes.flaskshape)))}
    if(fLampholder[1]&&fLampholder[1].length>0){filtersData=filtersData.filter(i=>(fLampholder[1].includes(i.attributes.lampholder)))}
    if(fType[1]&&fType[1].length>0){filtersData=filtersData.filter(i=>(fType[1].includes(i.attributes.type)))}
    if(fFunc[1]&&fFunc[1].length>0){filtersData=filtersData.filter(i=>(fFunc[1].includes(i.attributes.function)))}
    if(fVoltage[1]&&fVoltage[1].length>0){filtersData=filtersData.filter(i=>(fVoltage[1].includes(i.attributes.Voltage)))}
    if(yes) filtersData=filtersData.filter(i=>(i.attributes.instock>0))
    page=1
    // console.log(filtersData)
   }

   function test(e){
        if(e.target&&e.target.parentElement.id=='price'){
            if(range1[0]<price[0]||range1[0]>=range1[1]){range1[0]=price[0]}
            if(range1[1]> price[price.length-1]||range1[1]<=range1[0]){range1[1]= price[price.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='watt'){
            if(range2[0]<watt[0]||range2[0]>=range2[1]){range2[0]=watt[0]}
            if(range2[1]> watt[watt.length-1]||range2[1]<=range2[0]){range2[1]= watt[watt.length-1]}
        }
        else if(e.target&&e.target.parentElement.id=='lm'){
            if(range3[0]<lm[0]||range3[0]>=range3[1]){range3[0]=lm[0]}
            if(range3[1]> lm[lm.length-1]||range3[1]<=range3[0]){range3[1]= lm[lm.length-1]}
        }
    }

</script>

<div id="price" class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<div  id="watt" class="slider slider2">
    <p>Мощность (W)</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={watt[0]} max={watt[watt.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div  id="lm" class="slider slider2">
    <p>Световой поток (люмен)</p>
    <input type="number" bind:value={range3[0]} on:change={filtering}/>
    <Doublerange min={lm[0]} max={lm[lm.length-1]} step="5" bind:value={range3} range order on:input={filtering}/>
    <input type="number" bind:value={range3[1]} on:change={filtering}/>
</div>

<div class="slider slider3">
    <p>Бренд</p>
    <Multiselect id="brand" list ={brand} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Цвет</p>
    <Multiselect id="color" list ={color} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Форма колбы</p>
    <Multiselect id="flaskshape" list ={flaskshape} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип цоколя</p>
    <Multiselect id="lampholder" list ={lampholder} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Тип лампы</p>
    <Multiselect id="type" list ={type} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Назначение</p>
    <Multiselect id="func" list ={func} on:message={filtering}></Multiselect>
</div>

<div class="slider slider3">
    <p>Напряжение питания</p>
    <Multiselect id="Voltage" list ={Voltage} on:message={filtering}></Multiselect>
</div>

<style>

	.slider{display: flex;position: relative; margin-top: 50px;margin-left: 10px;
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