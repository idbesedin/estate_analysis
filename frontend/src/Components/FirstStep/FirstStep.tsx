import { Button, FormWrapper, Input, SelectInput } from '..'


function FirstStep() {
  return (
		<FormWrapper>
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
					pattern={/^\d+$/}
					/>
				<Input
					label='Название станции метро' 
					placeholder='Введите название ближайшей'
					name='metro'
					isRequired={true}
					pattern={/^[а-яА-ЯёЁ\s-]+$/}
				/>
				<Button>Далее</Button>
			</>
		</FormWrapper>
  )
}

export default FirstStep
