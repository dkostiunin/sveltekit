<script>
    export let name
</script>

<div>
    <span class="span1">Бренд</span>
   <span class="span3">{name.link.data.attributes.link.brand[name.brand]}</span>
</div>

<div>
   <span class="span1">Артикул</span>
   <span class="span3">{name.article}</span>
</div>

<div>
   <span class="span1">Форма/тип светильника</span>
   <span class="span2">{name.link.data.attributes.link.diff[name.diff]}</span>
</div>

<div>
   <span class="span1">Установка (крепление)</span>
   <span class="span2">{name.link.data.attributes.link.mechtype[name.mechtype]}</span>
</div>

<div>
   <span class="span1">Цоколь/патрон</span>
   <span class="span2">{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
   <span class="span1">Кол-во ламп/LED панелей</span>
   <span class="span2">{name.qtysock}</span>
</div>

<div>
   <span class="span1">Общая макс. мощность</span>
   <span class="span2">{name.watt}</span>
</div>

<div>
   <span class="span1">Цвет корпуса</span>
   <span class="span2">{name.link.data.attributes.link.color[name.color]}</span>
</div>

<div>
   <span class="span1">Материал корпуса</span>
   <span class="span2">{name.link.data.attributes.link.material[name.material]}</span>
</div>

<div>
   <span class="span1">Высота светильника (мм)</span>
   <span class="span2">{name.height}</span>
</div>

<div>
   <span class="span1">Диаметр (ширина х длина)(мм)</span>
   <span class="span2">{name.width}х{name.length}</span>
</div>

<div>
   <span class="span1">Датчик движения</span>
   <span class="span2">{name.link.data.attributes.link.sensor[name.sensor]}</span>
</div>

<div>
   <span class="span1">Регулировка яркости</span>
   <span class="span2">{name.link.data.attributes.link.dimmer[name.dimmer]}</span>
</div>

<div>
   <span class="span1">Гарантия</span>
   <span class="span2">{name.warranty}</span>
</div>

<div>
   <span class="span1">Страна производитель</span>
   <span class="span2">{name.countryorigin}</span>
</div>

<style>
    div{display: flex;padding: 0.5rem 0;color: #323232;border-bottom: 1px solid #b8b4b4;}
    .span1{width: 65%;}
    .span2{width: 35%;text-align: end;word-break: break-word;}
    .span3{width: 65%;text-align: end;}
</style>