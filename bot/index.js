require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN
const url = process.env.URL
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  	const chatId = msg.chat.id;
	const text = msg.text;
	if (text === '/start'){
		await bot.sendMessage(chatId, 
		`
		Привет! Чтобы воспользоваться мной, нажми на кнопку "Подсчитать стоимость" ниже
		`, {
			reply_markup: {
				keyboard: [[{text: 'Подсчитать стоимость', web_app: {url: url}}]],
			}
		});
	} 
	// else {
	// 	bot.sendMessage(chatId, 'Для запуска отправьте /start');
	// }

	if (msg.web_app_data?.data){
		try {
			const data = JSON.parse(msg.web_app_data?.data);
			await bot.sendMessage(chatId, 
			`Полученные данные:
			Тип жилья: ${data.apartment_type.label}
			Время в пути до метро: ${data.minutes_to_metro}
			Название станции метро: ${data.metro}
			Количество комнат: ${data.rooms_number}
			Площадь жилья: ${data.area}
			Площадь кухни: ${data.kitchen_area}
			Этаж: ${data.floor}
			Количество этажей в доме: ${data.floors_number}
			Тип ремонта: ${data.renovation.label}
			`);
			
		} catch (error) {
			console.log(error)
		}
	}
});