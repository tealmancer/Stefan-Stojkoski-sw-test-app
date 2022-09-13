import { ApolloClient, InMemoryCache } from "@apollo/client";



const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        currency:{
          read(currency = "$"){
            return currency;
          }
        },
        cartItems:{
          read(cartItems = []){
            return cartItems;
          }
        },
        selectedCategory:{
          read(selectedCategory = "all"){
            return selectedCategory;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: "http://localhost:4000",

  cache: cache,

  fetchOptions: {
    mode: 'no-cors'
  },
  csrfPrevention: true
});



export default client;
