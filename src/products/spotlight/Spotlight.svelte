<script>
    export let name;
    console.log(name)
</script>

<div>
    <span class="span1">Бренд</span>
   <span class="span2">{name.brand}</span>
</div>

<div>
   <span class="span1">Артикул</span>
   <span class="span2">{name.article}</span>
</div>

<div>
   <span class="span1">Назначение</span>
   <span class="span2">{name.link.data.attributes.link.function[name.function]}</span>
</div>

<div>
   <span class="span1">Тип цоколя</span>
   <span class="span2">{name.lampholder}</span>
</div>

<div>
   <span class="span1">Тип светильника</span>
   <span class="span2">{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
   <span class="span1">Наличие и мощность LED подсветки</span>
   <span class="span2">{name.link.data.attributes.link.ledbacklight[name.ledbacklight]}</span>
</div>

<div>
   <span class="span1">Форма корпуса</span>
   <span class="span2">{name.link.data.attributes.link.flaskshape[name.flaskshape]}</span>
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
   <span class="span1">Размеры (ширина х длина или диаметр) (мм)</span>
   <span class="span2">{name.length}х{name.width}</span>
</div>

<div>
   <span class="span1">Толщина (высота) (мм)</span>
   <span class="span2">{name.height}</span>
</div>

<div>
   <span class="span1">D врезного отверстия (мм)</span>
   <span class="span2">{name.mortisediam}</span>
</div>

<div>
   <span class="span1">Класс защиты от влаги и пыли</span>
   <span class="span2">{name.ipclass}</span>
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
    .span2{width: 35%;text-align: end;}
</style>