import React from "react";

import ProductInfo from "../productComponents/ProductInfo";
import ProductQuantity from "../productComponents/productQuantity";
import ProductGallery from "../productComponents/productGallery";


import { Query } from "@apollo/client/react/components";

import { Link } from "react-router-dom";


import {updateQuantity} from "./cart"
import { removeItem } from "./cart";

import { gql } from "@apollo/client";

const CART_AND_CURRENCY_INFO = gql`
query CartCache{
  cartItems @client
  currency @client
}
`


class CartItems extends React.Component {

    render(){
        
        
        return(
            <Query query={CART_AND_CURRENCY_INFO}>
                {({ loading, error, data }) => {

                    if (loading) return <p>loading</p>
                    if (error) return <p>error</p>
                    let sum = 0;
                    let quantity = 0;
                    data.cartItems.forEach((e)=> quantity += e.quantity)
                    return (
                        <ul className={`${this.props.dropdown}`}>
                            <div className="bagTotalCart">
                            <div><b>My Bag,</b></div>
                                {
                                    (data.cartItems.length) ? 
                                    <div key={quantity}>
                                    {quantity} Items
                                    </div>: <></>
                                }
                            </div>
                            {data.cartItems.map((item, index) => {
                                
                                let price = item.data.product.prices.find(e => e.currency.symbol === data.currency)
                                sum += (price.amount * item.quantity);
                                return (
                                <li key={index}>  
                                    <ProductInfo state={item.selAtts} data={{product:item.data.product, currency:data.currency}} displayType="cart" />
                                    <ProductQuantity update = {(arg) => {updateQuantity(index,arg)}} quantity = {item.quantity} />
                                    <ProductGallery gallery={item.data.product.gallery} displayType="cart" />
                                    <button className="productRemoveButton"  onClick={()=>{removeItem(index)}}>X</button>
                                </li> 
                            )})}

                            <div className="priceTotalCart">
                                <div>Total:</div>
                                <div>{data.currency + parseFloat(sum.toFixed(2))}</div>    
                            </div>

                            <li className="dropdown_footer">
                                
                                <Link to="/cartpage">
                                    <button onClick={()=>{this.props.toggleDropDown()}}>
                                        VIEW BAG
                                    </button>
                                </Link>
                                <button>CHECK OUT</button>
                            </li>
                        </ul>
                    )
                }}
            </Query>
        )
    }
}

export default CartItems;
