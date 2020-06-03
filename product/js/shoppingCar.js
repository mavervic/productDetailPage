$(window).on("load", function(){
  subtotal();
});

$(document).on("change", function(){
  subtotal();
  console.log($(".selectOne").attr("checked"));
});

//計算小計
function subtotal(){
  for(let i=0; i<$(".subtotal").length; i++){
    let price = $(".price")[i].innerHTML;
    let quantity = $(".input_quantity")[i].value;
    $(".subtotal")[i].innerHTML = price * quantity;
  }
}

$(".selectAll").on("click", function(){
  if($(this)[0].checked){
    $(".selectOne").attr("checked", "checked");
  }else{
    $(".selectOne").removeAttr("checked");
  }
});

$(".selectOne").on("click", function(){
  $(".selectOne").closest("td").children("input").toggleClass("-on");
  // $(".selectOne").toggleClass("-on");
});
























$(".selectFailureAll").on("click", function(){
  for(let i=0; i<$(".selectFailureOne").length; i++){
    $(".selectFailureOne")[i].checked = $(this)[0].checked;
  }
});
