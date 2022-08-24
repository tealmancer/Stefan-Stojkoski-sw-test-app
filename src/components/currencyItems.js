import React from "react";

import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

import { setCurrency } from "./currencies";

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
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error </p>;
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