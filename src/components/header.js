import React from "react";

import "../styles.css";

import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { setCategory } from "./selectedCategory";



import CurrencyMenu from "./CurrencyMenu";
import CartMenu from "./cartMenu";
import { Link } from "react-router-dom";



const CATEGORIES = gql`
query getCategories{
  categories{
    name
  }
  selectedCategory @client
}
`;





class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdown: false };
 
  }



 

  toggleDropDown = () => {
    this.setState((prevState) => ({
      dropdown: !prevState.dropdown
    }));
  };


  render() {
   
    return (
      <>
        <div className="header">

          <ul className="tab_left">
            <Query query={CATEGORIES} >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error </p>;

                return data.categories.map(
                  ({ name }) => {
                    return (
                      <Link key={name} to={"/category"}>
                        <button onClick={() => setCategory(name)} className={(data.selectedCategory === name) ? "selected" : ""}>{name}</button>
                      </Link>
                    )
                  }
                );
              }
              }
            </Query>
          </ul>

          <ul className="tab_right">
            <li>
              <CurrencyMenu />
            </li>
            <li>
              <CartMenu dropdown={this.state.dropdown} toggleDropDown={() => { this.toggleDropDown() }} />
            </li>
          </ul>



        </div>
        <div className={`overlay ${(this.state.dropdown) ? "show" : ""}`}> </div>
      </>
    );
  }
}

export default Header;
