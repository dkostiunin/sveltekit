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
	/* 	around2 = (e) => {
			if(e.target.value!='') e.target.value=(+e.target.value).toFixed(1);
			if(e.target.value.length>=3&&e.target.value[e.target.value.length-1]==0) e.target.value=(+e.target.value.slice(0, -2))
		}, */
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
	<input placeholder="Тип изделия" list="ty" id="type" on:blur={checkList}/>
	<datalist id="ty">
		{#each Object.entries(l.type) as i}<option value={i[0]}>
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
	<input placeholder="Марка кабеля" list="wi" id="wiretype" on:blur={checkList}/>
	<datalist id="wi">
		{#each Object.entries(l.wiretype) as i}<option value={i[0]}>
		{/each}
	</datalist>

	<input placeholder="Заземление" list="gr" id="ground" on:blur={checkList}/>
	<datalist id="gr">
		{#each Object.entries(l.ground) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="Выключатель" list="sw" id="switch" on:blur={checkList}/>
	<datalist id="sw">
		{#each Object.entries(l.switch) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="шторки" list="cu" id="curtains" on:blur={checkList}/>
	<datalist id="cu">
		{#each Object.entries(l.curtains) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="рамка/катушка" list="me" id="mechtype" on:blur={checkList}/>
	<datalist id="me">
		{#each Object.entries(l.mechtype) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="USB" list="us" id="usb" on:blur={checkList}/>
	<datalist id="us">
		{#each Object.entries(l.usb) as i}<option value={i[0]}>
		{/each}
	</datalist>
	<input placeholder="IP" list="ip" id="ipclass" on:blur={checkList}/>
	<datalist id="ip">
		{#each Object.entries(l.ipclass) as i}<option value={i[0]}>
		{/each}
	</datalist>

	<textarea rows="1" cols="39" id="name" placeholder="Название"   on:input={checkText}/>
	<textarea id="article" placeholder="Артикул"  rows="1" cols="25" on:input={checkText}/>
	<textarea id="countryorigin" placeholder="Страна происхождения"  rows="1" cols="25" on:input={checkText}/>
	<textarea id="shortdesc" placeholder="Краткое описание" rows="1" cols="25" on:input={checkText}/>
	<textarea id="longdesc" placeholder="Полное описание" rows="1" cols="25" on:input={checkText}/>

	<input id="price" placeholder="Цена" on:blur={around} type="number" step="0.01" min="0"/>
	<input id="instock" placeholder="Количество" inputmode="numeric" on:input={checkInt} type="number"/>
	<input id="amper" placeholder="Макс ток" on:input={checkInt} type="number"/>
	<input id="watt" placeholder="Макс мощность (Вт)" on:input={checkInt} type="number"/>
	<input id="qtysock" placeholder="Кол-во гнезд" on:input={checkInt} type="number"/>
	<input id="wirelength" placeholder="Длина провода(м)" on:blur={around} type="number" step="0.01" min="0"/>
	<input id="wirethick" placeholder="Сечение провода (мм)" on:blur={around} type="number" step="0.01" min="0"/>
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