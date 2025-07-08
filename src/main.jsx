import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HabitProvider } from './context/HabitContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HabitProvider>
      <App />
    </HabitProvider>
  </StrictMode>,
)
