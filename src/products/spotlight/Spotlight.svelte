<script>
    export let name;
</script>

<div>
    <span>SPOT</span>
    <span>{name.brand}</span>
</div>

<div>
    <span>Артикул</span>
    <span>{name.article}</span>
</div>

<div>
    <span>Тип лампы</span>
    <span>{name.link.data.attributes.link.type[name.type]}</span>
</div>

<div>
    <span>Назначение</span>
    <span>{name.link.data.attributes.link.function[name.function]}</span>
</div>

<div>
    <span>Цоколь (патрон)</span>
    <span>{name.lampholder}</span>
</div>

<div>
    <span>Форма колбы</span>
    <span>{name.link.data.attributes.link.flaskshape[name.flaskshape]}</span>
</div>

<div>
    <span>Мощность (W)</span>
    <span>{name.Wattage}</span>
</div>

<div>
    <span>Напряжение (V)</span>
    <span>{name.Voltage.slice(1)}</span>
</div>

<div>
    <span>Цветовая температура</span>
    <span>{name.link.data.attributes.link.color[name.color]}</span>
</div>

    
<div>
    <span>Световой поток (Lm)</span>
    <span>{name.luminous}</span>
</div>

<div>
    <span>Гарантия</span>
    <span>{name.warranty}</span>
</div>

<div>
    <span>Страна производитель</span>
    <span>{name.countryorigin}</span>
</div>

<style>
    div{display: flex;padding: 0.5rem 0;color: #323232;border-bottom: 1px solid #b8b4b4;}
    span{width: 50%;}
</style>