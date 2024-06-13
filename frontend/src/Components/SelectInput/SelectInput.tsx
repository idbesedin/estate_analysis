import Select, { components } from 'react-select'
import { useFormContext, Controller } from 'react-hook-form'

import './SelectInput.scss'

import { ErrorMessage } from '@hookform/error-message'
import { memo } from 'react'


export interface ISelectItem<T = string> {
	value: T
	label: string
}

interface Props {
	name: string
	label?: string
	width?: string,
	height?: string
	items: ISelectItem<string>[]
	onClick: () => void
	isSearchable?: boolean
	placeholder?: string
	value?: ISelectItem<string> | null
	type?: string
	isRequired?: boolean
	defaultValue?: string | ISelectItem<string> | null | undefined
	maxOptionsNumber?: number,
	style?: 'default' | 'custom',
	optionsColor?: string
	isCreatable?: boolean
	isMulti?: boolean
}


const SelectInput = memo((props: Props) => {
	const {
		items,
		label,
		onClick,
		name,
		isSearchable = false,
		placeholder = '',
		isRequired = true,
		defaultValue,
		width,
		type = 'status',
		style = 'default',
		height,
		optionsColor,
		isCreatable,
		isMulti,
	} = props
	const { control, formState, getFieldState } = useFormContext()
	const { errors } = formState

	const { Option } = components
	const CustomOption = (props: any) => {
		return (
			<Option {...props} key={props.data.value}>
				<div className="selectInput__option_custom">
					<p>{props.data.label}</p>
				</div>
			</Option>
		)
	}
	const CustomValue = (props: any) => {
		if (props.data.value === 'not_selected' || type !== 'status') {
			return (
				<div className="selectInput__option_custom">
					<p style={{fontSize: '15px'}}>{props.data.label}</p>
				</div>	
			)
		}
		return (
			<div className="selectInput__option_custom">
				<p style={{fontSize: '15px'}}>{props.data.label}</p>
			</div>
		)
	}
	const selectStyles = {
		dropdownIndicator: (provided : any, state : any) => ({
			...provided,
				transition: 'all .2s ease',
				transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
			}),
			control: (base : any) => ({
				...base,
				boxShadow: 'none',
				width: '100%',
				border: style === 'custom' ? 'none !important' : '',
				backgroundColor: style === 'custom' ? 'none !important' : 'white',
			}),
			option: (base : any) => ({
				...base,
				backgroundColor: '#ffffff',
				color: optionsColor,
			}),
			menu: (base : any) => ({
				...base,
				width: '100%',
			}),
			menuList: (base : any) => ({
				...base,
				'::-webkit-scrollbar': {
					width: '4px',
					height: '0px',
				},
				'::-webkit-scrollbar-track': {
					background: '#ffffff',
				},
				
			}),
	}
	return (
		<div className="select-input__wrapper" style={{height: height}}>
				{label && <p
					style={{
						color: getFieldState(name).invalid ? 'rgba(255, 0, 0)' : '#959796',
						fontSize: '15px',
					}}
				>
					{label}
				</p>}
				<Controller
					name={name}
					control={control}
					rules={{
						required: {
							value: isRequired,
							message: 'Обязательное поле',
						},
					}}
					defaultValue={defaultValue}
					render={({ field }) => {
						const props = {
							...field,
							options: items,
							captureMenuScroll: false,
							controlShouldRenderValue: true,
							defaultValue,
							onChange: (selected: ISelectItem,) => {
											field.onChange(selected)
											onClick()
										},
							components: {
								Option: type === 'status' ? CustomOption : Option,
								SingleValue: CustomValue,
							},
							placeholder: placeholder ? placeholder : label,
							classNamePrefix: "selectInput",
							classNames: {
								control: () =>
									getFieldState(name).invalid ? 'select_invalid' : '',
							},
							isSearchable: isSearchable,
							styles: selectStyles,
							isMulti: isMulti,	
						}
						return (
							<Select {... props}/>
						)
					}}
				/>

			<ErrorMessage
				errors={errors}
				name={name}
				render={({ message }) => (
					<p className="selectInput__error">
						{message}
					</p>
				)}
			/>
		</div>
	)
})

export default SelectInput
