import React, { useEffect, useReducer } from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header'
import { collectionReducer } from '../reducer/collectionReducer';
import '../styles/globals.css'

export const CollectionContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [collection, dispatch] = useReducer(collectionReducer, []);

  useEffect(() => {
    dispatch({ type: 'init' })
  },[]);

  return (
    <CollectionContext.Provider value={{ collection: collection, collectionDispatch: dispatch }}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </CollectionContext.Provider>
  )
}

export default MyApp
