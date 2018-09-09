const req = require('request');

module.exports = function (context, cb) {
    const url = context.secrets.imaxMovieUrl;
    const tgBotToken = context.secrets.telegramBotToken;
    const tgChannelChatId = context.secrets.telegramChannelChatId;
    const tgFoundText = context.secrets.telegramText || 'Movie page has changed';
    const tgChannelUrl = 'https://api.telegram.org/bot' + tgBotToken + '/sendMessage';
    req(url, function (error, response, body) {
        if (error) {
            console.error('Error fetching movie page: ' + error);
            cb(error);
        } else {
            console.log('Fetched movie page from: ' + url + ', size: ' + body.length);
            context.storage.get(function(storageError, data) {
                if (storageError) {
                    console.error('Error retrieving WebTask storage: ' + storageError);
                    cb(storageError);
                } else {
                    if (data !== '' && data !== body) {
                        req( {
                            url: tgChannelUrl,
                            method: 'GET',
                            qs: {
                                chat_id: tgChannelChatId,
                                text: tgFoundText
                            }}, function(tgError, tgResponse, tgBody) {
                            if (tgError) {
                                console.error('Error posting message to Telegram Channel: ' + tgError);
                            } else {
                                console.log('Posted message to Telegram: ' + tgFoundText);
                            }
                        });

                        // write new body in storage
                        context.storage.set(body, function(writeError) {
                            if (writeError) cb(writeError);
                            else {
                                cb(null, tgFoundText);
                            }
                        });
                    } else {
                        cb(null, 'No change found');
                    }
                }
            });
        }
    });

};
