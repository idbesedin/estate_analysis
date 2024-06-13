import { Routes, useLocation, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import './App.scss'
import { FirstStep, PageOutlet, SecondStep, ThirdStep } from '../Components'


function App() {
  const location = useLocation()
  return (
        <AnimatePresence initial={true} mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageOutlet />}>
                  <Route index element={<Navigate to='/1'/>}/>
                  <Route path='1' element={<FirstStep/>}/>
                  <Route path='2' element={<SecondStep/>}/>
                  <Route path='3' element={<ThirdStep/>}/>
              </Route>
            </Routes>
          </AnimatePresence>
  )
}

export default App
