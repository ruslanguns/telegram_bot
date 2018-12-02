const TelegramBot = require('node-telegram-bot-api');

const token = require('./config/config').TELEGRAM_TOKEN;

// console.log(token);

const bot = new TelegramBot(token, {
    polling: true
});

// respuesta a mensajes

bot.on('message', (msg) => {

    var hola = "hola";
    if (msg.text.toString().toLowerCase().indexOf(hola) === 0) {
        bot.sendMessage(msg.chat.id, "¡Hola, muy buen dia!\n Solo puedo responder: Hola y Adios.");
    }

    var adios = "adios";
    if (msg.text.toString().toLowerCase().includes(adios)) {
        bot.sendMessage(msg.chat.id, "Espero verte pronto, Adiós !");
    }

});

// opciones

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id,
        "Bienvenido a mi bot! \n\n Mi nombre es Ruslán González e hice este Bot por temas experimentales.\n\n Github: https://github.com/ruslanguns/telegram_bot");
});