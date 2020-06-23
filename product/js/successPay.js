//倒數計時與返回上一頁=====================================================
if(window.Worker){
  console.log("此瀏覽器有支援Worker");
  const worker = new Worker("./js/worker.js");
  worker.onmessage = function(e){
    // console.log(e.data); //從背景執行緒取得訊息
    $(".seconds").html(e.data);
    if(e.data == 0){
      window.location.href="#";
      // history.back();
    }
  }
}

// 將目前網址先暫存
var current_url = location.href;

// 將目前瀏覽歷程的 url 設定為 a.html
history.replaceState(null, null, "denypage.html");

// 新增一個瀏覽歷程，為 current_url
history.pushState(null, null, current_url);

// 按下上一頁時，觸發 popstate 事件
window.onpopstate = function(event){
  location.reload();
}
