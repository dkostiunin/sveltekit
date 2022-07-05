<script>
	export let links
	let l=links.data.links.data[0].attributes.link
	 const checkInt = (e) => {e.target.value=e.target.value.replace(/[^0-9]/gi,'')},
        //checkDec = (e) => {e.target.value=e.target.value.replace(/[^0-9,]/gi,'')},
        checkText=(e) =>{
			e.target.value=e.target.value.replace(/[^a-zа-яё0-9 +-.,:;]/gi, '');
			e.target.rows=Math.ceil(e.target.value.length/e.target.cols)
		},
        around = (e) => {if(e.target.value!='') e.target.value=(+e.target.value).toFixed(2)},
		around2 = (e) => {
			if(e.target.value!='') e.target.value=(+e.target.value).toFixed(1);
			console.log(e.target.value.length,e.target.value.slice(0, -2))
			if(e.target.value.length>=3&&e.target.value[e.target.value.length-1]==0) e.target.value=(+e.target.value.slice(0, -2))
		},
		checkList = (e) => {
			let v= Array.from(e.target.list.options).map(i=>i.value)
			if(!v.includes(e.target.value))e.target.value=''
		}
</script>

<div id="listValues">
	
	<input placeholder="Тип соединения" list="ty" id="conntype" on:blur={checkList}/>
	<datalist id="ty">
		{#each Object.entries(l.conntype) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Материал корпуса" list="ma" id="material" on:blur={checkList}/>
	<datalist id="ma">
		{#each Object.entries(l.material) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Цвет корпуса" list="co" id="color" on:blur={checkList}/>
	<datalist id="co">
		{#each Object.entries(l.color) as i}<option value={i[0]}>
		{/each}
	</datalist>

	<textarea rows="1" cols="39" id="name" placeholder="Название"   on:input={checkText}/>
	<textarea rows="1" cols="39" id="brand" placeholder="Бренд"   on:input={checkText}/>
	<textarea id="article" placeholder="Артикул"  rows="1" cols="25" on:input={checkText}/>
	<textarea id="countryorigin" placeholder="Страна происхождения"  rows="1" cols="25" on:input={checkText}/>
	<textarea id="shortdesc" placeholder="Краткое описание" rows="1" cols="25" on:input={checkText}/>
	<textarea id="longdesc" placeholder="Полное описание" rows="1" cols="25" on:input={checkText}/>

	<input id="price" placeholder="Цена" on:blur={around} type="number" step="0.01" min="0"/>
	<input id="instock" placeholder="Количество" inputmode="numeric" on:input={checkInt} type="number"/>
	<input id="amperage" placeholder="Макс Ток" on:input={checkInt} type="number"/>
	<input id="qtycontacts" placeholder="Кол-во контактов" on:input={checkInt} type="number"/>
	<input id="wirethickmin" placeholder="Мин сечение провода (мм)" on:blur={around} type="number" step="0.1" min="0"/>
	<input id="wirethickmax" placeholder="Макс сечение провода (мм)" on:blur={around} type="number" step="0.1" min="0"/>
	<input id="EAN13" placeholder="Штрихкод" on:input={checkInt} type="number"/>
	<input id="height" placeholder="Высота(мм)" on:input={checkInt} type="number"/>
	<input id="width" placeholder="Толщина(мм)" on:input={checkInt} type="number"/>
	<input id="length" placeholder="Длина(мм)" on:input={checkInt} type="number"/>
	<input id="weight" placeholder="Вес(кг)" on:blur={around} type="number" step="0.01" min="0"/>

</div>

<style>
	#listValues{display: flex;flex-wrap: wrap;justify-content: space-around;gap: 10px;margin-bottom: 10px;}
	textarea{width: 340px;font-size: larger;}
	input{width: 150px;}
</style>