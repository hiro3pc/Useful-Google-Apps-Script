# UrlFetchAppの使い方

## 公式ドキュメント
https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app?hl=ja

```javascript

const headers = {};
const payload = {};
const params = {
  method: "",
  headers: headers,
  payload: payload,
};

const res = UrlFetchApp.fetch(url, params);
return JSON.parse(res.getContentText());
```

### リクエストヘッダー (headers)
cURLの`-H`オプションに相当する。

### リクエストボディ (payload)
cURLの`-d`オプションに相当する。
型は要確認。

### パラメータ (params)
[公式ドキュメント](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app?hl=ja#parameters_1)を参照

## 注意点
- `Object`であるか`String(JSON)`であるか型に注意。変換は`JSON.stringify()`、`JSON.parse()`を使う。  
- 以下のようなエラー処理を入れると良い。
```javascript
if (res.getResponseCode() != 200) {
  throw new Error(` :${res.getResponseCode()}\n${res.getContentText()}`);
}
```


