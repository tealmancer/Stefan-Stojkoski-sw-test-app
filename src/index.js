import React from "react";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import Product from "./pages/product";
import CategoryPage from "./pages/category";
import CartPage from "./pages/cartPage";
import client from "./components/apollo-client";

import { ApolloProvider } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";


class App extends React.Component {

  constructor() {
    super();

    this.state = { loaded: 0 }
  }


//The app will wait until the cache is loaded before it displays the main content
  componentDidMount() {
    persistCache({
      cache: client.cache,
      storage: window.localStorage
    }).then(() => {
      this.setState({ loaded: 1 })
    })
  }



  render() {

    if (!this.state.loaded)
      return <p>loading</p>


    return (
      <ApolloProvider client={client}>
        <Header />
        <Main />
      </ApolloProvider>
    );
  }
}

class Main extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" > <Redirect to="/category" /> </Route>
        <Route exact path="/category" component={CategoryPage}></Route>
        <Route exact path="/product/:id" component={Product}></Route>
        <Route exact path="/cartpage" component={CartPage}></Route>
      </Switch>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


