import { Outlet } from "react-router"
import Header from "../Header/Header"
import styles from './PageOutlet.module.scss'

const PageOutlet = () => {
	return (
	  <div>
		<Header />
		<form action="" >
			<Outlet />
		</form>
	  </div>
	)
  }

export default PageOutlet