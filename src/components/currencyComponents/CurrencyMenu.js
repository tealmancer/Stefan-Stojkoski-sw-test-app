import React, { createRef } from "react";
import {AiOutlineDown} from "react-icons/ai"
import {AiOutlineUp} from "react-icons/ai"


import CurrencyItems from "./currencyItems";

import { Query } from "@apollo/client/react/components";

import {QUERY_CURRENT_CURRENCY} from "./currencies"


class CurrencyMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownCurr: false };
    this.ref = createRef();
  }

  toggleDropDownCurr = () => {
    this.setState((prevState) => ({
      dropdownCurr: !prevState.dropdownCurr
    }));
  };


  checkIfClickedOutside = (e)=>{
    console.log("Currency menu")
    if (this.state.dropdownCurr && this.ref.current && !this.ref.current.contains(e.target)) {
      this.setState({dropdownCurr:false})
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
          aria-expanded={this.state.dropdownCurr ? "true" : "false"}
          onClick={this.toggleDropDownCurr}
        >
         <Query query={QUERY_CURRENT_CURRENCY}>
          {({loading,error,data})=>{
            if(loading) return;
            if(error) return;

            let currency = data.currency
            
            return(
              <>
                {currency}
              </>
            )
          }}
         </Query>
          {(this.state.dropdownCurr)? <AiOutlineUp  style={{height:"10px"}} /> : <AiOutlineDown style={{height:"10px"}}/>}
         
        </button>

        <CurrencyItems
          toggle={this.toggleDropDownCurr}
          dropdown={(this.state.dropdownCurr) ? "dropdownCurr show" : "dropdownCurr"} />
        
      </div>
    );
  }
}


export default CurrencyMenu;
