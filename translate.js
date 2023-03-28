/**
 * Google翻訳を使用して英日の相互翻訳を行う
 * @param {string} text 翻訳前
 * @returns {string} 翻訳後
 */
function google_translator(text) {
  const code_Japanese = "ja";
  const code_English = "en";

  let sourceLanguage = code_English;
  let targetLanguage = code_Japanese;

  //textが日本語ならば
  if (text.match(/[^\x01-\x7E]/)) {
    sourceLanguage = code_Japanese;
    targetLanguage = code_English;
  }
  const res = LanguageApp.translate(text, sourceLanguage, targetLanguage);
  return res;
}

/**
 * DeepLを使用して英日の相互翻訳を行う
 * @param {string} text 翻訳前
 * @returns {string} 翻訳後
 */
function deepl_translator(text) {
  const key = "";
  const deepl_url = "https://api-free.deepl.com/v2/translate";
  const code_Japanese = "JA";
  const code_English = "EN";

  let sourceLanguage = code_English;
  let targetLanguage = code_Japanese;

  //textが日本語ならば
  if (text.match(/[^\x01-\x7E]/)) {
    console.log("日本語");
    sourceLanguage = code_Japanese;
    targetLanguage = code_English;
  }

  const headers = {
    Authorization: "DeepL-Auth-Key " + key,
  };
  const payload = {
    text: text,
    source_lang: sourceLanguage,
    target_lang: targetLanguage,
  };
  const options = {
    method: "post",
    headers: headers,
    payload: payload,
  };

  const res = UrlFetchApp.fetch(deepl_url, options);
  if (res.getResponseCode() != 200) {
    throw new Error(`deepl_translator :${res.getResponseCode()}\n${res.getContentText()}`);
  }
  return JSON.parse(res.getContentText()).translations[0].text;
}
