import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

function productsReducer(
  state = [
    { name: "Manzana", isBought: true },
    { name: "Naranjas", isBought: false },
  ],
  action
) {
  switch (action.type) {
    case "ADD_PRODUCT":
      //Agregar al array de productos, lo que viene del action.payload

      return [...state, action.payload];

    case "REMOVE_PRODUCT":
      //Sacar el product de la lista

      return state.filter((p) => p.name !== action.payload);

    case "TOGGLE_BOUGHT":
      return state.map((product) =>
        product.name === action.payload
          ? { name: product.name, isBought: !product.isBought }
          : product
      );

    default:
      return state;
  }
}

const store = configureStore({
  reducer: { products: productsReducer },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

//onSubmit envia toda la info que esta dentro del formulario, junta los campos y los manda.
//
