//網頁載入後要執行的函式
$(window).on("load", function(){
  creatPage();
  checkStock();
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
function creatPage(){
  if($(".product_Class").val()==1){
    $(".product_spc").children("table").html(typeNoDate);
  }else if($(".product_Class").val()==2){
    $(".product_spc").children("table").html(typeDate);
    //初始化日期
    flatpickr(".InputTestStyle",{
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: "today"
    });
  }
}

//確保數量最低在1
$(document).on("blur", ".input_quantity", function(){
  if(!$(this).val()>=1){
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
  console.log($(".product_Class").val());
  if($(".product_Class").val()==1 && $("div.product_spc").find("button.-on").length!=1){
    swal({
      position: 'top-end',
      icon: 'error',
      title: '請先選擇商品規格',
      showConfirmButton: false,
      timer: 1500
    });
  }else if ($(".product_Class").val()==2) {
    $.each($(".InputTestStyle"), function(index, item){
      console.log($(item).val());
    });
  }else{
    let price = $("div.product_spc").find("button.-on").children("a.price").html();
    let quantity = $("input.input_quantity").val();
  }
});

//立即購買
$("button.checkout").on("click", function(e){
  if($("div.product_spc").find("button.-on").length!=1){
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
modal.onclick = function() {
  modal.style.display = "none";
}

//日期
// $(document).on("mouseenter", ".InputTestStyle", function(){
//   let a = $(this)
//   flatpickr(".InputTestStyle",{
//     altInput: false,
//     altFormat: "F j, Y",
//     dateFormat: "Y-m-d",
//     minDate: "today"
//   });
// });


//injection
let typeNoDate = `<tr>
  <td class="spc">
    選項
  </td>
  <td>
    <button class="btn_option" type="button" name="button">
      選項111
      <a class="price">1980</a>
      <a class="stock">1231</a>
      <a class="PD_ID">PD000001</a>
    </button>
    <button class="btn_option" type="button" name="button">
      選項2222222
      <a class="price">2680</a>
      <a class="stock">23</a>
      <a class="PD_ID">PD000002</a>
    </button>
    <button class="btn_option" type="button" name="button">
      選項33
      <a class="price">360</a>
      <a class="stock">56</a>
      <a class="PD_ID">PD000003</a>
    </button>
    <button class="btn_option" type="button" name="button">
      選項44，庫存0
      <a class="price">750</a>
      <a class="stock">0</a>
      <a class="PD_ID">PD000004</a>
    </button>
    <button class="btn_option" type="button" name="button">
      選項55555
      <a class="price">399</a>
      <a class="stock">45</a>
      <a class="PD_ID">PD000005</a>
    </button>
    <button class="btn_option" type="button" name="button">
      選項6666666666
      <a class="price">280</a>
      <a class="stock">93</a>
      <a class="PD_ID">PD000006</a>
    </button>
  </td>
</tr>
<tr>
  <td>
    數量
  </td>
  <td>
    <input class="input_quantity" type="number" value="1" name="quantity" min="1" max="99"></input>
    <a>庫存數量: > 99</a>
  </td>
</tr>`;

let typeDate=`<tr>
　  <td rowspan="1">選項</td>
　<td><i class="far fa-calendar-alt" style="font-size: 1.5em;"></i></td>
  <td>起始日期</td>
  <td><input class="InputTestStyle" name="timeBefore"></td>
　</tr>
　<tr>
  <td></td>
　<td><i class="far fa-calendar-alt" style="font-size: 1.5em;"></i></td>
  <td>結束日期</td>
  <td><input class="InputTestStyle" name="timeBefore"></td>
　</tr>
<tr>
  <td></td>
  <td style="text-align: center;"><i class="fas fa-male" style="font-size: 1.8em;"></i></td>
  <td>人數</td>
  <td><input class="input_quantity" type="number" name="quantity" min="1" value="1"></td>
</tr>`;
