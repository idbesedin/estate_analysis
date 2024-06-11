import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { BrowserRouter as Router} from 'react-router-dom'
import  { Suspense } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Router>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>,
)
