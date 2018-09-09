 
 # Movie tickets available detection
 
 ## Purpose:
  Create this webtask to detect if a movie ticket page changed, so you can rush and buy tickets for your favourite movie and you don't lose you favourite seats!
  
 ## Usage:
 * Select a movie page. i.e.: https://imax.todoshowcase.com/pelicula/0/274505/
 * Create your Telegram Movie detection bot:
   * On Telegram, go find and add contact of: BotFather
   * /newbot
   * Write down the **HTTP API Bot Token**
 * Select a Telegram Channel were you want to share this bot with, and write down the group ID
 * Create this bot using [WebTask.io CLI](https://auth0.com/blog/if-this-then-node-dot-js-extending-ifttt-with-webtask-dot-io/)
   ```
   wt create imaxnews.js --secret imaxMovieUrl=`<`MOVIE URL`>` --secret telegramChannelChatId=`<`CHAT_ID`>` --secret telegramText=`<`CHANGE_FOUND_TEXT`>` --secret telegramBotToken=`<`BOT_TOKEN`>`
   ```
 * Maybe cron this webtask so that it executes every hour...? 

 ## Example
 
 ```
 wt create imaxnews.js --secret imaxMovieUrl=https://imax.todoshowcase.com/pelicula/0/274505/ --secret telegramChannelChatId=-141124410 --secret telegramText=The movie changed! --secret telegramBotToken=thisisamadeuptoken
 ```
