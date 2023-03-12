// import './styles/globals.css'

import store from "@/store";
import { Fragment } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )
}
