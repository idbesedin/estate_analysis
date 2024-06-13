import { Button, FormWrapper, Input, SelectInput } from ".."

function ThirdStep({goBack} : {goBack: () => void}) {
	return (
		<FormWrapper>
				<>
					<Button onClick={goBack} width="100px" type="button">Назад</Button>

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
