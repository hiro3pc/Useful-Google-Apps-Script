# シートの名前を取得する

シートの名前を配列で取得します。

## getName()

```javascript
    const sheetNames = new array();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    for (let i = 0 of sheet.length) {
        sheetNames.push(sheet[i].getName());
    }
    console.log(sheetNames);
```

## 返り値

`Array` - シートの名前の配列

## 公式ドキュメント

<https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getsheets>  
<https://developers.google.com/apps-script/reference/spreadsheet/sheet#getname>
