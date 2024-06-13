import { useNavigate } from "react-router-dom"
import { Button, FormWrapper, Input } from ".."
import { useEffect } from "react";


function SecondStep() {
	const navigate = useNavigate()
	useEffect(() => {
		window.scrollTo(0, 0);
	},[])
  return (
	<FormWrapper>
			<>
				<Button onClick={() => navigate(-1)} width="100px" type="button">Назад</Button>
				<Input
					label='Количество комнат' 
					placeholder='Введите количество комнат'
					name='rooms_number'
					isRequired={true}
					/>
				<Input
					label='Площадь жилья' 
					placeholder='Введите в квадратных метрах'
					name='area'
					isRequired={true}
				/>
				<Input
					label='Площадь кухни' 
					placeholder='Введите в квадратных метрах'
					name='kitchen_area'
					isRequired={true}
				/>
				<Button>Далее</Button>
			</>
		</FormWrapper>
  )
}

export default SecondStep
