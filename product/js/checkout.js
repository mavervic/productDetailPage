



$(window).on("load", function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
});
















// 燈箱==============================================
let modal = document.getElementById('myModal');
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
$(".choiceCoupon").on("click", function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
});

$(".close").click(function(){
  modal.style.display = "none";
});

$(".cancel").click(function(){
  modal.style.display = "none";
});
