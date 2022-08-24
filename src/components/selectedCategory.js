import client from "../components/apollo-client";

import { gql } from "@apollo/client";


const CATEGORY_INFO = gql`
query CategoryCache{
  selectedCategory @client
}
`;

//get and set current selected category in cache

export function setCategory(selectedCategory){
    client.writeQuery({query:CATEGORY_INFO, data:{selectedCategory:selectedCategory}})
}

export function getCategory(){
    let data = client.readQuery({query:CATEGORY_INFO});
    return data.selectedCategory;
}