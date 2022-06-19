<script>
    export let qty=1,max,min=1
</script>

<div class="number">
	<button class="number-minus" type="button" 
        on:click={(e)=>{
            e.target.nextElementSibling.stepDown()//; e.target.nextElementSibling.onchange()
            qty= +e.target.nextElementSibling.value
            }}>&ndash;
    </button>
	<input type="number" min={min} max={max} value={qty} on:change={(e)=>{
        qty= +e.target.value
        if(qty>max)qty=max; if(qty<min)qty=min;
        }}>
	<button class="number-plus" type="button"
          on:click={(e)=>{
            console.log( e.target.previousElementSibling.value)
            e.target.previousElementSibling.stepUp()
            qty= +e.target.previousElementSibling.value
        }}>+
    </button>
</div>

<style>
    .number {
        display: inline-block;position: relative; width: 145px;
    }
    .number input[type="number"] {
        display: block;
        height: 32px;line-height: 32px;width: 100%;
        padding: 0;margin: 0;border: none;
        box-sizing: border-box;
        text-align: center;
        -moz-appearance: textfield;-webkit-appearance: textfield;appearance: textfield;
    }
    .number input[type="number"]::-webkit-outer-spin-button,
    .number input[type="number"]::-webkit-inner-spin-button {
        display: none;
    }
    .number-minus {
        position: absolute;
        top: 0;bottom: 0;left: 1px; width: 35px;
        padding: 0;
        display: block;
        text-align: center;
        border: none;
        font-size: 16px;
        font-weight: 600;
        background-color: white;
    }
    .number-plus {
        position: absolute;
        top: 0;bottom: 0;right:1px; width: 35px;
        padding: 0;
        display: block;
        text-align: center;
        border: none;
        font-size: 16px; font-weight: 600;background-color: white;
    }
</style>