import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AaBwC0IqnN6IY4XM8L9sUQqrH0ArgDkHP5dNpuhIkayXl0uhlNKkW8eardfS2iVNDoy6nYYNROWqRR4f",
            }}
          >
            <App />
          </PayPalScriptProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
