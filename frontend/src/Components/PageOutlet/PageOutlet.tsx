import { Outlet } from "react-router"
import Header from "../Header/Header"
import { FormProvider, useForm } from "react-hook-form"	
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

const PageOutlet = () => {
	interface FormValues {
		apartment_type: 'secondary' | 'new',
		metro: string,
		minutes_to_metro: number
		rooms_number: number
		area: number
		kitchen_area: number
		floor: number
		floors_number: number
		renovation: 'cosmetic' | 'no' | 'european-style' | 'designer'
	}
	const [data, setData] = useState<FormValues>({
		apartment_type: 'secondary',
		metro: '',
		minutes_to_metro: 0,
		rooms_number: 0,
		area: 0,
		kitchen_area: 0,
		floor: 0,
		floors_number: 0,
		renovation: 'cosmetic',
	})

	const methods = useForm<FormValues>()
	const {
		handleSubmit,
	} = methods
	const location = useLocation()
	const navigate = useNavigate()
	
	const onSubmit = (body: FormValues) => {
		console.log('before', data)
		setData(obj => {
			return {
				...obj, 
				...body,
		}})
		console.log('after', data)
		if (location.pathname === '/1'){
			navigate('/2')
		} else if (location.pathname === '/2') {
			navigate('/3')
		} else if (location.pathname === '/3') {
			// console.log(data)
		}
	}
	return (
	  <div>
		<Header />
			<FormProvider {...methods}>
				<form action="" onSubmit={handleSubmit(onSubmit)}>
					<Outlet />
				</form>
			</FormProvider>
	  </div>
	)
  }

export default PageOutlet