import React from "react";

import { Query } from "@apollo/client/react/components";
import "../productStyles.css";
import "../styles.css";

import { withRouter } from 'react-router';


import ProductInfo from "../components/ProductInfo";
import ProductQuantity from "../components/productQuantity";
import ProductGallery from "../components/productGallery";

import { updateSelectedAttributes } from "../components/cart"
import { updateQuantity } from "../components/cart"
import { showQuantity } from "../components/cart"
import { removeItem } from "../components/cart";

import { gql } from "@apollo/client";

const CART_AND_CURRENCY_INFO = gql`
query CartCache{
  cartItems @client
  currency @client
}
`

class CartPage extends React.Component {


    render() {
        return (
            <Query query={CART_AND_CURRENCY_INFO}>
                {({ loading, error, data }) => {

                    if (loading) return <p>loading</p>
                    if (error) return <p>error</p>
                    let amount = data.cartItems.reduce((prev, current) => {
                        return prev + current.quantity;
                    }, 0);
                    let sum = 0;


                    return (
                        <div style={{padding: "5vw"}}>

                            <h1 className="cartPageHeading"> CART</h1>
                            <div className="lineDivider"></div>
                            {data.cartItems.map((item, index) => {

                                let price = item.data.product.prices.find(e => e.currency.symbol === data.currency)
                                sum += (price.amount * item.quantity);
                                return (
                                    <div key={index}>
                                        <div className="cartPage" key={index}>
                                            <ProductInfo id={index} state={item.selAtts} setstate={(args) => { updateSelectedAttributes(index, args) }} data={{ product: item.data.product, currency: (data.currency) ? data.currency : "$" }} displayType="cart" />
                                            <ProductQuantity update={(arg) => { updateQuantity(index, arg) }} quantity={showQuantity(index)} />
                                            <ProductGallery gallery={item.data.product.gallery} displayType="cart" />
                                            <button className="productRemoveButton"  onClick={()=>{removeItem(index)}}>X</button>
                                        </div>
                                        <div className="lineDivider">  </div>
                                    </div>
                                );
                            })}



                            <div className="priceTotal">
                                <div>Tax 21%: <b>{data.currency + parseFloat((sum * 0.21).toFixed(2))}</b></div>
                                <div>Quantity: <b>{amount}</b> </div>
                                <div>Total: <b>{data.currency + parseFloat(sum.toFixed(2))}</b></div>
                                <button className="orderButton">ORDER</button>
                            </div>
                        </div>
                    )
                }}
            </Query>
        )
    }
}


export default withRouter(CartPage);