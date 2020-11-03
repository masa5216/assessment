"use strict";

// 診断結果リスト
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

// 各要素の取得
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

// テキストフィールドでキー押下時処理
userNameInput.onkeydown = function() {
    if (event.key === "Enter") {
        assessmentButton.onclick();
    }
}

// (function (name) {
//     console.log(name);
// })("tajima");

// 診断するボタン押下時処理
assessmentButton.onclick = function () {
    const userName = userNameInput.value;

    if (userName.length === 0) {
        return;
    }

    // 診断結果のクリア
    removeAllChildren(resultDivided)

    // 診断結果エリア
    const header = document.createElement("h3");
    header.innerText = "診断結果";
    resultDivided.appendChild(header);

    const paragraph = document.createElement("p");
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph)

    // ツイートエリア
    removeAllChildren(tweetDivided);
    const anchor = document.createElement("a");
    const hrefValue =
        "https://twitter.com/intent/tweet?button_hashtag=" +
        encodeURI("あなたのいいところ") +
        "&ref_src=twsrc%5Etfw";

    anchor.setAttribute("href", hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute("data-text", result);
    anchor.innerText = "あなたのいいところ";

    tweetDivided.appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);
}

// console.assert(
//     assessment("太郎") ===
//     '太郎のいいところは声です。太郎の特徴的な声は皆を惹きつけ、心に残ります。',
//     '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
// );

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @returns {string} 診断結果
 */
function assessment(userName) {
    // TODO診断処理を実装する
    let sumOfCharCode = 0;

    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i)
    }

    const index = sumOfCharCode % userName.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result
}

/**
 * 子要素をすべて削除する
 * @param element HTML要素
 */
function removeAllChildren(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

// const button = document.getElementById("assessment");
// button.style.color = "grey";
// button.setAttribute("disabled", "true");
//
// let notice = document.createElement("h3");
// notice.style.color = "white";
// notice.innerText = "現在、メンテナンス中です。しばらく待ってからアクセスしてください";
//
// let body = document.getElementById("tweet-area");
// body.appendChild(notice);

