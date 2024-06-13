import { Outlet } from "react-router"
import Header from "../Header/Header"
import styles from './PageOutlet.module.scss'
import { FormProvider, useForm } from "react-hook-form"

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

	const methods = useForm<FormValues>()
	const {
		handleSubmit,
	} = methods

	const onSubmit = (data: FormValues) => {
		console.log(data)
	}
	return (
	  <div>
		<Header />
			<FormProvider {...methods}>
				<form action="" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<Outlet />
				</form>
			</FormProvider>
	  </div>
	)
  }

export default PageOutlet