










$(window).on("load", function(){
  // console.log($(".orderOne").find(".price").text());
  let tottleAmount = 0;
  $(".orderOne").each(function(){
    let price = $(this).find(".price").html();
    let quantity = $(this).find(".quantity").html();
    $(this).find(".subtotal").html(price * quantity);
    tottleAmount += price * quantity;
  });

  $(".span_subtotal").each(function(){
    let quantity = $(this).closest("tr").prev().children(".quantity").html();
    let subtotal = $(this).closest("tr").prev().children(".subtotal").html();
    $(this).prev(".span_quantity").html(quantity);
    $(this).html(subtotal);
  });

  $(".tottleAmount").html(tottleAmount);
  $(".shouldPay").html(tottleAmount);

  // let quantity = $(".span_quantity").closest("tr").prev().children(".quantity").html();
  // let subtotal = $(".span_subtotal").closest("tr").prev().children(".subtotal").html()
  //
  // $(".span_quantity").html(quantity);
  // $(".span_subtotal").html(subtotal);


});


$(".btn_payments").on("click", function(){
  $(".-on").toggleClass("-on");
  $(this).toggleClass("-on");
});

$(".credicard").on("click", function(){
  $(".choiceAccount").html(credicard);
});

$(".transfer").on("click", function(){
  $(".choiceAccount").html("");
});

$(".transfer").on("click", function(){
  $(".choiceAccount").html("");
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

$(".confirm").on("click", function(){
  console.log($("input.radioCoupon:checked").next("a").html());
  if($("input.radioCoupon:checked").length>0){
    $(".selectedCoupon").html("已選取: "+$("input.radioCoupon:checked").next("a").html());
    let discount = $("input.radioCoupon:checked").attr("data-discount")
    $(".discount").html($(".tottleAmount").html()-$(".tottleAmount").html()*discount);
    $(".shouldPay").html($(".tottleAmount").html()*discount);
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

// =======================================================================

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

$(".registerCreditcard").on("click", function(){

});

$(window).on("keyup", function(e){
  // console.log("鍵盤對應的ASCII: " + e.which);
  if (e.which == 27) {
    modal1.style.display = "none";
  }
});


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
