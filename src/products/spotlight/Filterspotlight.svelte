<script>
    export let prods,filtersData=[]
   // console.log(prods)
    import Doublerange from "$lib/doublerange/Doublerange.svelte";
    import Multiselect from "$lib/Multiselect.svelte";

    
    let price=prods.map(i=>i.attributes.price).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })
     /*    ,
        watt=prods.map(i=>i.attributes.Wattage).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }),
        lt=prods.map(i=>i.attributes.Lifetime).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        })
        ,
        lm=prods.map(i=>i.attributes.luminous).sort(function (a, b) {
          if (a > b) {return 1}
          if (a < b) {return -1}
          return 0;
        }) */

    let range1 = [price[0]]
    
    /* , price[price.length-1]],range2 = [watt[0], watt[watt.length-1]],
        range3 = [lt[0], lt[lt.length-1]],range4 = [lm[0], lm[lm.length-1]] */

   function filtering(){
    filtersData=prods.filter(i=>(i.attributes.price>=range1[0]&&i.attributes.price<=range1[1]))
/*     filtersData=filtersData.filter(i=>(i.attributes.Wattage>=range2[0]&&i.attributes.Wattage<=range2[1]))
    filtersData=filtersData.filter(i=>(i.attributes.Lifetime>=range3[0]&&i.attributes.Lifetime<=range3[1]))
    filtersData=filtersData.filter(i=>(i.attributes.luminous>=range4[0]&&i.attributes.luminous<=range4[1])) */
   }

   function handleMessage(e) {console.log(e.detail);}
   let number = [{'value':'333', 'name':'eee'},{'value':'444', 'name':'fffff'}]
   
</script>

<div class="slider">
    <p>Цена</p>
    <input type="number" bind:value={range1[0]} on:change={filtering}/>
    <Doublerange min={price[0]} max={price[price.length-1]} step="1" bind:value={range1} range order on:input={filtering}/>
    <input type="number" bind:value={range1[1]} on:change={filtering}/>
</div>

<!-- <div class="slider slider2">
    <p>Мощность</p>
    <input type="number" bind:value={range2[0]} on:change={filtering}/>
    <Doublerange min={watt[0]} max={watt[watt.length-1]} step="1" bind:value={range2} range order on:input={filtering}/>
    <input type="number" bind:value={range2[1]} on:change={filtering}/>
</div>

<div class="slider slider2">
    <p>Срок службы</p>
    <input type="number" bind:value={range3[0]} on:change={filtering}/>
    <Doublerange min={lt[0]} max={lt[lt.length-1]} step="1000" bind:value={range3} range order on:input={filtering}/>
    <input type="number" bind:value={range3[1]} on:change={filtering}/>
</div>

<div class="slider slider2">
    <p>Световой поток</p>
    <input type="number" bind:value={range4[0]} on:change={filtering}/>
    <Doublerange min={lm[0]} max={lm[lm.length-1]} step="100" bind:value={range4} range order on:input={filtering}/>
    <input type="number" bind:value={range4[1]} on:change={filtering}/>
</div> -->

<div class="slider slider2">
    <p>Multiselect</p>
    <Multiselect list ={number} on:message={handleMessage}></Multiselect>
</div>

<style>

	.slider{display: flex;position: relative; margin-top: 70px;margin-left: 10px;
        width: 350px;border-bottom: 1px solid #b8b4b4;
        }

    .slider2{margin-top: 30px;}

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