<div class="number">
	<button class="number-minus" type="button" 
        on:click={(e)=>{
            e.target.nextElementSibling.stepDown()//; e.target.nextElementSibling.onchange()
            }}>&ndash;
    </button>
	<input type="number" min="0" value="1">
	<button class="number-plus" type="button"
          on:click={(e)=>{
             e.target.previousElementSibling.stepUp()//; e.target.previousElementSibling.onchange() 
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