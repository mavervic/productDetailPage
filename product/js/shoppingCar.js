$(window).on("load", function(){
  changeOption();
  subtotal();
  noItem();
});

$(document).on("change", function(){
  changeOption();
  subtotal();
  prepareCheckout();
  reverseCheckbox();
});

//空購物車動態產生提示訊息
function noItem(){
  if($(".selectOne").length==0 && $(".failureArea").length==0){
    $(".itemTable").after(noItemDOM);
    $(".clearItem").css("display","none");
    $(".checkoutArea").css("display","none");
  }
}

//選項變動時價格即時更新
function changeOption(){
  // console.log($("option:checked").attr("data-price"));
  $("option:checked").each(function(){
    let price = $(this).attr("data-price");
    $(this).closest("td").next(".price").html(price);
  });
}

//單一商品小計
function subtotal(){
  for(let i=0; i<$(".subtotal").length; i++){
    let price = $(".price")[i].innerHTML;
    let quantity = $(".input_quantity")[i].value;
    $(".subtotal")[i].innerHTML = price * quantity;
  }
}

// 選中的商品結算
function prepareCheckout(){
  let price = 0;
  let count = 0;
  $(".sumPrice").html(0);
  $(".sumQuantity").html(0);
  $(".selectOne:checked").each(function(){
    price += parseInt($(this).closest("tr").find(".subtotal").html());
    count += parseInt($(this).closest("tr").find(".input_quantity").val());
    $(".sumPrice").html(price);
    $(".sumQuantity").html(count);
    // console.log(count);
    // console.log(price);
  });
}

//結帳
$(".checkout").on("click", function(){
  if($(".selectOne:checked").length==0){
    swal({
      position: 'top-end',
      icon: 'warning',
      title: '請先選擇要結帳的商品',
      showConfirmButton: false,
      timer: 1500
    });
  }else {
    sessionStorage.clear();
    let goods = [];
    $(".selectOne:checked").each(function(index, item){
      console.log($(this).closest("tr").find("option:checked").attr("data-pd_ID"));
      console.log($(this).closest("tr").find(".input_quantity").val());
      let pd_ID = $(this).closest("tr").find("option:checked").attr("data-pd_ID");
      let option = $(this).closest("tr").find("option:checked").html();
      let price = $(this).closest("tr").find(".price").html();
      let quantity = $(this).closest("tr").find(".input_quantity").val();
      goods[index] = JSON.stringify({
        "pd_ID":pd_ID,
        "option":option,
        "price":price,
        "quantity":quantity,
        "":""
      })
      sessionStorage.setItem("checkoutInfo", goods);
    });
    window.location.href="checkout.html"
  }
});
// JSON.stringify({
//   "pd_ID":pd_ID,
//   "option":option,
//   "price":price,
//   "quantity":quantity,
//   "":""
// })
// 刪除勾選的商品
$(".removeSelect").on("click", function(){
  if($(".selectOne:checked").length>0){
    swal({
      title: "確認刪除勾選的商品嗎?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["取消","確認刪除"],
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("您勾選的商品已經被刪除", {
          icon: "success",
          timer: 1000
        });
        $(".selectOne:checked").each(function(){
          $(this).closest("tr").remove();
          reverseCheckbox();
        });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }
});

//刪除單一商品
$(".removeOne").on("click", function(){
  swal({
    title: "確認刪除這項商品嗎?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    buttons: ["取消","確認刪除"],
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("您勾選的商品已經被刪除", {
        icon: "success",
        timer: 1000
      });
      $(this).closest("tr").remove();
      prepareCheckout();
      if($(".failureItem").length<1){
        $(".failureArea").remove();
        $(".gap").remove();
      }
      noItem();
    } else {
      // swal("Your imaginary file is safe!");
    }
  });
});

// 刪除失效商品
$(".removeFailure").on("click", function(){
  $(".failureItem").remove();
  $(".failureArea").remove();
  $(".gap").remove();
});


// checkbox全選
$(".selectAll").on("click", function(){
  $(".selectOne").each(function(){
    $(".selectOne").prop("checked", $(".selectAll").prop("checked"))
  });
});

// reverseCheckbox
function reverseCheckbox(){
  if($(".selectOne").length>0){
    if($(".selectOne").length == $(".selectOne:checked").length){
      $(".selectAll").prop("checked", true);
    }else {
      $(".selectAll").prop("checked", false);
    }
  }else {
    $(".selectAll").prop("checked", false);
  }
}


// $(".selectFailureAll").on("click", function(){
//   for(let i=0; i<$(".selectFailureOne").length; i++){
//     $(".selectFailureOne")[i].checked = $(this)[0].checked;
//   }
// });




let noItemDOM = `<div class="row noItemCar justify-content-center">
  <div class="col-12 noItem">
    <div class="">
      <i class="fas fa-shopping-cart" style="font-size:200px; color:#5A5A5A;"></i>
    </div>
    <div class="">
      <p>您的購物車目前是空的</p>
      <p><a href="">點擊這裡</a>到商城首頁開始選購吧</p>
    </div>
  </div>
</div>`;
