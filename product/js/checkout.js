$(window).on("load", function(){
  // console.log($(".orderOne").find(".price").text());
  getCheckoutInfo();
  subtotal();
  tottleAmount();

});

//計算每個商品的小計
function subtotal(){
  $(".orderOne").each(function(){
    let price = $(this).find(".price").html();
    let quantity = $(this).find(".quantity").html();
    $(this).next("tr").find(".span_subtotal").html(price * quantity);
    $(this).next("tr").find(".span_quantity").html(quantity);
  });
}

//計算應付金額
function tottleAmount(){
  let tottleAmount = 0;
  $(".orderOne").each(function(){
    let price = $(this).find(".price").html();
    let quantity = $(this).find(".quantity").html();
    $(this).find(".subtotal").html(price * quantity);
    tottleAmount += price * quantity;
  });

  $(".tottleAmount").html(tottleAmount);
  $(".shouldPay").html(tottleAmount);
}


//讀取購物車放在sessionStorage的資料
function getCheckoutInfo(){
  let goods = JSON.parse(sessionStorage.getItem("checkoutInfo"))
  $(goods).each(function(){
    let good = $(this)[0];
    console.log(good);
    orderOneDOM(good.productName, good.product_ID, good.productDetail_ID, good.spc, good.price, good.quantity, good.start, good.end);
  });
}



//付款方式按鈕樣式切換
$(".btn_payments").on("click", function(){
  $(".-on").toggleClass("-on");
  $(this).toggleClass("-on");
});

//選擇使用信用卡付款時動態產生相關頁面
$(".credicard").on("click", function(){
  // $(".choiceAccount").html(credicard);
  $(".creditCard").css("display", "")
});
//選擇使用銀行轉帳時動態產生相關頁面
$(".transfer").on("click", function(){
  // $(".choiceAccount").html("");
});
//選擇使用手機支付時動態產生相關頁面
$(".mobilePay").on("click", function(){
  // $(".choiceAccount").html("");
  $(".creditCard").css("display", "none")
});



// 燈箱==============================================
let modal = document.getElementById('myModal');
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
$(".choiceCoupon").on("click", function(){
  modal.style.display = "block";
});

$(".close").click(function(){
  modal.style.display = "none";
  $(".couponDetail").css("display","none");
});

$(".cancel").click(function(){
  modal.style.display = "none";
  $(".couponDetail").css("display","none");
});

$(".btn_GoBack").on("click", function(){
  $(".couponDetail").css("display","none");
});

$(".callDetail").on("click", function(){
  $(".couponDetail").css("display","block");
  console.log("data-coupon_ID: "+$(this).closest("tr").attr("data-coupon_ID"));
});

//計算應付金額(含打折後)
$(".confirm").on("click", function(){
  console.log($("input.radioCoupon:checked").next("a").html());
  if($("input.radioCoupon:checked").length>0){
    $(".selectedCoupon").html("已選取: "+$("input.radioCoupon:checked").next("a").html());
    let discount = $("input.radioCoupon:checked").attr("data-discount")
    $(".discount").html(Math.ceil($(".tottleAmount").html()-$(".tottleAmount").html()*discount));
    $(".shouldPay").html($(".tottleAmount").html()-$(".discount").html());
  }
  modal.style.display = "none";
});

$(window).on("keyup", function(e){
  // console.log("鍵盤對應的ASCII: " + e.which);
  if (e.which == 27 && $(".couponDetail").css("display")=="block") {
    $(".couponDetail").css("display","none");
  }else if (e.which == 27 && $(".couponDetail").css("display")=="none") {
    modal.style.display = "none";
  }
});

// 燈箱2==============================================
let modal1 = document.getElementById('myModal1');
$(document).on("click", ".addCreditcard", function(){
  modal1.style.display = "block";
});

$(".close").click(function(){
  modal1.style.display = "none";
});

$(".cancel").click(function(){
  modal1.style.display = "none";
  $(".couponDetail").css("display","none");
});

$(window).on("keyup", function(e){
  // console.log("鍵盤對應的ASCII: " + e.which);
  if (e.which == 27) {
    modal1.style.display = "none";
  }
});

//註冊新增信用卡
$(".registerCreditcard").on("click", function(){


});



//自動切換信用卡icon
$(".btn_payments").on("click", function(){
  $(".cardNumber").each(function(){
    let str = $(this).html();
    if(str.indexOf(5) == 0){
      $(this).prev("i").attr("class","fab fa-cc-mastercard");
    }else if (str.indexOf(3) == 0) {
      $(this).prev("i").attr("class","fab fa-cc-jcb");
    }else {
      $(this).prev("i").attr("class","fab fa-cc-visa");
    }
  });
});


let credicard =
`<div class="col-12 col-md-3">
  選擇付款帳戶
  <br><i>(要先拿到用戶資料再select出來)</i>
</div>
<div class="col-12 col-md-9">
  <div class="">
    <label>
      <input type="radio" name="1" value=""><i class="fab fa-cc-visa" style="font-size: 2em;"></i>
      <a class="cardNumber">4xxx-xxxx-xxxx-xxxx</a>
    </label>
  </div>
  <div class="">
    <label>
      <input type="radio" name="1" value=""><i class="fab fa-cc-mastercard" style="font-size: 2em;"></i>
      <a class="cardNumber">5xxx-xxxx-xxxx-xxxx</a>
    </label>
  </div>
  <div class="">
    <label>
      <input type="radio" name="1" value=""><i class="fab fa-cc-jcb" style="font-size: 2em;"></i>
      <a class="cardNumber">3xxx-xxxx-xxxx-xxxx</a>
    </label>
  </div>
  <div class="">
    <button class="addCreditcard" type="button" name="button">++使用新信用卡付款</button>
  </div>
</div>`



function orderOneDOM(productName, product_ID, productDetail_ID, spc, price, quantity, start, end){
  let contextPath = location.pathname.split("/")[1];
  let foo = `<tr class="orderOne" data-product_ID="`+product_ID+`" data-productDetail_ID="`+productDetail_ID+`">
    <td rowspan="2" class="" style="box-shadow: 0px 3px 0px 0px #cccccc;">
      <div class="previewImg">
        <img src="/`+contextPath+`/DBGifReader2?conditions=`+product_ID+`&whichImg=PRODUCT_IMG1&tName=PRODUCT" alt="">
      </div>
    </td>
    <td class="">
      <p class="">`+productName+`</p>
      <p class="">`+spc+`</p>
    </td>
    <td>
      <p class="">`+start+`</p>
      <p class="">`+end+`</p>
    </td>
    <td class="price">`+price+`</td>
    <td class="quantity">`+quantity+`</td>
  </tr>
  <tr>
    <td colspan="4" class="subtotalAgain">
      <hr>
      訂單金額(<span class="span_quantity"></span>個商品)
      NT:<span class="span_subtotal"></span>
    </td>
  </tr>`

  console.log($("table").first().append(foo));
}
