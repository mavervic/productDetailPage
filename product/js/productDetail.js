//網頁載入後要執行的函式
$(window).on("load", function(){
  createSpc();
  checkStock();
  createProductDetail();
  loadStar();

  //套裝行程圖片參照商品縮圖
  let origin = $(".smaller_img").children("img");
  let ref = $(".introduction_card").find("img");
  $.each(origin, function(index, item){
    $(ref[index]).attr("src", $(origin[index]).attr("src"))
  });
});

//查詢並將庫存小於1的按鈕設定為disabled
function checkStock(){
  $.each($("button.btn_option"), function(index, item){
    if($(item).children("a.stock").html()<1){
      $(this).attr("disabled","disabled");
    }
  });
}

//依照商品類型動態產生頁面
function createSpc(){
  if($(".product_Class").val()=="餐廳"){
    $(".product_spc").children("table").html(typeFood);
  }else if($(".product_Class").val()=="套裝行程" || $(".product_Class").val()=="景點"){
    $(".product_spc").children("table").html(typeTravel);
    //初始化日期
    flatpickr(".inputCalendar",{
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      maxDate: new Date().getTime()+(1000*60*60*24*59)
    });
    $(".end").attr("disabled","disabled");
  }else if ($(".product_Class").val()=="住宿") {
    $(".product_spc").children("table").html(typeHotel);
    //初始化日期
    flatpickr(".start",{
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      maxDate: new Date().getTime()+(1000*60*60*24*59)
    });
    flatpickr("input.end",{
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: new Date().getTime()+(1000*60*60*24),
      maxDate: new Date().getTime()+(1000*60*60*24*60)
    });
  }
}


$(document).on("change", "input.start", function(){
//起始日與結束日連動
  let foo = $("input.start").val();
  let bar = $("input.end").val();
  if(foo >= bar && $(".product_Class").val()=="住宿"){
    foo = Date.parse(foo).valueOf();
    flatpickr("input.end",{
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: new Date(foo+(1000*60*60*24)),
      maxDate: new Date().getTime()+(1000*60*60*24*60)
    });
  }else if ($(".product_Class").val()=="景點") {
    $(".end").val(foo);
  }else if ($(".product_Class").val()=="套裝行程") {
    let days = 5-1;
    foo = Date.parse(foo).valueOf();
    foo = foo+(1000*60*60*24*days);
    flatpickr("input.end",{
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      defaultDate: foo
    });
  }
});

$(document).on("change", ".inputCalendar", function(){
  if($("input.start").val()!="" && $("input.end").val()!=""){
    let foo = $("input.start").val();
    let bar = $("input.end").val();
    console.log(foo);
    console.log(bar);
    foo = new Date(foo).valueOf();
    bar = new Date(bar).valueOf();
    console.log(foo);
    console.log(bar);

    let missedPeriod = (bar-foo-86400000)/86400000;

    for(let i=0; i<missedPeriod; i++){
      console.log(new Date(foo+((i+1)*86400000)));
    }
  }
});



//動態產生商品詳情
function createProductDetail(){
  if($(".product_Class").val()=="套裝行程"){
    $(".introduction_card").html(travelSet);
  }else{
    $(".introduction_card").html(normalProduct);
  }
}

//確保數量最低在1
$(document).on("blur", ".input_quantity", function(){
  if(!$(this).val()<1){
    $(this).val("1");
  }
});

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
$(document).on("click", "button.btn_option", function(){
  if($(this).is(".-on")){
    $(this).toggleClass("-on");
    $("div.price_area").children("h5").html("售價: " + "請先選擇查看價錢");
    $("input.input_quantity").siblings("a").html("剩餘數量: " + "> 99");
  }else{
    $(this).closest("td").children("button").attr("class","btn_option");
    $(this).toggleClass("-on");
    $("div.price_area").children("h5").html("售價: " + $(this).children("a.price").html());
    $("input.input_quantity").val(1);
    $("input.input_quantity").siblings("a").html("剩餘數量: " + $(this).children("a.stock").html());
    $("input.input_quantity").attr("max", $(this).children("a.stock").html());
    $("input.productDetail_ID").val($(this).children("a.PD_ID").html());
  }
});

// 評論篩選的按鈕樣式相關
$("td.filter_area").children("button").on("click", function(){
  if($(this).is(".-on")){
    $(this).toggleClass("-on");
    $(this).closest("td").children("button").first("button").toggleClass("-on")
  }else{
    $(this).closest("td").children("button").attr("class","btn_filter");
    $(this).toggleClass("-on");
  }
});

//依照評分動態產生星號
function loadStar(){
  $(".score").each(function(index, item){
    let j = $(this).html();
    let star = ""
    for(let i=0; i<j; i++){
      star += `<i class="fas fa-star" style="color:#FFDD26;"></i>`;
    }
    for(let i=0; i<5-j; i++){
      star += `<i class="far fa-star" style="color:#FFDD26;"></i>`;
    }
    $(this).next("p").html(star);
  });
}

//依照評分篩選評論
$(".btn_filter").on("click", function(){
  $(".comment_card").css("display", "flex");
  let foo = $(this).data("filter")
  $(".comment_card").each(function(){
    let bar = $(this).find(".score").html();
    if(foo == "all"){
      $(this).css("display", "flex");
    }else if (foo == "hasImg") {
      if($(this).find(".comment_img").attr("src") == ""){
        $(this).css("display", "none");
      }

    }else if (foo != bar) {
      $(this).css("display", "none");
    }
  });
});


//搜尋欄
$("span.searchIcon").children("i").on("click", function(){
  let keyword = $("input#search").val();
  if(keyword.trim()==""){
    swal({
      position: 'top-end',
      icon: 'warning',
      title: '請商品名稱輸入關鍵字',
      showConfirmButton: false,
      timer: 1500
    });
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
  if($(".product_Class").val()=="餐廳" && $("div.product_spc").find("button.-on").length!=1){
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
  }else if ($(".product_Class").val()=="套裝行程" && $(".start").val()=="" || $("div.product_spc").find("button.-on").length!=1) {
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
  }else if ($(".product_Class").val()=="景點" && $(".start").val()=="" || $("div.product_spc").find("button.-on").length!=1) {
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
  }else if ($(".product_Class").val()=="住宿" && $(".start").val()=="" || $(".end").val()=="" || $("div.product_spc").find("button.-on").length!=1) {
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
  }else{ //正確加入
    console.log($(".product_Class").val());
    let price = $("div.product_spc").find("button.-on").children("a.price").html();
    let quantity = $("input.input_quantity").val();
  }
});

//立即購買
$("button.checkout").on("click", function(e){
  if($(".product_Class").val()=="餐廳" && $("div.product_spc").find("button.-on").length!=1){
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
    e.preventDefault();//阻止submit送出表單
  }else if ($(".product_Class").val()=="套裝行程" && $(".start").val()=="" || $("div.product_spc").find("button.-on").length!=1) {
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
    e.preventDefault();//阻止submit送出表單
  }else if ($(".product_Class").val()=="景點" && $(".start").val()=="" || $("div.product_spc").find("button.-on").length!=1) {
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
    e.preventDefault();//阻止submit送出表單
  }else if ($(".product_Class").val()=="住宿" && $(".start").val()=="" || $(".end").val()=="" || $("div.product_spc").find("button.-on").length!=1) {
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
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
$(document).on("click", ".img_smaller_scheduleLight", function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
});
modal.onclick = function() {
  modal.style.display = "none";
}
