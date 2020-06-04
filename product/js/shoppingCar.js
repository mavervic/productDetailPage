$(window).on("load", function(){
  subtotal();
});

$(document).on("change", function(){
  subtotal();
  prepareCheckout();
  reverseCheckbox();
});

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

// 刪除勾選的商品
$(".removeSelect").on("click", function(){
  $(".selectOne:checked").each(function(){
    $(this).closest("tr").remove();
    reverseCheckbox();
  });
});

//刪除單一商品
$(".removeOne").on("click", function(){
  $(this).closest("tr").remove();
});

// 刪除失效商品
$(".removeFailure").on("click", function(){
  $(".failureItem").remove();
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

$(".selectFailureAll").on("click", function(){
  for(let i=0; i<$(".selectFailureOne").length; i++){
    $(".selectFailureOne")[i].checked = $(this)[0].checked;
  }
});
