import useTelegram from "../../hooks/useTelegram"

function Header() {
	const {user} = useTelegram()
  return (
	<div>
	  {user?.username}
	</div>
  )
}

export default Header
