<script>
  import { browser } from '$app/env'
  import { countBasket } from '$lib/stores';
  import Inputnumber  from "$lib/Inputnumber.svelte"
 // import Spinner  from "$lib/Spinner.svelte"
  import flash from '$lib/flash.js';
  import { onMount } from "svelte";

  let cart,name='',adress='',phone='',eMail='',sum=0,textCart//,loading=false

  onMount(() => { 
    if(localStorage.getItem('nameUser')) name=localStorage.getItem('nameUser')
    if(localStorage.getItem('adresssUser')) adress=localStorage.getItem('adresssUser')
    if(localStorage.getItem('phoneUser')) phone=localStorage.getItem('phoneUser')
    if(localStorage.getItem('mailUser')) eMail=localStorage.getItem('mailUser')
  })

  const checkInt = (e) => {e.target.value=e.target.value.replace(/[^0-9+-]/gi,'')},
        checkText=(e) =>{e.target.value=e.target.value.replace(/[^a-zа-яё0-9 +-.,:;]/gi, '')}

  $:{
     if(browser&&localStorage.getItem('cart')){
        localStorage.setItem('cart', JSON.stringify(cart))
        sum=0
        textCart=''
        cart.forEach(i=>{
          sum=sum+i.qty*i.price,
          textCart=textCart+'\n\n '+i.name+'\n '+i.qty+' шт. * '+i.price
        })
        textCart=textCart+'\n\n Сумма: '+sum+'\n\n Пожалуйста, не отвечайте на это письмо,\n уточнить статус заказа можно по телефону +7-927-247-2888 или по почте darom@darom.tk'
      }
    }

  if (browser){
    cart=JSON.parse(localStorage.getItem('cart'))
    if(cart){
        cart.forEach((i,j)=>{
          getItems(i.subcat,i.id,i.qty,j,i.instock)
          sum=sum+i.qty*i.price
        })
      }
  }
 
  async function getItems(subcat,id,qty,j,instock){
    const QUERY =  `{
                    ${subcat}(id:${id}){
                        data{ attributes {name instock sold} }
                    }
              }`  
		const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
		const res= await fetch(import.meta.env.VITE_strapiURL, options)
		const item = await res.json()
    if(instock!=item.data[subcat].data.attributes.instock){
      cart[j].instock=item.data[subcat].data.attributes.instock
    }
    if(qty>item.data[subcat].data.attributes.instock){
      cart[j].qty=item.data[subcat].data.attributes.instock
    }
    return item.data[subcat].data.attributes.sold
	}

  async function createOrder(u='""',a='""',p='""',e='""',t=0,d='""'){
      let result = `"${JSON.stringify(d).replace(/"/g,'')}"`
      const QUERY =  `mutation {
          createOrder(data: { 
            user:${u}, adress:${a}, phone:${p}, email:${e}, total:${t}, basket:${result}
          }) {
            data {id attributes {user adress phone email total basket}}
          }
        }`
      const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
      const res= await fetch(import.meta.env.VITE_strapiURL, options)
      const finres= await res.json()
      if(finres.errors){alert('Что то пошло не так:'+finres.errors[0].message)}
      else{
       // loading=false
        cart=[];localStorage.removeItem('cart'),countBasket.set('')
        alert(`Заказ успешно оформлен, запомните номер заказа - ${finres.data.createOrder.data.id}`)
      }
	}

  async function UPDATE_INSTOCK_SOLD(subcat,i,d){
		const QUERY =  `mutation{
            ${subcat}(id:${i} data:${d})
            {data{ id attributes{instock sold}}}
          }`
		const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
		const res= await fetch(import.meta.env.VITE_strapiURL, options)
		const finres= await res.json()
		if(finres.errors){console.log(finres.errors[0].message);alert('Что то пошло не так:'+finres.errors[0].message)}
		else console.log('Успешно загружено')
	}

/*   const postdata = async()=>{
    let response = await fetch('/api/basket', {
        method: 'POST',
        body:JSON.stringify({name,adress,phone,sum,cart})
      });
      const d = await response.json()
      console.log(103,d)
  } */

</script>

<svelte:head>
	<title>Корзина</title>
	<meta name="description" content="Корзина" />
</svelte:head>
  
<div class="main">

  <h1>Корзина</h1>

  <div class="list">
    {#if cart}
      {#each cart as el,i}
      <div class="child">
        <a sveltekit:prefetch href={`/categories/${el.cat}/${el.subcat}/${el.id}`}>
        <div class="content">
          
            <img src={el.image} alt={el.name}>
            <div>
              <p class="name">{el.name}</p>
              <p class="price">{el.price} ₽</p>
              <p class="name">В наличии: {el.instock}</p>
            </div>
          
        </div>
      </a>

        <div class="control">
          <Inputnumber bind:qty={cart[i].qty} bind:max={cart[i].instock}/>
         
          <svg viewBox="0 0 24 24" on:click={() =>{
            cart=cart.filter((i)=>(i.name!=el.name))
            countBasket.set(cart.length);
            cart.length==0?(localStorage.removeItem('cart'),countBasket.set(''),textCart=''):
              (localStorage.setItem('cart', JSON.stringify(cart)),countBasket.set(cart.length))
          }}>
            <path fill="#ed0202" d="M14.12 10.47 12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/>
          </svg>
         
        </div>
      </div>
      {/each}
    {/if}
  </div>
 
  {#if cart&&cart.length!=0}
    <div class="checkout">
      <h2>Оформление</h2>
      <form target="_blank" action="https://formsubmit.co/darom@darom.tk" method="POST">
        <div class="top">
            <input type="text" name="Ваше имя" class="" placeholder="Ваше имя" bind:value={name} on:input={checkText} required>
            <input type="email" name="email" class="" placeholder="Эл.почта(для уведомления о заказе)" bind:value={eMail}>
            <input type="hidden" name="_autoresponse" value="Ваш заказ в магазине https://darom.tk">
            <!--  <input type="hidden" name="_subject" value="Вы сделали заказ в магазине darom.tk"> -->
            <input type="tel" name="Ваш телефон" class="" placeholder="Телефон(для согласования заказа)"  bind:value={phone} required>
            <textarea name="Ваш адрес для доставки" bind:value={adress} placeholder="Адрес(для доставки)" rows="3" on:input={checkText}/>
          <!--   <input type="hidden" name="_cc" value="1@melochevka.ru"> -->
          <textarea class="displayNone" placeholder="Your Message" name="Ваш заказ" rows="10"  bind:value={textCart}></textarea>
        </div>
        
        <div class="bottom">
          <h2>Сумма: {sum}</h2>
          <button type="submit" class=""
            on:click={(e) =>{
              flash(e)
              if(cart&&(name!=''||name.split('').filter(i=>i!=' ').length!=0)&&(phone!=''||phone.split('').filter(i=>i!=' ').length!=0)){
              
                  localStorage.setItem('nameUser',name); localStorage.setItem('adresssUser',adress); 
                  localStorage.setItem('phoneUser',phone); localStorage.setItem('mailUser',eMail)
                // loading=true
                  try{
                    for (let i=cart.length-1; i>= 0; i--){
                      getItems(cart[i].subcat,cart[i].id,cart[i].qty,i,cart[i].instock).
                        then((sold)=>{
                            const newsubs = 'update'+cart[i].subcat[0].toUpperCase() + cart[i].subcat.slice(1)
                            const data=`{sold:${sold+cart[i].qty},instock:${cart[i].instock-cart[i].qty}}`
                            UPDATE_INSTOCK_SOLD(newsubs,cart[i].id,data)
                        }).
                        then(()=>{ if(i==0) {
                          createOrder(`"${name}"`,`"${adress}"`,`"${phone}"`,`"${eMail}"`,sum,cart)
                        }})
                    }
                   // cart=cart
                  }
                  catch(err) {console.log(432,err)}
                }
            }}
          >Оформить</button>
        </div>
      </form>
    </div>
  {/if}

<!-- <Spinner bind:loading></Spinner> -->

</div>

<style>
  .displayNone{display: none;}
  .main{position: absolute;top:68px;display: flex;flex-wrap: wrap;width: 100%;flex-direction: column;overflow: hidden;}
  h1{width: 100%;font-size: x-large;color: #ed0202;}
  
  .list{width: 100%;}
  .checkout{width: 100%;display: flex;flex-direction: column;padding: 0 2.5%;gap: 20px;}
  .top{display: flex;flex-direction: column;row-gap: 10px;}
  .top input,textarea {border: none;padding: 10px; border-radius: 4px;}
  textarea{font-size: large}

  .child{display: flex;border-bottom: 1px solid grey;flex-wrap: wrap;}

  .content{display: flex;}
  a{width: 100%;text-decoration: none;}
  .content img{width:40%;object-fit: contain;padding-left: 10px;}
  .content p{word-break: break-word; padding: 0 10px;}
  .price{color: #ed0202;font-size: x-large;}
  .name{color:#000000;}

  .control{width: 100%;display: flex;justify-content: center;gap: 20px;align-items: center;}
  .control svg{width: 50px;cursor: pointer;}

  @media only screen and (min-width: 600px) {
    .main {flex-direction: row;}
    .child{height: 200px;margin-left: 30px;margin-bottom: 20px;padding: 20px 0}
    a {width: 80%;}
    
    .content img{height: 200px;width: 20%;}
    .control{width: 20%;flex-direction: column;}
    .list{width: 100%;}
    .checkout{width: 100%;}
  }

  @media only screen and (min-width: 960px) {
    .main {flex-direction: row;}
    .list{width: 65%;}
    .checkout{width: 30%;}
    .control svg{width:65px}
  }

  @media only screen and (min-width: 1200px) {
    .main {width: 80%;margin-left: 10%;}   
  }

  .bottom{display: flex;justify-content: space-around;margin-bottom: 20px;    align-items: center;}

  button{
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: inherit;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 4px;
    -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: #fff;
    background-color: #556cd6;
    height: 44px;
  }

</style>