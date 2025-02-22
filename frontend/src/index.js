import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { Bounce, ToastContainer } from "react-toastify";

import "./styles/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Routing from "./router/router";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="bg-white border border-secondary-500/50 border-b-2 border-b-secondary-500 rounded-xl text-sm text-secondary-800 py-2 px-4 shadow-md"
        icon={false}
        transition={Bounce}
      />
      <Routing />
    </Router>
  </Provider>
);
