//網頁載入後要執行的函式

window.addEventListener("load", function(){
  checkStock()
});

//查詢並將庫存小於1的按鈕設定為disabled
function checkStock(){
  $.each($("button.btn_option"), function(index, item){
    if($(item).children("a.stock").html()<1){
      $(this).attr("disabled","disabled");
    }
  });
}

// 圖片切換
$(".smaller_img img").on("click", function(){
  let src = $(this).attr("src")
  $(".main_img img").attr("src", src);
});

//數量限制與填寫表單
$("input.input_quantity").on("change", function(){
  if($("input.input_quantity").val()>$(this).attr("max")){
    $("input.input_quantity").val($(this).attr("max"));
  }
  $("input.quantity").val($("input.input_quantity").val());
});

// 商品選項切換與填寫表單
$("button.btn_option").on("click", function(){
  if($(this).is(".-on")){
    $(this).toggleClass("-on");
    $("div.price_area").children("h5").html("售價: " + "請選擇一個商品規格");
    $("input.input_quantity").siblings("a").html("庫存數量: " + "> 99");
  }else{
    $(this).closest("td").children("button").attr("class","btn_option");
    $(this).toggleClass("-on");
    $("div.price_area").children("h5").html("售價: " + $(this).children("a.price").html());
    $("input.input_quantity").val(1);
    $("input.input_quantity").siblings("a").html("庫存數量: " + $(this).children("a.stock").html());
    $("input.input_quantity").attr("max", $(this).children("a.stock").html());
    $("input.productDetail_ID").val($(this).children("a.PD_ID").html());
  }
});

// 評論篩選
$("td.filter_area").children("button").on("click", function(){
  if($(this).is(".-on")){
    $(this).toggleClass("-on");
    $(this).closest("td").children("button").first("button").toggleClass("-on")
  }else{
    $(this).closest("td").children("button").attr("class","btn_filter");
    $(this).toggleClass("-on");
  }
});

//搜尋欄
$("span.searchIcon").children("i").on("click", function(){
  let keyword = $("input#search").val();
  if(keyword.trim()==""){
    alert("請商品名稱輸入關鍵字")
  }else{
    window.location.href="#";
  }
});

$("#search").on("keyup", function(e) {
  // console.log("鍵盤對應的ASCII: " + e.which);
  if (e.which == 13) {
    $("span.searchIcon").children("i").click();
  }
});

//加入購物車
$("button.addCar").on("click", function(){
  if($("div.product_spc").find("button.-on").length!=1){
    alert("請先選擇商品規格");
  }else{
    let price = $("div.product_spc").find("button.-on").children("a.price").html();
    let quantity = $("input.input_quantity").val();
  }
});

//立即購買
$("button.checkout").on("click", function(e){
  if($("div.product_spc").find("button.-on").length!=1){
    alert("請先選擇商品規格");
    e.preventDefault();//阻止submit送出表單
  }else{
    let price = $("div.product_spc").find("button.-on").children("a.price").html();
    let quantity = $("input.input_quantity").val();
    console.log($(this).html());
  }
});

// 燈箱https://zacklive.com/w3schools-lightbox
let modal = document.getElementById('myModal');
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
$("img.comment_img").on("click", function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
});
$(".main_img").children("img").on("click", function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
});
modal.onclick = function() {
  modal.style.display = "none";
}
