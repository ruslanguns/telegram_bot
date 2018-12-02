const TelegramBot = require('node-telegram-bot-api');

const token = require('./config/config').TELEGRAM_TOKEN;

// console.log(token);

const bot = new TelegramBot(token, {
    polling: true
});

// bot.on('message', (msg) => {

//     var msg = "test";
    
//     if (msg.text.toString().toLowerCase().includes(msg)) {
//         bot.sendMessage(msg.chat.id, "Funciona");
//     }
// });

bot.on('message', (msg) => {

    // Ver mensajes en tiempo real
    console.log("Mensaje De:" + msg.from.last_name +
                 "\n—" + msg.text );

    // Ver contenido completo de la respuesta
    // console.log(msg);
})


// ====================================
// Enviar un mensaje de respuesta a partir de mensajes que nos envia...
// ====================================
bot.on('message', (msg) => {

    var Hi = "hola";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,
        `Hola <b>${msg.from.first_name}</b>\n\nSoy un BOT automático y de momento solo respondo a algunas opciones y a mensajes como:
        \n hola, y Adios.
        \n Muy pronto tendré más comandos interesantes. Te enviaré un mensaje cuando esté listo.`,
        { parse_mode: "HTML"}
        );
    }
    var adios = "adios";
    if (msg.text.toString().toLowerCase().includes(adios)) {
        bot.sendMessage(msg.chat.id, "Espero verte pronto, Adiós !");
    }
    
    var test = "test";
    if (msg.text.toString().toLowerCase().includes(test)) {
        bot.sendMessage(msg.chat.id, "Botones", {
                "reply_markup": {
                    "keyboard": [["Boton IZ", "Boton DR"],   ["Boton AR"], ["Boton AB"]]
            }    
        });
    }

    var test = "telefono";

    var teclado_llamada = [
                    ["1", "2", "3"],
                    ["4", "5", "6"],
                    ["7", "8", "9"],
                    ["*", "0", "#"],
                    ['/llamar']   
                ];

    var telefono_funcion = "Marque el numero al que desea llamar";

    if (msg.text.toString().toLowerCase().includes(test)) {
        bot.sendMessage(msg.chat.id, telefono_funcion, {
            "reply_markup": {
                    "keyboard": teclado_llamada,
                    "resize_keyboard": true,
                    "one_time_keyboard": false
                }
           
        });
    }
    var realizarLlamada = "Realizar llamada";
    if (msg.text.toString().toLowerCase().includes(realizarLlamada)) {
        bot.sendMessage(msg.chat.id, "Realizando la llamada, espere por favor...");
    }

    var ubicacion = "ubicacion";
    if (msg.text.indexOf(ubicacion) === 0) {
        bot.sendLocation(msg.chat.id,28.1185029, -15.4326047);
        bot.sendMessage(msg.chat.id, "Visítanos pronto");
        
    }

    // Matches /editable
        bot.onText(/\/llamar/, function onEditableText(msg) {
            const opts = {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Llamar a +34 644 27 47 56',
                                // we shall check for this value when we listen
                                // for "callback_query"
                                callback_data: 'llamar'
                            }
                        ]
                    ]
                }
            };
            bot.sendMessage(msg.from.id, 'Confirme la llamada', opts);
        });
    
});

// ====================================
// Enviar mensaje a la escucha de /start que funciona como bienvenida
// ====================================
bot.onText(/\/start/, (msg) => {

    // bot.sendPhoto(msg.chat.id, "https://uc10b1d4cf3e7f14f10c99dab0a3.previews.dropboxusercontent.com/p/thumb/AAQQnOcvbGCwan7zcEmDqshcG_cdoH_OSA3EgoSb_D24aS5l-_ePbOlQ-ukSAgiZTdAL5fOKlj7nNOPqi0o-9H7lj94GM1EvENrWO6_VS-3P1gkxyyM7puF25dd4MGS0UbQ2ZXiPQgk6NkI5NxBqe6RXSY_pHIU5kqXjm42b1pQQjF98Enufz7V_-iNcSLh3SW-I0DOoQDvSieDINw2Axg9_DwMjoM-KsagQaIU2pNhCOg/p.png?size=2048x1536&size_mode=3"); // parece que tiene problemas enviando imagenes desde arichvo
    bot.sendMessage(msg.chat.id,
        "Bienvenido a mi bot! \n\n " +
        "Mi nombre es Ruslán González e hice este Bot para pruebas experimentales.\n\n" +
        "Visitar mis enlaces: \n" +
        "<a href=\"https://github.com/ruslanguns/telegram_bot/\">Este repositorio</a>   <a href=\"https://rusgunx.tk/\">Mi CV</a> \n" +
        "<a href=\"https://ruso.ga/\">Mis fotografias</a>    <a href=\"https://twitter.com/ruslangonzalez/\">Mi cuenta de Twitter</a>" + "   ", { parse_mode: "HTML" }
    );
});

// ====================================
// Enviar una imagen a la escucha de una opción
// ====================================
bot.onText(/\/logo/, (msg) => {

    bot.sendPhoto(msg.chat.id, "./img/logo.png"); // parece que tiene problemas enviando imagenes desde arichvo
    // bot.sendPhoto(msg.chat.id, "https://uc10b1d4cf3e7f14f10c99dab0a3.previews.dropboxusercontent.com/p/thumb/AAQQnOcvbGCwan7zcEmDqshcG_cdoH_OSA3EgoSb_D24aS5l-_ePbOlQ-ukSAgiZTdAL5fOKlj7nNOPqi0o-9H7lj94GM1EvENrWO6_VS-3P1gkxyyM7puF25dd4MGS0UbQ2ZXiPQgk6NkI5NxBqe6RXSY_pHIU5kqXjm42b1pQQjF98Enufz7V_-iNcSLh3SW-I0DOoQDvSieDINw2Axg9_DwMjoM-KsagQaIU2pNhCOg/p.png?size=2048x1536&size_mode=3"); // parece que tiene problemas enviando imagenes desde arichvo

});

// ====================================
// Enviar imagen y caption en él
// ====================================
bot.onText(/\/CV/, (msg) => {

    bot.sendPhoto(msg.chat.id, "https://logos.textgiraffe.com/logos/logo-name/Ruslan-designstyle-i-love-m.png", {
        caption: "Lee mi CV \n https://rusgunx.tk "
    });
    
});

bot.onText(/\/formato/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>", { parse_mode: "HTML" });
    
});

// if ( bot.openWebHook() === true ) {
    //     console.log('Abrieron la sala de chat')
    // }
    // if ( bot.openWebHook() === true ) {
        //     console.log('Han cerrado la sala de chat')
        // }
        
        // Matches /editable
        bot.onText(/\/llamada/, function onEditableText(msg) {
            const opts = {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Llamar a +34 644 27 47 56',
                                // we shall check for this value when we listen
                                // for "callback_query"
                                callback_data: 'llamar'
                            }
                        ]
                    ]
                }
            };
            bot.sendMessage(msg.from.id, 'Confirme la llamada', opts);
        });
        
        // Handle callback queries
        bot.on('callback_query', function onCallbackQuery(callbackQuery) {
            const action = callbackQuery.data;
            const msg = callbackQuery.message;
            const opts = {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
            };
            let text;
            
            if (action === 'llamar') {
                text = 'Estamos llamando a +34 644 27 47 56';
                bot.sendPhoto(msg.chat.id, "https://iosmac.es/wp-content/uploads/2018/02/rechazar-llamadas-iphone.jpg", {
                    caption: "Por favor acepta la llamada entrante, somos nosotros."
                });
            }
            
            bot.editMessageText(text, opts);
});



        bot.on('callback_query', function onCallbackQuery(callbackQuery) {
            const action = callbackQuery.data;
            const msg = callbackQuery.message;
            const opts = {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
            };
            let text;
            
            if (action === 'realizarLlamada') {
                telefono_funcion = 'Estamos llamando a +34 644 27 47 56';
                bot.sendPhoto(msg.chat.id, "https://iosmac.es/wp-content/uploads/2018/02/rechazar-llamadas-iphone.jpg", {
                    caption: "Por favor acepta la llamada entrante, somos nosotros."
                });
            }
            
            bot.editMessageText(telefono_funcion, opts);
});