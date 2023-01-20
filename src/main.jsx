import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { InMemoryCache, ApolloProvider, ApolloClient, createHttpLink } from '@apollo/client'
import './index.css'

  
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_DGRAPH_URI
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
