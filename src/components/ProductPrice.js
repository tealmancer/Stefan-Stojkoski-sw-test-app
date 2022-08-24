import React from "react";
import "../productStyles.css";

export default class ProductPrice extends React.Component{
    render(){
        return(
            <div>
                <div className = {`attributeName ${this.props.displayType}`}>PRICE: </div>
                <div className="productPrice">{this.props.currency} {this.props.price}</div> 
            </div>
        )
    }
}