<script>
  import { browser } from '$app/env'
  import { countBasket } from '$lib/stores';
  import Inputnumber  from "$lib/Inputnumber.svelte"
  import Spinner  from "$lib/Spinner.svelte"
  import flash from '$lib/flash.js';
  import { onMount } from "svelte";

  let cart,name='',adress='',phone='',sum=0,loading=false 

  onMount(() => { 
    if(localStorage.getItem('nameUser')) name=localStorage.getItem('nameUser')
    if(localStorage.getItem('adresssUser')) adress=localStorage.getItem('adresssUser')
    if(localStorage.getItem('phoneUser')) phone=localStorage.getItem('phoneUser')
  })

  const checkInt = (e) => {e.target.value=e.target.value.replace(/[^0-9+-]/gi,'')},
        checkText=(e) =>{e.target.value=e.target.value.replace(/[^a-zа-яё0-9 +-.,:;]/gi, '')}

  $:{
     if(browser&&localStorage.getItem('cart')){
        localStorage.setItem('cart', JSON.stringify(cart))
        sum=0
        cart.forEach(i=>sum=sum+i.qty*i.price)
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
    //console.log(cart[j],qty,item.data[subcat].data.attributes.instock)
    if(instock!=item.data[subcat].data.attributes.instock){
      console.log('wwwweerr')
      cart[j].instock=item.data[subcat].data.attributes.instock
    }
    if(qty>item.data[subcat].data.attributes.instock){
      console.log('rrrr')
      cart[j].qty=item.data[subcat].data.attributes.instock
    }
    return item.data[subcat].data.attributes.sold
	}

  async function createOrder(u='""',a='""',p='""',t=0,d='""'){
      let result = `"${JSON.stringify(d).replace(/"/g,'')}"`
      const QUERY =  `mutation {
          createOrder(data: { 
            user:${u}, adress:${a}, phone:${p}, total:${t}, basket:${result}
          }) {
            data {id attributes {user adress phone total basket}}
          }
        }`
      const options = { method: "post",headers: {"Content-Type": "application/json"},body: JSON.stringify({query: QUERY})};
      const res= await fetch(import.meta.env.VITE_strapiURL, options)
      const finres= await res.json()
      console.log(finres.data.createOrder.data.id)
      
      if(finres.errors){console.log(finres.errors[0].message);alert('Что то пошло не так:'+finres.errors[0].message)}
      else{
        loading=false
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
		console.log(finres)
		
		if(finres.errors){console.log(finres.errors[0].message);alert('Что то пошло не так:'+finres.errors[0].message)}
		else console.log('Успешно загружено')
	}

  const postdata = async()=>{
    let response = await fetch('/api/basket', {
        method: 'POST',
        body:JSON.stringify({name,adress,phone,sum,cart})
      });
      const d = await response.json()
      console.log(103,d)
  }

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
            cart.length==0?(localStorage.removeItem('cart'),countBasket.set('')):
              (localStorage.setItem('cart', JSON.stringify(cart)),countBasket.set(cart.length))
          }}>
            <path fill="#ed0202" d="M14.12 10.47 12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/>
          </svg>
         
        </div>
      </div>
      {/each}
    {/if}
  </div>
 
  <div class="checkout">
    <h2>Оформление</h2>
    <input bind:value={name} placeholder="Имя(фамилия)" maxlength="25" on:input={checkText}/>
	  <textarea bind:value={adress} placeholder="Адрес(если нужна доставка)" rows="3" on:input={checkText}/>
    <input bind:value={phone} placeholder="Телефон(для согласования заказа)" maxlength="25" on:input={checkInt} type="text"/>
    <div class="bottom">
      <h2>Сумма: {sum}</h2>
      <button on:click={(e) =>{
        flash(e)
        postdata()
        
       // console.log(321,name,adress,phone,sum)
        if(name==''||name.split('').filter(i=>i!=' ').length==0)
          setTimeout(()=>{ alert('Для оформления заказа пожалуйста укажите имя (как к Вам обращаться)')},250)
        else if(phone==''||phone.split('').filter(i=>i!=' ').length==0) 
          setTimeout(()=>{ alert('Для оформления заказа пожалуйста укажите телефон (нужен для согласования заказа)')},250)
        else if(cart){
          localStorage.setItem('nameUser',name); localStorage.setItem('adresssUser',adress); localStorage.setItem('phoneUser',phone)
          loading=true
          try{
            for (let i=cart.length-1; i>= 0; i--){
              getItems(cart[i].subcat,cart[i].id,cart[i].qty,i,cart[i].instock).
                then((sold)=>{
                    const newsubs = 'update'+cart[i].subcat[0].toUpperCase() + cart[i].subcat.slice(1)
                    const data=`{sold:${sold+cart[i].qty},instock:${cart[i].instock-cart[i].qty}}`
                    console.log(data,newsubs,cart[i].id)
                    UPDATE_INSTOCK_SOLD(newsubs,cart[i].id,data)
                }).
                then(()=>{ if(i==0) {
                  console.log(666777)
                  createOrder(`"${name}"`,`"${adress}"`,`"${phone}"`,sum,cart)
                 // postdata()
                }})
            }
          }
          catch(err) {console.log(432,err)}
        }
      }}>Оформить</button>
      <form target="_blank" action="https://formsubmit.co/darom@darom.tk" method="POST">
        <div class="form-group">
          <div class="form-row">
            <div class="col">
              <input type="text" name="name" class="form-control" placeholder="Full Name" required>
            </div>
            <div class="col">
              <input type="email" name="email" class="form-control" placeholder="Email Address" required>
              <input type="hidden" name="_autoresponse" value="your custom message">
              <input type="hidden" name="_cc" value="1@melochevka.ru">
            </div>
          </div>
        </div>
        <div class="form-group">
          <textarea placeholder="Your Message" class="form-control" name="message" rows="10" required></textarea>
        </div>
        <button type="submit" class="btn btn-lg btn-dark btn-block">Submit Form</button>
      </form>
    </div>
  </div>

<Spinner bind:loading></Spinner>

</div>

<style>
  .main{position: absolute;top:68px;display: flex;flex-wrap: wrap;width: 100%;flex-direction: column;overflow: hidden;}
  h1{width: 100%;font-size: x-large;color: #ed0202;}
  
  .list{width: 100%;}
  .checkout{width: 100%;display: flex;flex-direction: column;padding: 0 2.5%;gap: 20px;}
  .checkout input,textarea {border: none;padding: 10px; border-radius: 4px;}
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