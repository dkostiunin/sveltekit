<script>
	export let links
	let l=links.data.links.data[0].attributes.link
	console.log(l,Object.entries(l.brand))
	 const checkInt = (e) => {e.target.value=e.target.value.replace(/[^0-9]/gi,'')},
        //checkDec = (e) => {e.target.value=e.target.value.replace(/[^0-9,]/gi,'')},
        checkText=(e) =>{e.target.value=e.target.value.replace(/[^a-zа-яё0-9 +-.,:;]/gi, '')},
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
	<input placeholder="Тип лампы" list="ty" id="type" on:blur={checkList}/>
	<datalist id="ty">
		{#each Object.entries(l.type) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Цвет" list="co" id="color" on:blur={checkList}/>
	<datalist id="co">
		{#each Object.entries(l.color) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Цоколь" list="la" id="lampholder" on:blur={checkList}/>
	<datalist id="la">
		{#each Object.entries(l.lampholder) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Напряжение" list="vo" id="Voltage" on:blur={checkList}/>
	<datalist id="vo">
		{#each Object.entries(l.Voltage) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Форма колбы" list="fl" id="flaskshape" on:blur={checkList}/>
	<datalist id="fl">
		{#each Object.entries(l.flaskshape) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Класс IP" list="ip" id="ipclass" on:blur={checkList}/>
	<datalist id="ip">
		{#each Object.entries(l.ipclass) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Назначение" list="fu" id="function" on:blur={checkList}/>
	<datalist id="fu">
		{#each Object.entries(l.function) as i}<option value={i[0]}>
		{/each}
	</datalist>


	<input id="name" placeholder="Название"   on:input={checkText} type="text"/>
	<input id="article" placeholder="Артикул"   on:input={checkText} type="text"/>
	<input id="price" placeholder="Цена" on:blur={around} type="number" step="0.01" min="0"/>
	<input id="instock" placeholder="Количество" inputmode="numeric" on:input={checkInt} type="number"/>
	<input id="countryorigin" placeholder="Страна происхождения"   on:input={checkText} type="text"/>
	<input id="peculiarities" placeholder="Особенности"   on:input={checkText} type="text"/>
	<input id="warranty" placeholder="Гарантия"   on:input={checkText} type="text"/>
	<input id="shortdesc" placeholder="Краткое описание" on:input={checkText}   type="text"/>
	<input id="longdesc" placeholder="Полное описание" on:input={checkText}   type="text"/>

	<input id="Wattage" placeholder="Мощность"   on:input={checkInt} type="number"/>
	<input id="Lifetime" placeholder="Срок службы"   on:input={checkInt} type="number"/>
	<input id="luminous" placeholder="Яркость"   on:input={checkInt} type="number"/>
	<input id="EAN13" placeholder="Штрихкод"   on:input={checkInt} type="number"/>
	<input id="height" placeholder="Высота(см)"   on:input={checkInt} type="number"/>
	<input id="width" placeholder="Толщина(см)"   on:input={checkInt} type="number"/>
	<input id="length" placeholder="Длина(см)"   on:input={checkInt} type="number"/>
	<input id="weight" placeholder="Вес(кг)"   on:blur={around} type="number" step="0.01" min="0"/>
	

</div>

