import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/Themes/Themes.css'
import './index.css'
import './scrollBar.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
)
