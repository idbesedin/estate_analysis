const tg = window.Telegram.WebApp

export default function useTelegram(){

	const onClose = () => {
		tg.close()
	}

	return {
		tg,
		onClose,
		user: tg.initDataUnsafe?.user
	}
}