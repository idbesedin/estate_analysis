import { Routes, useLocation, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import PageOutlet from '../Components/PageOutlet/PageOutlet'

function App() {
  const location = useLocation()
  return (
        <AnimatePresence initial={true} mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageOutlet />}>
                <Route index element={<h1>Начало</h1>}/>
                <Route path='1' element={<h1>Шаг 1</h1>}/>
                <Route path='2' element={<h1>Шаг 2</h1>}/>
                <Route path='3' element={<h1>Шаг 3</h1>}/>
            </Route>
          </Routes>
        </AnimatePresence>
      
  )
}

export default App
