<script>
  import { onMount } from "svelte";
  import {countBasket} from '$lib/stores.js';
  let showMobileMenu = false;

  const handleMobileIconClick = (event) => {
    showMobileMenu = !showMobileMenu;
		event.stopPropagation();
  }

  const mediaQueryHandler = (e) => { if (!e.matches) {showMobileMenu = false}}
  onMount(() => {
    const mediaListener = window.matchMedia("(max-width: 767px)");
    mediaListener.addListener(mediaQueryHandler);
    let len    
    if(localStorage.getItem('cart')){len=JSON.parse(localStorage.getItem('cart')).length; countBasket.set(len)}
  })

  function clickOutside(element, callbackFunction) {
		function onClick(event) {if (!element.contains(event.target)) {callbackFunction()}}
		document.body.addEventListener('click', onClick);
		return {
			update(newCallbackFunction) {callbackFunction = newCallbackFunction},
			destroy() {document.body.removeEventListener('click', onClick)}
		}
	}
</script>
<header>
  <nav>
    <div class="inner">

      <div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
        <div class="middle-line" use:clickOutside={() => {showMobileMenu = false}}></div>
      </div>

      <div class="logo">
        <h2><a sveltekit:prefetch href="/">Darom.tk</a></h2>
      </div>
      <div  class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
        
        <div class="parent">
          <a sveltekit:prefetch href="/search">ГЛАВНАЯ</a>
          <a sveltekit:prefetch href="/categories">КАТАЛОГ</a>
        </div>
      </div>
      <div class="basket">
        <a href="tel:+79272472888">
          <svg class="basket-svg" viewBox="0 0 24 24">
            <g transform="matrix(.05784 0 0 .057963 5.6773e-6 -.025478)">
             <path d="m159.14 256.45c37.217 36.944 80.295 72.236 97.207 55.195 24.215-24.392 39.12-45.614 92.854-2.761 53.734 42.874 12.696 71.727-10.757 95.363-27.064 27.269-128.43 1.911-228.91-97.804-100.47-99.735-126.6-200.9-99.519-228.19 23.46-23.637 52.006-64.879 95.254-11.458 43.269 53.394 22.161 68.462-2.054 92.861-16.904 17.034 18.701 59.84 55.924 96.791zm53.966-176.25s-11.227-1.754-19.088 6.113c-8.092 8.092-8.445 22.032 0.082 30.552 5.039 5.039 12.145 6.113 12.145 6.113 13.852 2.598 34.728 6.997 56.944 29.206 22.209 22.208 26.608 43.084 29.206 56.943 0 0 1.074 7.106 6.113 12.145 8.521 8.521 22.46 8.174 30.552 0.082 7.861-7.86 6.113-19.087 6.113-19.087-4.399-28.057-17.999-57.365-41.351-80.716-23.358-23.351-52.667-36.945-80.716-41.351zm105.31 16.755c40.719 40.719 58.079 86.932 52.428 124.38 0 0-1.972 11.859 5.773 19.604 8.718 8.718 22.535 8.215 30.695 0.062 5.243-5.243 6.385-13.777 6.385-13.777 4.672-32.361-1.203-97.464-64.647-160.9-63.444-63.438-128.54-69.313-160.9-64.648 0 0-8.527 1.136-13.777 6.385-8.16 8.16-8.656 21.978 0.061 30.695 7.746 7.746 19.604 5.773 19.604 5.773 37.449-5.651 83.661 11.71 124.38 52.428z"/>
            </g>
           </svg>
        </a>
        <a sveltekit:prefetch href="/basket">
          <svg class="basket-svg" width="24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
          <span class="countBasket">{$countBasket}</span>
        </a>
      </div>
    </div>
  </nav>
  

</header>

<style>
.modal {
		padding: 16px;
		border: 1px solid black;
	}

  nav {
    background-color: #556cd6; font-family: "Roboto","Helvetica","Arial",sans-serif;
    height: 68px; position: fixed;top: 0; left: 0; width: 100%;z-index: 5;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  }

 .countBasket { position: absolute;
    padding: 0px 6px;
    background: #ed143dc2;
    border-radius: 7px;
    top: -23px;
    left: 10px;
    color: white;
    font-size: medium;
  }

  a{position:relative; color: white; text-decoration: none;}

  .parent>a {font-size: 15px; padding-right: 15px;}

  .basket-svg {
    height: 1em;
    fill: currentcolor;
    font-size: 1.5rem;
    color: white;}
  
  .inner {
    padding-left: 20px;
    padding-right: 20px;
    margin: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .mobile-icon {
    width: 25px;
    height: 14px;
    position: relative;
    cursor: pointer;
  }

  .mobile-icon:after,
  .mobile-icon:before,
  .middle-line {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transition: all 0.4s;
    transform-origin: center;
  }

  .mobile-icon:before,
  .middle-line {
    top: 0;
  }

  .mobile-icon:after,
  .middle-line {
    bottom: 0;
  }

  .mobile-icon:before {
    width: 66%;
  }

  .mobile-icon:after {
    width: 33%;
  }

  .middle-line {
    margin: auto;
  }

  .mobile-icon:hover:before,
  .mobile-icon:hover:after,
  .mobile-icon.active:before,
  .mobile-icon.active:after,
  .mobile-icon.active .middle-line {
    width: 100%;
  }

  .mobile-icon.active:before,
  .mobile-icon.active:after {
    top: 50%;
    transform: rotate(-45deg);
  }

  .mobile-icon.active .middle-line {
    transform: rotate(45deg);
  }

  .navbar-list {
    display: none;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    padding: 0 40px;
  }

  .navbar-list.mobile {
    background-color: #556cd6;
    position: fixed;
    display: block;
    /* height: calc(100% - 45px);
    bottom: 0; */
    top:68px;left: 0;width: 100%;
    padding-bottom: 20px;
  }

  @media only screen and (min-width: 767px) {
    .mobile-icon {
      display: none;
    }

    .navbar-list {
      display: flex;
      padding: 0;
      justify-content: space-around;
    }

  }

  .basket{display: flex;width: 76px;justify-content: space-between;}

  @media (max-width: 767px) {
    .basket{position: fixed;right: 19px;}
    .logo{position: fixed;left: calc(50% - 52px);}
  }
</style>