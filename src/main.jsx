import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

window.addEventListener("load", () => {
  const loader = document.getElementById("global-loader")
  if (loader) {
    loader.classList.add("fade-out")
    setTimeout(() => loader.remove(), 700)
  }
})

