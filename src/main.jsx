import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import stylisRTLPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { InMemoryCache, ApolloProvider, ApolloClient, createHttpLink } from '@apollo/client'
import { createTheme, ThemeProvider } from '@mui/material'
import './index.css'



//* Material UI theme and It's styles
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, stylisRTLPlugin]
})

const rtlTheme = createTheme({ direction: "rtl" });


//* Apollo Client
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_DGRAPH_URI
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})


//* React DOM Root
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={rtlTheme}>
          <BrowserRouter> 
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  </React.StrictMode>
)
