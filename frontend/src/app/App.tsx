import { Routes, useLocation, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import PageOutlet from '../Components/PageOutlet/PageOutlet'
import Input from '../Components/Input/Input'
import SelectInput from '../Components/SelectInput/SelectInput'
import './App.scss'

function App() {
  const location = useLocation()
  return (
        <AnimatePresence initial={true} mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageOutlet />}>
                <Route index element={<h1>Начало</h1>}/>
                <Route path='1' element={
                  <>
                    <SelectInput
                      label='Тип жилья'
                      placeholder='Выберите тип жилья'
                      name='apartment_type'
                      items={[
                        {value: 'new', label: 'Новостройка'},
                        {value: 'secondary', label: 'Вторичка'},
                      ]}
                      onClick={() => {}}
                      height='56px'
                    />
                    <Input
                      label='Время в пути до метро' 
                      placeholder='Введите в минутах'
                      name='minutes_to_metro'
                      isRequired={true}
                      />
                    <Input
                      label='Название станции метро' 
                      placeholder='Введите название ближайшей'
                      name='metro'
                      isRequired={true}
                    />
                  </>
                }/>
                <Route path='2' element={<h1>Шаг 2</h1>}/>
                <Route path='3' element={<h1>Шаг 3</h1>}/>
            </Route>
          </Routes>
        </AnimatePresence>
      
  )
}

export default App
