const login = require('facebook-chat-api')

login({email: process.env.FB_BOT_EMAIL, password: process.env.FB_BOT_PASSWORD}, (err, api) => {
    if(err) return console.error(err);

    api.listen((err, message) => {
        api.sendMessage(message.body, message.threadID);
    });
});
