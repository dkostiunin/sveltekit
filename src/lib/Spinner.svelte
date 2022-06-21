<script>
    export let loading = false
</script>

<fieldset class:loading></fieldset>

<style>
    fieldset {
        display: inline-flex;
        flex-direction: column;
        border:none;
        padding: 20px;
        row-gap: 30px;
    }

  .loading:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #ffffffd6;
	}
	
	.loading:after  {
		content: '';
		position: absolute;
		left: calc(50% - 44px);
		top: calc(50% - 48px);
		width: 88px;
    height: 88px;
    border: 10px solid #FFF;
    border-bottom-color: blue;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
	}
	
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>