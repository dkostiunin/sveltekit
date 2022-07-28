<script>
	export let links
	let l=links.data.links.data[0].attributes.link
	console.log(l)
	 const checkInt = (e) => {e.target.value=e.target.value.replace(/[^0-9]/gi,'')},
        checkText=(e) =>{
			e.target.value=e.target.value.replace(/[^a-zа-яё0-9 +-.,:;]/gi, '');
			e.target.rows=Math.ceil(e.target.value.length/e.target.cols)
		},
        around = (e) => {if(e.target.value!='') e.target.value=(+e.target.value).toFixed(2)},
		checkList = (e) => {
			let v= Array.from(e.target.list.options).map(i=>i.value)
			if(!v.includes(e.target.value))e.target.value=''
		}
</script>

<div id="listValues">
	<input placeholder="Бренд" list="br" id="brand" on:blur={checkList}/>
	<datalist id="br">
		{#each Object.entries(l.brand) as i}<option value={i[0]}>
		{/each}
	</datalist>
    <input placeholder="тип разъема" list="me" id="mechtype" on:blur={checkList}/>
	<datalist id="me">
		{#each Object.entries(l.mechtype) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Вид товара" list="ty" id="type" on:blur={checkList}/>
	<datalist id="ty">
		{#each Object.entries(l.type) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Материал облочки" list="ma" id="material" on:blur={checkList}/>
	<datalist id="ma">
		{#each Object.entries(l.material) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Цвет" list="co" id="color" on:blur={checkList}/>
	<datalist id="co">
		{#each Object.entries(l.color) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Материал проводника" list="le" id="base" on:blur={checkList}/>
	<datalist id="le">
		{#each Object.entries(l.base) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Экран" list="gr" id="ground" on:blur={checkList}/>
	<datalist id="gr">
		{#each Object.entries(l.ground) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Место монтажа" list="lo" id="typebind" on:blur={checkList}/>
	<datalist id="lo">
		{#each Object.entries(l.typebind) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Форма штекера" list="ro" id="rotation" on:blur={checkList}/>
	<datalist id="ro">
		{#each Object.entries(l.rotation) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="подсветка" list="le" id="ledbacklight" on:blur={checkList}/>
	<datalist id="le">
		{#each Object.entries(l.ledbacklight) as i}<option value={i[0]}>
		{/each}
	</datalist>

	<textarea rows="1" cols="39" id="name" placeholder="Название"   on:input={checkText}/>
	<textarea id="article" placeholder="Артикул"  rows="1" cols="25" on:input={checkText}/>
	<textarea id="countryorigin" placeholder="Страна происхождения"  rows="1" cols="25" on:input={checkText}/>
	<textarea id="shortdesc" placeholder="Краткое описание" rows="1" cols="25" on:input={checkText}/>
	<textarea id="longdesc" placeholder="Полное описание" rows="1" cols="25" on:input={checkText}/>

	<input id="price" placeholder="Цена" on:blur={around} type="number" step="0.01" min="0"/>
	<input id="instock" placeholder="Количество" inputmode="numeric" on:input={checkInt} type="number"/>
	<input id="EAN13" placeholder="Штрихкод" on:input={checkInt} type="number"/>
	<input id="height" placeholder="Высота(мм)" on:input={checkInt} type="number"/>
	<input id="width" placeholder="Толщина шнура(мм)" on:blur={around} type="number" step="0.1" min="0"/>
	<input id="length" placeholder="Длина шнура(м)" on:blur={around} type="number" step="0.1" min="0"/>
	<input id="weight" placeholder="Вес(кг)" on:blur={around} type="number" step="0.01" min="0"/>

</div>

<style>
	#listValues{display: flex;flex-wrap: wrap;justify-content: space-around;gap: 10px;margin-bottom: 10px;}
	textarea{width: 340px;font-size: larger;}
	input{width: 150px;}
</style>