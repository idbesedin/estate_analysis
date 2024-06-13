import styles from './Button.module.scss'

function Button({
	children, 
	onClick, 
	width,
	type = 'submit',
} : {
		children: JSX.Element | string, 
		onClick?: () => void, 
		width?: string
		type?: 'submit' | 'button'
	}) {
  return (
	<button 
	type={type}
	className={styles[type]} 
	onClick={onClick}
	style={{width: width}}
	>{children}</button>
  )
}

export default Button
