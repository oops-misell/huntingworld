// 買い物を続けるボタンの遷移処理を、検索結果が0個の場合にのみチェックする
function initContinueShopping() {
  // チェック対象の検索結果を取得（※.search-result-item はご利用のHTMLに合わせて変更してください）
  const searchResults = document.querySelectorAll(".search-result-item");

  // 検索結果があれば（1個以上あれば）何もせずに監視を続ける
  if (searchResults.length > 0) {
    return;
  }

  // 検索結果が0の場合のみ、買い物を続けるボタンの処理を設定する
  const continueShoppingBtn = document.querySelector(".js-continue-shopping");
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // 検索結果が0の状況をアラートで通知
      alert("検索結果が0件です。直前のページに戻ります。");

      // 直前のページに戻る処理
      if (document.referrer) {
        window.location.href = document.referrer;
      } else {
        window.location.href = "/";
      }
    });
    // ボタンが見つかったら監視を停止
    clearInterval(checkInterval);
  }
}

// 検索結果が0の可能性がある場合だけ、表示されるまで定期的にチェックする
const checkInterval = setInterval(initContinueShopping, 100);

// メール認証メッセージのスタイル変更
function styleVerificationMessage() {
  const messageElement = document.querySelector(".shopify-challenge__message");
  if (messageElement) {
    messageElement.style.backgroundColor = "#5789ca";
    messageElement.style.color = "#ffffff";
    messageElement.style.padding = "15px";
    messageElement.style.borderRadius = "4px";
    messageElement.style.marginBottom = "20px";
  }
}

// DOMContentLoadedイベントで実行
document.addEventListener("DOMContentLoaded", styleVerificationMessage);

document.addEventListener("DOMContentLoaded", function () {
  // 対象のURLを指定
  const targetLinks = [
    "https://www.rakuten.co.jp/hunting-world-/",
    "https://store.shopping.yahoo.co.jp/huntingworld/",
    "https://ec.jal.co.jp/shop/c/cbl/",
  ];

  // メニュー内のすべてのリンクを取得
  document.querySelectorAll("a").forEach((link) => {
    if (targetLinks.includes(link.href)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer"); // セキュリティ対策
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const messageElements = document.querySelectorAll(
    "#create_customer > div.note.note--error > ul > li"
  );
  const messageModal = document.querySelector(
    "#create_customer > div.note.note--error"
  );
  messageElements.forEach((element) => {
    if (
      element.textContent.includes(
        "会員登録を完了するために必要なメールを送信しました。"
      )
    ) {
      messageModal.style.backgroundColor = "#135CFE";
      messageModal.style.setProperty('border-bottom-color', '#135CFE');
    }
  });
});
