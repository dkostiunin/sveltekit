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
   <span class="span1">Тип изделия</span>
   <span class="span2">{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
   <span class="span1">Кол-во гнезд (кроме вилок)</span>
   <span class="span2">{name.qtysock}</span>
</div>

<div>
   <span class="span1">Максимальная мощность (Вт)</span>
   <span class="span2">{name.watt}</span>
</div>

<div>
   <span class="span1">Максимальный ток (А)</span>
   <span class="span2">{name.amper}</span>
</div>

<div>
   <span class="span1">Длина провода (м)</span>
   <span class="span2">{name.wirelength}</span>
</div>

<div>
   <span class="span1">Марка кабеля(провода)</span>
   <span class="span2">{name.link.data.attributes.link.wiretype[name.wiretype]}</span>
</div>

<div>
   <span class="span1">Сечение провода (мм)</span>
   <span class="span2">{name.wirethick}</span>
</div>

<div>
   <span class="span1">Материал корпуса</span>
   <span class="span2">{name.link.data.attributes.link.material[name.material]}</span>
</div>

<div>
   <span class="span1">Заземление</span>
   <span class="span2">{name.link.data.attributes.link.ground[name.ground]}</span>
</div>

<div>
   <span class="span1">Выключатель</span>
   <span class="span2">{name.link.data.attributes.link.switch[name.switch]}</span>
</div>

<div>
   <span class="span1">Защитные шторки</span>
   <span class="span2">{name.link.data.attributes.link.curtains[name.curtains]}</span>
</div>

<div>
   <span class="span1">Наличие рамки/катушки (для удлинителей)</span>
   <span class="span2">{name.link.data.attributes.link.mechtype[name.mechtype]}</span>
</div>

<div>
   <span class="span1">USB порт</span>
   <span class="span2">{name.link.data.attributes.link.usb[name.usb]}</span>
</div>

<div>
   <span class="span1">Цвет</span>
   <span class="span2">{name.link.data.attributes.link.color[name.color]}</span>
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
    .span3{width: 65%;text-align: end;}
</style>