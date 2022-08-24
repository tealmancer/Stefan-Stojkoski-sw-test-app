import React from "react";

import ProductInfo from "./ProductInfo";
import ProductQuantity from "./productQuantity";
import ProductGallery from "./productGallery";


import { Query } from "@apollo/client/react/components";

import { Link } from "react-router-dom";


import {updateQuantity} from "./cart"
import {showQuantity} from "./cart";
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
                    return (
                        <ul className={`${this.props.dropdown}`}>
                            {data.cartItems.map((item, index) => {
                                
                                let price = item.data.product.prices.find(e => e.currency.symbol === data.currency)
                                sum += (price.amount * item.quantity);
                                return (
                                <li key={index}>  
                                    <ProductInfo state={item.selAtts} data={{product:item.data.product, currency:data.currency}} displayType="cart" />
                                    <ProductQuantity update = {(arg) => {updateQuantity(index,arg)}} quantity = {showQuantity(index)} />
                                    <ProductGallery gallery={item.data.product.gallery} displayType="cart" />
                                    <button className="productRemoveButton"  onClick={()=>{removeItem(index)}}>X</button>
                                </li> 
                            )})}

                            <div className="priceTotalCart">
                                <div>Total: </div>
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