import { useNavigate } from "react-router-dom"
import { Button, FormWrapper, Input, SelectInput } from ".."
import { useEffect } from "react"

function ThirdStep() {
	const navigate = useNavigate()
	useEffect(() => {
		window.scrollTo(0, 0);
	},[])
	return (
		<FormWrapper>
				<>
					<Button onClick={() => navigate(-1)} width="100px" type="button">Назад</Button>

					<Input
						label='Ваш этаж' 
						placeholder='Введите число'
						name='floor'
						isRequired={true}
						/>
					<Input
						label='Количество этажей в доме' 
						placeholder='Введите число'
						name='floors_number'
						isRequired={true}
					/>
					<SelectInput
						label='Тип ремонта'
						placeholder='Выберите наиболее подходящий'
						name='renovation'
						items={[
						{value: 'cosmetic', label: 'Косметический'},
						{value: 'no', label: 'Строй-вариант (нет)'},
						{value: 'european-style', label: 'Евроремонт'},
						{value: 'designer', label: 'Дизайнерский'},
						]}
						onClick={() => {}}
						height='56px'
					/>
					<Button>Отправить</Button>
				</>
			</FormWrapper>
	  )
}

export default ThirdStep
