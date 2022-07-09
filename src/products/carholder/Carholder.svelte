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
   <span class="span1">Применение</span>
   <span class="span2">{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
   <span class="span1">Место установки</span>
   <span class="span2">{name.link.data.attributes.link.place[name.place]}</span>
</div>

<div>
   <span class="span1">Тип крепления</span>
   <span class="span2">{name.link.data.attributes.link.typebind[name.typebind]}</span>
</div>

<div>
   <span class="span1">Материал корпуса</span>
   <span class="span2">{name.link.data.attributes.link.material[name.material]}</span>
</div>

<div>
   <span class="span1">Цвет</span>
   <span class="span2">{name.link.data.attributes.link.color[name.color]}</span>
</div>

<div>
   <span class="span1">Возможность поворота</span>
   <span class="span2">{name.link.data.attributes.link.rotation[name.rotation]}</span>
</div>

<div>
   <span class="span1">Наличие удлинителя</span>
   <span class="span2">{name.link.data.attributes.link.extension[name.extension]}</span>
</div>

<div>
   <span class="span1">Встроенная зарядка</span>
   <span class="span2">{name.link.data.attributes.link.charger[name.charger]}</span>
</div>

<div>
   <span class="span1">Размеры (ширина х длина х высота) (мм)</span>
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