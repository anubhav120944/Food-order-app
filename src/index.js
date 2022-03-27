import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CartProvider from "./store/CartProvider";
import { AuthProvider } from "./providers/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
