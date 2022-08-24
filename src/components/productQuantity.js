import React from "react";
import "../productStyles.css";




class ProductQuantity extends React.Component {
    render() {
        let quantity = this.props.quantity;
        return (     
            <div className="productQuantity">
                <button onClick={() => { this.props.update("+") }}>+</button>
                <div>{quantity}</div>
                <button onClick={() => { this.props.update("-") }}>-</button>
            </div>
        )
    }
}

export default ProductQuantity;