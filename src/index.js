import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { Provider as QueryProvider } from "react-query";
import App from "./App";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import ErrrorBoundaryClass from "./components/ErrrorBoundaryClass";
import { AppFallbackFunction } from "./components/ErrorFallbackFunction";
import "./i18n"; // Import i18n configuration
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrrorBoundaryClass fallback={AppFallbackFunction()}>
    {/* <React.StrictMode> */}
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    {/* </React.StrictMode> */}
  </ErrrorBoundaryClass>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
