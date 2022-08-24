import React from "react";
import "../productStyles.css";

import ProductName from "../components/productName";
import ProductAttributes from "../components/productAttributes";
import ProductPrice from "../components/ProductPrice";


class ProductInfo extends React.Component {


    render() {
        let currency = this.props.data.currency

        const price = this.props.data.product.prices.find((e) => { return e.currency.symbol === currency })
        return (

            <div className={`productDetails ${this.props.displayType}`}>
                <div style={{ padding: `${this.props.displayType ? "0px" : "0px 0px 30px"}` }}>
                    <ProductName brand={this.props.data.product.brand} name={this.props.data.product.name} />
                </div>
                
                {/*different rendering order for product page and cart page/dropdown menu, respectively*/
                this.props.displayType ? (
                    <div>
                        <ProductPrice displayType={this.props.displayType} currency={currency} price={price.amount} />
                        <ProductAttributes state={this.props.state} id={this.props.data.product.id} attributes={this.props.data.product.attributes} />
                    </div>
                ) : (
                    <div>
                        <ProductAttributes state={this.props.state} setstate={(arg) => { this.props.setstate(arg) }} id={this.props.data.product.id} attributes={this.props.data.product.attributes} />
                        <ProductPrice displayType={this.props.displayType} currency={currency} price={price.amount} />
                    </div>
                )}


            </div>

        )
    }
}


export default ProductInfo;