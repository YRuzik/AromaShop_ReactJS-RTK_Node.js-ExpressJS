import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import './styles/buttons.css'
import './styles/common.css'
import './styles/paddings.css'
import './styles/specific.css'
import './styles/dimensions.css'
import './styles/inputs.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
