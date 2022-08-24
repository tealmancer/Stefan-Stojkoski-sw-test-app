
import client from "../components/apollo-client";
import { gql } from "@apollo/client";

export const QUERY_CART_INFO = gql`
query CartCache{
  cartItems @client
}
`


export function insertItem(item){
    let data = readItems();
    let cartItems = data.cartItems;

    let itemPresent = 0;

    for(let i = 0; i<cartItems.length; i++){
        if(item.data.product.id === cartItems[i].data.product.id){
            itemPresent = 1;
            for(let j = 0; j<item.selAtts.length; j++){
                if(item.selAtts[j].value !== cartItems[i].selAtts[j].value){
                    itemPresent = 0;
                    break;
                }
            }

            if(itemPresent){
               updateQuantity(i,"+");
                return;
            }

        }


    }


    client.writeQuery({query:QUERY_CART_INFO,data:{cartItems:[...cartItems, {...item}]}})
}


export function updateItem(id,item){
    client.cache.updateQuery({query:QUERY_CART_INFO}, (data)=>{ 
        let items = [...data.cartItems]
        items[id] = item;
        return {
        cartItems:items
    }})
}

export function removeItem(index){
    client.cache.updateQuery({query:QUERY_CART_INFO}, (data)=>{ 
        let items = [...data.cartItems]
        items.splice(index,1);
        return {
            cartItems:items
        }

    })
}

export function updateSelectedAttributes(id,newAttribute){
    client.cache.updateQuery({query:QUERY_CART_INFO}, (data)=>{ 
       
        let items = data.cartItems.map(e=>{return{...e}});
        
        items[id].selAtts = items[id].selAtts.map((e)=>{return (e.name!==newAttribute.name)? e : {...newAttribute}})
   
        return {
        cartItems:items
    }})
} 
          
export function showQuantity(id){
    let data = readItems();
    let items = [...data.cartItems];
    return items[id].quantity;
}

export function updateQuantity(id,operator){
    client.cache.updateQuery({query:QUERY_CART_INFO}, (data)=>{
        let items = data.cartItems.map(e=>{return{...e}});
        if(operator === "+"){
            items[id].quantity = items[id].quantity + 1;
        }else if (operator === "-"){
            if(items[id].quantity>1){
                items[id].quantity = items[id].quantity - 1;
            }
        }
        return {
            cartItems:items
        }
    })
}


export function readItems(){
    let data = client.readQuery({query:QUERY_CART_INFO})
    return data
}

export function logItems(){
    const data = readItems()
    console.log(data)
}
