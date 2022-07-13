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
   <span class="span1">Материал корпуса</span>
   <span class="span2">{name.link.data.attributes.link.material[name.material]}</span>
</div>

<div>
   <span class="span1">Цвет корпуса</span>
   <span class="span2">{name.link.data.attributes.link.color[name.color]}</span>
</div>

<div>
   <span class="span1">Тип ящика</span>
   <span class="span2">{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
   <span class="span1">Вариант установки</span>
   <span class="span2">{name.link.data.attributes.link.setting[name.setting]}</span>
</div>

<div>
   <span class="span1">Наличие замка с ключом</span>
   <span class="span2">{name.link.data.attributes.link.lock[name.lock]}</span>
</div>

<div>
   <span class="span1">Наличие окна или прозрачной дверцы</span>
   <span class="span2">{name.link.data.attributes.link.window[name.window]}</span>
</div>

<div>
   <span class="span1">Количество ячеек под автоматы</span>
   <span class="span2">{name.colautomat}</span>
</div>

<div>
   <span class="span1">Высота ящика (см)</span>
   <span class="span2">{name.height}</span>
</div>

<div>
   <span class="span1">Ширина ящика (см)</span>
   <span class="span2">{name.width}</span>
</div>

<div>
   <span class="span1">Глубина ящика (см)</span>
   <span class="span2">{name.length}</span>
</div>

<div>
   <span class="span1">Класс защиты от влаги и пыли</span>
   <span class="span2">{name.ipclass}</span>
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