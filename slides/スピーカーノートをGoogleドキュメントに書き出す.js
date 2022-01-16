// Set a property in each of the three property stores. 文字列型で保存される
const scriptProperties = PropertiesService.getScriptProperties();
const userProperties = PropertiesService.getUserProperties();
const documentProperties = PropertiesService.getDocumentProperties();

//UIの設定
function onOpen() {
  let ui = SlidesApp.getUi();
  ui.createAddonMenu()
    .addItem("新規作成", "createDocsUi")
    .addItem("上書き更新", "updateDocs")
    .addItem(
      "スピーカーノートのドキュメントドキュメントのURLを表示",
      "showDocsUrl"
    )
    .addItem("作成履歴を消去する", "deleteDocumentProperties")
    .addToUi();
}

//スライドをもとにスピーカーノートの配列を作成
function getSpeakerNotes() {
  const slides = SlidesApp.getActivePresentation().getSlides();
  let speakerNotes = [];
  for (let i of slides) {
    speakerNotes.push(
      i.getNotesPage().getSpeakerNotesShape().getText().asRenderedString()
    );
  }
  return speakerNotes;
}

//スライドのタイトルを取得
const getSlideTitle = () => SlidesApp.getActivePresentation().getName();

//ドキュメント作成用のUI
function createDocsUi() {
  let ui = SlidesApp.getUi();
  let oldDocumentUrl = documentProperties.getProperty("documentUrl");

  //以前ドキュメントが作ってある
  if (documentProperties.getProperty("existenceOfDocument") === "true") {
    let res1 = ui.alert(
      `${getSlideTitle()}のスピーカーノートのドキュメントを作成しています\nURL : ${oldDocumentUrl}\n本当にスピーカーノートのドキュメントを作成しますか`,
      ui.ButtonSet.OK_CANCEL
    );
    if (res1 == ui.Button.OK) {
      //ドキュメント存在している状態から作成
      createDocs(); ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      showDocsUrl(undefined, undefined, undefined);
    } else {
      //作成しない
      showDocsUrl(
        undefined,
        "新規作成を中断しました。",
        "以前作成したドキュメントを開く"
      );
    }
  } else {
    //存在していない状態からドキュメント作成
    ui.alert("スピーカーノートのドキュメントを作成します。");
    createDocs();
    showDocsUrl(undefined, undefined, undefined);
  }
}

//履歴削除
function deleteDocumentProperties() {
  let ui = SlidesApp.getUi();
  let alertText;
  if (documentProperties.getProperty("existenceOfDocument") === "true") {
    alertText = `以前、${getSlideTitle()}のスピーカーノートのドキュメントを作成しています。\n本当に履歴を削除しますか?`;
  } else {
    alertText = `本当に履歴を削除しますか?`;
  }
  let res = ui.alert(alertText, ui.ButtonSet.OK_CANCEL);
  if (res === ui.Button.OK) {
    ui.alert("履歴を削除しています。");
    documentProperties.deleteAllProperties();
  } else {
    ui.alert("履歴削除を中断します。");
  }
}

//スピーカーノートのドキュメントを作成、作成したドキュメントのURLを表示
function createDocs() {
  res = DocumentApp.create(`${getSlideTitle()}のスピーカーノート`);
  urlToSetProperty = res.getUrl();
  documentProperties.setProperty("documentUrl", urlToSetProperty);
  documentProperties.setProperty("existenceOfDocument", "true");
  updateDocs();
  return { url: urlToSetProperty };
}

//ドキュメント上書き用の初期化
function initializeDocs() {
  const docs = DocumentApp.openByUrl(
    documentProperties.getProperty("documentUrl")
  );
  const body = docs.getBody();
  body.appendParagraph("最終段落");
  body.clear();
  console.log("clear 完了/n現在の段落数 : " + body.getParagraphs().length);
}

//ドキュメント上書き
function updateDocs() {
  const speakerNotes = getSpeakerNotes();
  //改行コードが\r
  const docs = DocumentApp.openByUrl(
    documentProperties.getProperty("documentUrl")
  );
  //ドキュメント名を設定
  docs.setName(`${getSlideTitle()}のスピーカーノートのドキュメント`);
  //初期化
  initializeDocs();

  //body
  const body = docs.getBody();
  const para = body.getParagraphs();

  //1段落目 タイトル
  const titleStyle = {};
  titleStyle[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
    DocumentApp.HorizontalAlignment.CENTER;

  para[0].setText(`${getSlideTitle()}の\nスピーカーノートのドキュメント`);
  para[0].setHeading(DocumentApp.ParagraphHeading.HEADING1);
  para[0].setAttributes(titleStyle);

  //区切り線
  //body.appendHorizontalRule();

  //スピーカーノートのドキュメントを追加
  for (let i = 0; i <= speakerNotes.length - 1; i++) {
    body
      .appendParagraph(`スライド${i + 1}`)
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
    body.appendParagraph(`${speakerNotes[i]}`);
  }

  //スライドに関する情報
  //body.appendParagraph(`スライド名 : `);

  //bodyのスタイル設定
  body.editAsText().setFontFamily("Noto Sans JP");
  //保存
  docs.saveAndClose();
  console.log("現在の段落数 : " + docs.getBody().getParagraphs().length);
}

//作成したドキュメントのURLを表示
function showDocsUrl(
  url = documentProperties.getProperty("documentUrl"),
  text = "URLを表示",
  linkText = "作成したドキュメントを新規タブで開く"
) {
  const ui = SlidesApp.getUi();
  let contents = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a><br><br>
    <input id="copyTarget" type="text" value="${url}" readonly><button onclick="copyToClipboard()">Copy text</button>
    <script>function copyToClipboard() {let copyTarget = document.getElementById("copyTarget");copyTarget.select();document.execCommand("Copy");alert("コピー完了");}</script>`;
  let content = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a><p><b>${url}</b></p>`; //html
  let html = HtmlService.createHtmlOutput(contents)
    .setWidth(350)
    .setHeight(125);
  ui.showModalDialog(html, text);
}

function readDocs() {
  const docs1 = DocumentApp.openByUrl(
    documentProperties.getProperty("documentUrl")
  );
  //console.log(docs.getBody().getAttributes())
  for (let i of docs1.getBody().getParagraphs()) {
    console.log(i.key + "   " + i.getText());
  }
}

function readdocumentProperties() {
  console.log(documentProperties.getProperties());
  console.log(documentProperties.deleteAllProperties());
}
