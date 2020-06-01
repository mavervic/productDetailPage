$("span.searchIcon").children("i").on("click", function(){
  let keyword = $("input#search").val();
  if(keyword.trim()==""){
    alert("請商品名稱輸入關鍵字")
  }else{
    window.location.href="/TDA101G1/ProductServlet?select="+keyword;
  }
});

$("#search").on("keyup", function(e) {
  // console.log("鍵盤對應的ASCII: " + e.which);
  if (e.which == 13) {
    $("span.searchIcon").children("i").click();
  }
});
