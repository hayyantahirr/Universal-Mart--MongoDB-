import React from "react";
import { Outlet } from "react-router-dom";// outlet
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { persistor, store } from "./config/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
function Layout() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <Outlet /> 
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}

export default Layout;
