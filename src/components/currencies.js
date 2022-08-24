
import client from "../components/apollo-client";
import { gql } from "@apollo/client";

export const QUERY_CURRENT_CURRENCY = gql`
query CurrentCurrency{
  currency @client
}
`

export function getCurrency(){
    let currency = client.readQuery({query:QUERY_CURRENT_CURRENCY})
    return currency;
}

export function setCurrency(currency){
    client.writeQuery({query:QUERY_CURRENT_CURRENCY, data:{currency:currency}})
}
