import React, { createRef } from "react";

import CartItems from "./cartItems";

import cert from "../images/Cert.png";
import { Query } from "@apollo/client/react/components";

import {QUERY_CART_INFO} from './cart'

class CartMenu extends React.Component {
 
  constructor(props){
    super(props)
    this.ref = createRef();
  }

  checkIfClickedOutside = (e)=>{
    console.log("Cart menu")
    if (this.props.dropdown && this.ref.current && !this.ref.current.contains(e.target)) {
      this.props.toggleDropDown();
    }
  }
  
  componentDidMount(){
    document.addEventListener("mousedown", this.checkIfClickedOutside)
  }

  componentWillUnmount(){
    document.removeEventListener("mousedown", this.checkIfClickedOutside)
  }

  render() {
    return (
      <div className="menu-items" ref={this.ref}>
        <button
          type="button"
          aria-expanded={this.props.dropdown ? "true" : "false"}
          onClick={()=>{this.props.toggleDropDown()}}
        >    
          <img style={{transform:"translateY(3px)"}} src={cert} alt="cartIcon"></img>
          <Query query={QUERY_CART_INFO}>
          {({loading,error,data})=>{
            if (loading) return <></>
            if (error) return <></>

            let sum = 0;
            data.cartItems.forEach((e)=> sum += e.quantity)
            

          return(
            (data.cartItems.length) ? 
            <div key={sum} id="counter">
              {sum}
            </div>: <></>
          )
          }}
          
        </Query>       
        </button>
        
        <CartItems dropdown={(this.props.dropdown)? "dropdown show" : "dropdown"}
          toggleDropDown={()=>{this.props.toggleDropDown()}}/>
         

      </div>
    );
  }
}

export default CartMenu;