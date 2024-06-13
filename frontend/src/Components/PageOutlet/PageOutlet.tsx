import Header from "../Header/Header"
import { FormProvider, useForm } from "react-hook-form"	
import { useState } from "react"
import { FirstStep, SecondStep, ThirdStep } from ".."
import useTelegram from "../../hooks/useTelegram"

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
	const [counter, setCounter] = useState(0)
	const arr = [
		<FirstStep/>,
		<SecondStep goBack={() => setCounter(counter - 1)}/>,
		<ThirdStep goBack={() => setCounter(counter - 1)}/>,
	]
	const methods = useForm<FormValues>()
	const {
		handleSubmit,
	} = methods
	const {tg} = useTelegram()
	
	const onSubmit = (body: FormValues) => {
		let newBody = {
			...data,
			...body
		}
		setData(newBody)
		if (counter < arr.length - 1) {
			setCounter(counter + 1)
		} else{
			console.log('here')
			tg.sendData(JSON.stringify(newBody))
		}
	}
	return (
	  <div>
		<Header />
			<FormProvider {...methods}>
				<form action="" onSubmit={handleSubmit(onSubmit)}>
					{arr[counter]}
				</form>
			</FormProvider>
	  </div>
	)
  }

export default PageOutlet