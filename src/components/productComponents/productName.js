import React from "react";
import "../../productStyles.css";
import "./productName.css"

class ProductName extends React.Component{
    render(){
    return (
      <div>
        <div className = {"productBrand"}>{this.props.brand}</div>
        <div className = {"productName"}>{this.props.name}</div>
      </div>
      )
    }
}

export default ProductName;