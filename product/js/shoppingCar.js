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
  $(".selectOne").each(function(){
    if(this.checked==true){
      price += parseInt($(this).closest("tr").find(".subtotal").html());
      count += parseInt($(this).closest("tr").find(".input_quantity").val());
      $(".sumPrice").html(price);
      $(".sumQuantity").html(count);
      // console.log(count);
      // console.log(price);
    }
  });
}







// checkbox全選
$(".selectAll").on("click", function(){
  for(let i=0; i<$(".selectOne").length; i++){
    $(".selectOne")[i].checked = $(this)[0].checked;
  }
});

// reverseCheckbox
function reverseCheckbox(){
  let count = 0;
  $(".selectOne").each(function(){
    if(this.checked==true){
      count++
    }
  });
  if($(".selectOne").length == count){
    $(".selectAll").prop("checked", true);
  }else {
    $(".selectAll").prop("checked", false);
  }
}



$(".selectFailureAll").on("click", function(){
  for(let i=0; i<$(".selectFailureOne").length; i++){
    $(".selectFailureOne")[i].checked = $(this)[0].checked;
  }
});
