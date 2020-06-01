<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <title>新增商品</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/product/css/productAdd.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="./vendors/jquery/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"></script>
</head>
<body>
	<aside class="aside">
		<a href="#">xxx管理</a>
  		<a href="<%=request.getContextPath()%>/product/productAdd.jsp">新增商品</a>
  		<a href="<%=request.getContextPath()%>/product/productList.jsp">商品清單</a>
  	</aside>

    <form action="<%=request.getContextPath()%>/ProductServlet" method="post" enctype="multipart/form-data">
    <input type="hidden" name="operate" value="insert">
      <table>
        <tr>
          <td><a>*商品名稱</a></td>
          <td><input type="text" name="product_Name" value="" required></td>
          <td><a>*商品簡介</a></td>
          <td><input type="text" name="product_Intro" value="" required></td>
        </tr>
        <tr>
          <td><a>地址</a></td>
          <td><input type="text" name="product_Address" value=""></td>
          <td><a>平均停留時間</a></td>
          <td><input type="text" name="product_Staytime" value=""></td>
        </tr>
        <tr>
          <td><a>縣市</a></td>
          <td>
            <select class="" name="product_County">
              <option value="台北">台北</option>
              <option value="台中">台中</option>
              <option value="台南">台南</option>
              <option value="高雄">高雄</option>
              <option value="金門">金門</option>
            </select>
          </td>
          <td><a>*商品風格</a></td>
          <td><input type="text" name="product_Style" value="" required></td>
        </tr>
        <tr>
          <td><a>商品狀態</a></td>
          <td>
            <label class="label_area">
              <input type="radio" name="product_State" value="1" class="checkbox_area" checked>上架
            </label>
            <label class="label_area">
              <input type="radio" name="product_State" value="0" class="checkbox_area">下架
            </label>
          </td>
			<td><a>*商品類別</a></td>
          <td>
            <label class="label_area">
              <input type="radio" name="product_Class" value="套裝行程" class="checkbox_area" required>套裝
            </label>
            <label class="label_area">
              <input type="radio" name="product_Class" value="景點" class="checkbox_area">景點
            </label>
            <label class="label_area">
              <input type="radio" name="product_Class" value="美食" class="checkbox_area">美食
            </label>
            <label class="label_area">
              <input type="radio" name="product_Class" value="住宿" class="checkbox_area">住宿
            </label>
          </td>
        </tr>

        <tr>
          <td><a>商品詳情</a></td>
          <td><input type="text" name="product_Info" value=""></td>
        </tr>
        <tr>
          <td><a>上傳照片</a></td>
          <td><input type="file" accept="image/*" name="product_Img1" value=""></td>
        </tr>
      </table>
      
      <p>商品詳情</p>
      <textarea class="textarea" name="product_Info" rows="8" cols="80"></textarea>
      <p>行程總覽varchar2(2000) 可輸入字數0/600</p>
      <textarea class="textarea" name="product_Total_Schedule" rows="8" cols="80"></textarea>
      <p>商品詳情CLOB</p>
      <textarea class="textarea" name="product_Info" rows="8" cols="80"></textarea>
      <ul class="picture_list"></ul>
    	<input type="file" id="the_file" name="base64Test" accept="image/*"  value="" multiple>
	    <p><input type="submit" value="確認新增"></p>
    </form>
    
    <!-- accept='image/*' -->
    <script>
      window.addEventListener("DOMContentLoaded", function(){

        var the_file_element = document.getElementById("the_file");
        the_file_element.addEventListener("change", function(e){
          //console.log(this.files);
          //var all_file_length = this.files.length;
          console.log(e.target);


          var picture_list = document.getElementsByClassName("picture_list")[0];
          picture_list.innerHTML = ""; // 清空

          // 跑每個使用者選的檔案
          for (var i = 0; i < this.files.length; i++) {
            let reader = new FileReader(); // 用來讀取檔案

            reader.addEventListener("load", function (e) {
              console.log("load 事件")

              reader.addEventListener("loadstart", function (e) {
                console.log("loadstart 事件");
              });

              // 建立 li 相關原始碼標籤，然後放入 picture_list 標籤裡
              let li_node = document.createElement("li");
              li_node.innerHTML = '<img class="preview" src="' + reader.result + '">';
              picture_list.appendChild(li_node); // 加進節點
            });

            reader.readAsDataURL(this.files[i]); // 讀取檔案
          }

        });
      });
    </script>
</body>
</html>