import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router';
import cert from "../images/cart2.svg";
import { insertItem } from "../components/cartComponents/cart";
import { getCategory } from "../components/selectedCategory";

import "../categoryStyles.css";
import "../loader.css"

function PRODUCTS(){
const products = gql`
  {
    category(input: { title: "${getCategory()}" }) {
      products{
        id
        name
        inStock
        gallery
        brand
        attributes {
          name
          items {
            value
          }
        }
        prices {
          currency{
            symbol
          }
          amount
        }
      }
    }
    currency @client
  }
`;
return products
} 
    
class CategoryPage extends React.Component {

  constructor(props){
    super(props);
   
    this.state ={ index:-1 }

  }

 
  async componentDidMount() {
    window.scrollTo(0, 0);
  }
 

  render() {
    let categoryName = this.props.match.params.categoryName;

    return (
      <div className="categoryContainer" >
        <h1 className="categoryHeading">{getCategory()}</h1>

        <div className="productContainer">
         <Query query={PRODUCTS(categoryName)} variables={{ input: { title: `${getCategory()}` } }}>
            {({ loading, error, data }) => {
              if (loading) return <div className="loader"></div>;
              if (error) return <div className="error">Error</div>;     

              
              let currency = data.currency;
             
              return data.category.products.map(
                (product,index) => {
                  /*get value respective to currently selected currency*/
                 let price = product.prices.find(e=>e.currency.symbol === currency)
                  /***/
                 
                  /*Set default attributes to be able to add to cart from the category page*/
                 let selAtts = [];
                product.attributes.forEach(({name,items}) => {selAtts.push({name:name,value:items[0].value})})
                /***/  
                  return(
                   <div key={product.id} className="productSquare" onMouseEnter={()=>{this.setState({index:index})}} onMouseLeave={()=>{this.setState({index:-1})}}>
                     <div  className="categoryProductImageContainer">
                      <img src={product.gallery[0]} alt={"img"} />
                      {(!product.inStock) && <div id="oos">OUT OF STOCK</div>}
                      {(index===this.state.index && product.inStock)?<button  className="categoryCartButton" onClick={()=>{insertItem({data:{product:product},selAtts,quantity:1})}}>
                        <div style={{filter:"invert(1)"}}>
                        <img src={cert} alt="addToCart"></img>
                        </div>
                      </button>: <></>}
                      <Link to={"/product/"+product.id}> <div className="productLink"></div></Link>
                     </div>
                     
                     <div className="categoryProductImageDescription">
                        <div>{product.brand} {product.name}</div> 
                        <div className="categoryProductPrice">{price.currency.symbol}{price.amount}</div>
                     </div>
                   </div>
                )}
              );
            }}
          </Query>
        </div>
    </div>
    );
  }
}


export default withRouter(CategoryPage);

