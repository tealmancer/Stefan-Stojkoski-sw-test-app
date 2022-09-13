import React from "react";

import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

import { setCurrency } from "./currencies";

import "../../loader.css"

const CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      symbol
      label
    }
  }
`;

class CurrencyItems extends React.Component{
    render(){
       
        return(
            <Query query={CURRENCIES}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <ul className={`${this.props.dropdown}`}>
                                <li className="loader"></li>
                            </ul>
                        )
                    };
                    if (error) {
                        return(
                            <ul className={`${this.props.dropdown}`}>
                                <li className="error">
                                    Error
                                </li>
                            </ul>
                        )
                    } ;
                    return (
                        <ul className={`${this.props.dropdown}`}>
                            {data.currencies.map(({ symbol, label }) => (
                                <li key={label}>
                                    <button onClick={() => { setCurrency(symbol); this.props.toggle() }}>
                                        {symbol} {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )
                }}
            </Query>    
        )
    }
}



export default CurrencyItems;