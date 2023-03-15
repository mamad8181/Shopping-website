
import store from "@/store";
import { Provider } from "react-redux";

import '../styles/fontFamilies.css'


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <div className="font" >
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
