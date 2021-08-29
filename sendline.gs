const setSearchCondition = () => {
  const label = prop.getProperty('label');
  const now = Math.floor(new Date().getTime() / 1000) ;
  const interval = 60;
  const term = now - (60 * interval);

  return '(label:' + label + ' is:unread after:'+ term + ')';
}

const getMessages = (searchResult) => {
  const mails = GmailApp.getMessagesForThreads(searchResult);

  let detailMessages = []
  for (const messages of mails) {
    const message = messages.pop()
    detailMessages.push(
        "\n【Date】: " + message.getDate()　
      + "\n【Subject】: " + message.getSubject()
    )   
  }

  GmailApp.markThreadsRead(searchResult);
  return detailMessages;
}

const sendline = () => {
  const line_notify_token = prop.getProperty('line_notify_token');
  const result = GmailApp.search(setSearchCondition());

  if (result.length > 0) {
    const messages = getMessages(result)
 console.log(messages);
    messages.forEach(message => {
      let options ={
        "method"  : "post",
        "payload" : {
          'message': message
         },
        "headers" : {"Authorization" : "Bearer "+ line_notify_token}  
      };
      UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
    }) 
  }
}
