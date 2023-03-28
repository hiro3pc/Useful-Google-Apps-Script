/**
 * get LINE group id
 * ウェブアプリとしてデプロイするのを忘れずに
 * @param {*} e
 */
function doPost(e) {
    const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GROUP_ID");
    const data = JSON.parse(e.postData.contents);
    const GROUP_ID = data.events[0].source.groupId;
    ss.getRange("A1").setValue(GROUP_ID);
}

/**
 * record chat_history
 * @param {*} e
 */
function doPost(e) {
    const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("chat_history");
    const data = e.postData.contents;
    ss.getRange(ss.getLastRow() + 1, 1, 1, 1).setValue(data);
}
/**
 * LINE groupにテキストを送信する。
 * @param {string} text 送信するテキスト
 */
function postTextToLineGroup(text) {
    const CHANNEL_ACCESS_TOKEN = "";
    const GROUP_ID = "";
    const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
    const payload = {
        to: GROUP_ID,
        messages: [
            {
                type: "text",
                text: text,
            },
        ],
    };
    const options = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
        },
        method: "post",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
    };

    const res = UrlFetchApp.fetch(LINE_API_URL, options);
    console.log(res.getContentText());
    if (res.getResponseCode() != 200) {
        throw new Error(`ERROR :${res.getResponseCode()}\n${res.getContentText()}`);
    }
}
/**
 * LINE公式アカウントから投稿する。
 * @param {string} text
 */
function postTextToLineUser(text) {
    const CHANNEL_ACCESS_TOKEN = ""; //LINEChannelAccessToken
    const USER_ID = ""; //LINEGroupID
    const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
    const payload = {
        to: USER_ID,
        messages: [
            {
                type: "text",
                text: text,
            },
        ],
    };
    const options = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
        },
        method: "post",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
    };

    const res = UrlFetchApp.fetch(LINE_API_URL, options);
    console.log(res.getContentText());
    if (res.getResponseCode() != 200) {
        throw new Error(`ERROR :${res.getResponseCode()}\n${res.getContentText()}`);
    }
}
