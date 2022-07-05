<script>
    export let name
</script>

<div>
    <span class="span1">Бренд</span>
   <span class="span3">{name.brand}</span>
</div>

<div>
   <span class="span1">Артикул</span>
   <span class="span3">{name.article}</span>
</div>

<div>
   <span class="span1">Тип соединения</span>
   <span class="span2">{name.link.data.attributes.link.conntype[name.conntype]}</span>
</div>

<div>
   <span class="span1">Максимальный ток (А)</span>
   <span class="span2">{name.amperage}</span>
</div>

<div>
   <span class="span1">Количество контактов</span>
   <span class="span2">{name.qtycontacts}</span>
</div>

<div>
   <span class="span1">Мин сечение провода (мм)</span>
   <span class="span2">{name.wirethickmin}</span>
</div>

<div>
   <span class="span1">Макс сечение провода (мм)</span>
   <span class="span2">{name.wirethickmax}</span>
</div>

<div>
   <span class="span1">Цвет</span>
   <span class="span2">{name.link.data.attributes.link.color[name.color]}</span>
</div>

<div>
   <span class="span1">Материал</span>
   <span class="span2">{name.link.data.attributes.link.material[name.material]}</span>
</div>

<div>
   <span class="span1">Размеры (ширина х длина х толщина) (мм)</span>
   <span class="span2">{name.length}х{name.width}х{name.height}</span>
</div>

<div>
   <span class="span1">Страна производитель</span>
   <span class="span2">{name.countryorigin}</span>
</div>

<style>
    div{display: flex;padding: 0.5rem 0;color: #323232;border-bottom: 1px solid #b8b4b4;}
    .span1{width: 65%;}
    .span2{width: 35%;text-align: end;}
    .span3{width: 65%;text-align: end;}
</style>