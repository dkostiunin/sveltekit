import { countBasket } from "./stores"

export default function addtocart(cart,qty,product,cat,subcat,id){
    console.log(cat,subcat,id)
    if(cart){
        for (let i=cart.length-1; i>= 0; i--) {
            if(cart[i].subcat==subcat&&cart[i].article==product.article){
                cart[i].qty+qty<product.instock?cart[i].qty+=qty:cart[i].qty=product.instock
                break
            }
            if(i==0){
                if(qty>product.instock)qty=product.instock
                cart.push(
                    {
                        article:product.article,name:product.name,price:product.price,id:id,
                        instock:product.instock,qty:qty,cat:cat,subcat:subcat,image:product.listimage.a
                    }
                )
            }
        }
    }
    else{
        cart=[]
        if(qty>product.instock)qty=product.instock
        cart.push(
                    {
                        article:product.article,name:product.name,price:product.price,id:id,
                        instock:product.instock,qty:qty,cat:cat,subcat:subcat,image:product.listimage.a
                    }
                )
    }
    console.log(cart)
    countBasket.set(cart.length);
    localStorage.setItem('cart', JSON.stringify(cart)) 

}