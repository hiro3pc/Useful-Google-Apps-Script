# Content Service
`doGet`や`doPost`を扱います。GASでWebAPIを作れます。  
公式ドキュメント
- https://developers.google.com/apps-script/guides/content?hl=ja
- https://developers.google.com/apps-script/guides/web?hl=ja#deploying


ウェブアプリが`GET`リクエストを受け取ると`doGet(e)`を実行し、`Post`リクエストを受け取ると`doPost(e)`を実行します。  
`e`引数はリクエストパラメータです。

## リクエストパラメータについて
例えば以下のような`Get`リクエストを送信します。  
このようにURLの後ろにつくものを[クエリー]()と言います。
```
https://script.google.com/.../exec?username=jsmith&age=21
```

```javascript
function doGet(e) {
  const params = JSON.stringify(e);
  return ContentService.createTextOutput(params).setMimeType(ContentService.MimeType.JSON);
}
```
doGetの引数が`e`です。
上の例では`doGet(e)`で以下の出力が返されます。
```json
{
  "queryString": "username=jsmith&age=21",
  "parameter": {
    "username": "jsmith",
    "age": "21"
  },
  "contextPath": "",
  "parameters": {
    "username": [
      "jsmith"
    ],
    "age": [
      "21"
    ]
  },
  "contentLength": -1
}
```


## テキストを返す簡単な例
```javascript
function doGet() {
  return ContentService.createTextOutput('Hello, world!');
}
```
これを[ウェブアプリとしてデプロイ](https://developers.google.com/apps-script/guides/web?hl=ja#deploy_a_script_as_a_web_app)することで、スクリプトのURLに`GET`リクエストが送信されると`Hello, world!`というテキストが返されます。書式なしテキストに加えて、ATOM、CSV、iCal、JavaScript、[JSON](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/JSON)、RSS、vCard、XMLをコンテンツを返すこともできます。

## JSONを返す簡単な例
```javascript
function doGet() {
  const result = {javascript object}
  const json = JSON.stringify(result);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
```
これを[デプロイ]することで利用可能です。




## デプロイについて
### スクリプトをウェブアプリとしてデプロイする
[公式ドキュメント](https://developers.google.com/apps-script/guides/web?hl=ja#deploy_a_script_as_a_web_app)を参考にしてください。  
コードを更新後、再デプロイしないとウェブアプリは更新されません。
### ウェブアプリのデプロイをテストする
[公式ドキュメント](https://developers.google.com/apps-script/guides/web?hl=ja#test_a_web_app_deployment)を参考にしてください。  
このURLの末尾は`/dev`でスクリプトの編集権限を持つユーザーのみがアクセスできます。
またこのテストでは、常に最後に保存されたコードを実行します。あくまで、開発中のテストを目的としています。


最終更新 2023/08/03