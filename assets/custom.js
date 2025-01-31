// 買い物を続けるボタンの遷移処理を定期的にチェック
function initContinueShopping() {
  const continueShoppingBtn = document.querySelector(".js-continue-shopping");
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // 直前のページに戻る
      if (document.referrer) {
        // 直前のページがある場合はそこに遷移
        window.location.href = document.referrer;
      } else {
        // 直前のページがない場合はホームページに遷移
        window.location.href = "/";
      }
    });
    // ボタンが見つかったら監視を停止
    clearInterval(checkInterval);
  }
}

// ボタンが表示されるまで定期的にチェック
const checkInterval = setInterval(initContinueShopping, 100);
