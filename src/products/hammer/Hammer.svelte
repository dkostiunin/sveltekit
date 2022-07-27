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
   <span class="span1">Тип инструмента</span>
   <span class="span2">{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
   <span class="span1">Масса инструмента (гр)</span>
   <span class="span2">{name.weight}</span>
</div>

<div>
   <span class="span1">Форма бойка/лезвия</span>
   <span class="span2">{name.link.data.attributes.link.flaskshape[name.flaskshape]}</span>
</div>

<div>
   <span class="span1">Материал бойка/лезвия</span>
   <span class="span2">{name.link.data.attributes.link.material[name.material]}</span>
</div>

<div>
   <span class="span1">Ширина лезвия/бойка (мм)</span>
   <span class="span2">{name.width}</span>
</div>

<div>
   <span class="span1">Материал рукоятки</span>
   <span class="span2">{name.link.data.attributes.link.mechtype[name.mechtype]}</span>
</div>

<div>
   <span class="span1">Длина рукоятки (мм)</span>
   <span class="span2">{name.length}</span>
</div>

<div>
   <span class="span1">Наличие гвоздодера</span>
   <span class="span2">{name.link.data.attributes.link.ground[name.ground]}</span>
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