<script>
  import { onMount } from "svelte";
  let showMobileMenu = false;

  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

  const mediaQueryHandler = (/** @type {{ matches: any; }} */ e) => { if (!e.matches) {showMobileMenu = false}}
  onMount(() => {
    const mediaListener = window.matchMedia("(max-width: 767px)");
    mediaListener.addListener(mediaQueryHandler);
  });
  
</script>
<header>
  <nav>
    <div class="inner">
      <div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
        <div class="middle-line"></div>
      </div>
      <div class="logo">
        <h2><a sveltekit:prefetch href="/">Darom.tk</a></h2>
      </div>
      <div class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>     
        
        <div class="parent">
          <a sveltekit:prefetch href="/basket">ГЛАВНАЯ</a>
          <a sveltekit:prefetch href="/categories">КАТАЛОГ</a>
        </div>   
      </div>
      <div class="basket">
        <a sveltekit:prefetch href="/basket">
          <svg class="basket-svg" width="24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
        </a>
      </div>
    </div>
  </nav>
</header>

<style>
  nav {
    background-color: #556cd6; font-family: "Roboto","Helvetica","Arial",sans-serif;
    height: 68px; position: fixed;top: 0; left: 0; width: 100%;z-index: 2;
  }

  a{color: white; text-decoration: none;}

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

  @media (max-width: 767px) {
    .basket{position: fixed;right: 19px;}
    .logo{position: fixed;left: calc(50% - 52px);}
  }
</style>