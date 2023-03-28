# LINE BOT

## 関連リンク
- [LINE Developers](https://developers.line.biz/ja/)
- [Google Apps Script](https://script.google.com/home)

## 方法

[dopost](https://developers.google.com/apps-script/guides/web#request_parameters)
[LINE Developers](https://developers.line.biz/ja/reference/messaging-api/#webhooks)

シートを設定
アクセスできるユーザーを`全員`に設定しウェブアプリとしてデプロイ
ウェブアプリURLをLINE DevelopersのWebhook URLに設定しWebhookを利用するように設定
LINEで何か送るとシートに記録される

```javascript

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("chat_history");
  const res = JSON.parse(e.postData.contents)
  ss.getRange(2, 1).setValue(res)
  ss.getRange(2, 2).setValue(res.events[0].type)
  ss.getRange(2, 3).setValue(res.events[0].message)
  ss.getRange(2, 4).setValue(res.events[0].source.groupId)
  ss.getRange(2, 5).setValue(res.events[0].source.userId)
}

```