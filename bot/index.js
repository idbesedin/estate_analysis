require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN
const url = process.env.URL
const bot = new TelegramBot(token, {polling: true});

const { spawn } = require('child_process');

function callPython(inputData) {
    return new Promise((resolve, reject) => {
        const pyProg = spawn('python', ['../ML/build/final_build.py', JSON.stringify(inputData)]);

        pyProg.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        pyProg.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
}

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
			


			let inputData = []
				if (data.apartment_type.value === 'new') {
					inputData.push('New Building')
				} else if (data.apartment_type.value === 'secondary') {
					inputData.push('Secondary')
				}
				inputData.push(data.metro)
				inputData.push(+data.minutes_to_metro)
				inputData.push(+data.rooms_number)
				inputData.push(+data.area)
				inputData.push(+data.kitchen_area)
				inputData.push(+data.floor)
				inputData.push(+data.floors_number)
				if (data.renovation.value === 'cosmetic'){
					inputData.push('Cosmetic')
				} else if (data.renovation.value === 'no'){
					inputData.push('Without renovation')
				} else if (data.renovation.value === 'european-style'){
					inputData.push('European-style renovation')
				} else if (data.renovation.value === 'designer'){
					inputData.push('Designer')
				}

			callPython(inputData)
			.then((result) => {
				const prediction = JSON.parse(result).prediction;
				bot.sendMessage(chatId, `Предсказанная стоимость: ${prediction} рублей`);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		} catch (error) {
			console.log(error)
		}
	}
});