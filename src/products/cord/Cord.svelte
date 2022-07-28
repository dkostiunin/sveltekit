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
   <span class="span1">Вид товара</span>
   <span class="span2">{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
   <span class="span1">Тип разъема</span>
   <span class="span2">{name.link.data.attributes.link.mechtype[name.mechtype]}</span>
</div>

<div>
   <span class="span1">Материал оболочки шнура/корпуса разъема</span>
   <span class="span2">{name.link.data.attributes.link.material[name.material]}</span>
</div>

<div>
   <span class="span1">Цвет</span>
   <span class="span2">{name.link.data.attributes.link.color[name.color]}</span>
</div>

<div>
   <span class="span1">Материал проводника</span>
   <span class="span2">{name.link.data.attributes.link.base[name.base]}</span>
</div>

<div>
   <span class="span1">Наличие экранирующей оплетки</span>
   <span class="span2">{name.link.data.attributes.link.ground[name.ground]}</span>
</div>

<div>
   <span class="span1">Длина шнура/штекера (м)</span>
   <span class="span2">{name.length}</span>
</div>

<div>
   <span class="span1">Толщина шнура/штекера (мм)</span>
   <span class="span2">{name.width}</span>
</div>

<div>
   <span class="span1">Место монтажа разъема</span>
   <span class="span2">{name.link.data.attributes.link.typebind[name.typebind]}</span>
</div>

<div>
   <span class="span1">Форма разъема</span>
   <span class="span2">{name.link.data.attributes.link.rotation[name.rotation]}</span>
</div>

<div>
   <span class="span1">LED подсветка кабеля/разъемов</span>
   <span class="span2">{name.link.data.attributes.link.ledbacklight[name.ledbacklight]}</span>
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