import React from "react";        
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "../productStyles.css";

import parse from "html-react-parser";

import {withRouter} from 'react-router';

import ProductGallery from "../components/productComponents/productGallery"

import ProductInfo from "../components/productComponents/ProductInfo";

import client from "../components/apollo-client";

import { insertItem } from "../components/cartComponents/cart";

function PRODUCT(id){
  const product = gql`
  query GetProducts {
    product(id:"${id}") {
      id
      brand
      name
      inStock
      gallery
      attributes {
        name
        items {
          value
        }
      }
      description
      prices{
        currency{
          symbol
        }
        amount
      }
    }
    currency @client
  }
`;
  return product;
}




class ProductClass extends React.Component{
  constructor(props){
    super(props); 
        //Selected attributes will be stored in a state, 
        //that will then be saved to apollo cache after hitting the Add to Cart button
        this.state={selectedAttributes:[]}
  }


  addAttribute = (attribute) => {
    this.setState({selectedAttributes:[...this.state.selectedAttributes, attribute]});
  }

  updateAttribute = (newAttribute) => {
    const indexOfAtt = this.state.selectedAttributes.findIndex((attribute)=>attribute.name === newAttribute.name);
    if (indexOfAtt === -1){
      this.addAttribute(newAttribute);
    }
    else{
      let selectedAttributes = this.state.selectedAttributes.map(att => {return Object.assign({},att)});
      selectedAttributes[indexOfAtt] = Object.assign({},newAttribute);
      this.setState({selectedAttributes:selectedAttributes})
    }
    
    
  };

  addToCart = (data) =>{
    
    const selAtts = this.state.selectedAttributes;


    for(let i = 0; i<selAtts.length; i++){
      if(selAtts[i].value === undefined){
        alert("Select all item attributes first!");
        return;
      }
    }
    insertItem({data:{product:data.product},selAtts,quantity:1});
  }

  //Load the first selection of each attribute as default
  async componentDidMount() {
    let id = this.props.match.params.id;
    window.scrollTo(0, 0);
  
    client.query({query:gql`
    query GetProducts{
      product(id:"${id}"){
        attributes{
          name items{
            value
          }
        }
      }
    }
    `}).then((result)=>{
      let sa = [];
      result.data.product.attributes.forEach(({name,items}) => {sa.push({name:name,value:undefined})})
      this.setState({selectedAttributes:sa});
    })


  }
  render(){
   let id = this.props.match.params.id;
   
   
   
    return(
      <Query query={PRODUCT(id)} variables = {{id:id}}>
        {({ loading, error, data })=>{
          if (loading)  {
            return (<p>Loading...</p>)
          }
          if (error) return <p>Error </p>;

          
          const htmlString = data.product.description;
          const reactElement = parse(htmlString);
          
          return (
            <div className="productView">
              <ProductGallery gallery = {data.product.gallery} displayType = "" />  
              <div className = "productDetails">
                <ProductInfo state = {this.state.selectedAttributes} setstate = {(arg)=>{this.updateAttribute(arg)}} data = {data} displayType = "" />
                {(data.product.inStock)?<button className = "cartButton" onClick={()=>{this.addToCart(data)}}>ADD TO CART</button>:<button className="cartButtonNoStock">OUT OF STOCK</button>} 
                <div className="ProductDescription">
                  {reactElement} 
                </div>
              </div> 
            </div>
          );
        }}
      </Query>
    )
  }
}

export default  withRouter(ProductClass);
