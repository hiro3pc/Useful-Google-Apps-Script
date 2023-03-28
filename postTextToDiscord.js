function postTextToDiscord(text, DISCORD_WEBHOOKURL) {
  const options = {
    method: "post",
    headers: { "Content-type": "application/json" },
    payload: JSON.stringify({
      content: text,
    }),
    muteHttpExceptions: true,
  };
  const res = UrlFetchApp.fetch(DISCORD_WEBHOOKURL, options).getContentText();
  console.log(res);
}
