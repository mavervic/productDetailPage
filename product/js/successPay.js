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
