<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <title>修改商品</title>
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
    <input type="hidden" name="operate" value="checkUpdate">
    <input type="hidden" name="product_ID" value="${productVO.product_ID}">
      <table>
        <tr>
          <td><a>*商品名稱</a></td>
          <td><input type="text" name="product_Name" value="${productVO.product_Name}" required></td>
          <td><a>*商品簡介</a></td>
          <td><input type="text" name="product_Intro" value="${productVO.product_Intro}" required></td>
        </tr>
        <tr>
          <td><a>地址</a></td>
          <td><input type="text" name="product_Address" value="${productVO.product_Address}"></td>
          <td><a>平均停留時間</a></td>
          <td><input type="text" name="product_Staytime" value="${productVO.product_Staytime}"></td>
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
          <td><input type="text" name="product_Style" value="${productVO.product_Style}" required></td>
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

        </tr>

        <tr>
          <td><a>商品詳情</a></td>
          <td><input type="text" name="product_Info" value="${productVO.product_Info}"></td>
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
          <td><a>行程總覽</a></td>
          <td><input type="text" name="product_Total_Schedule" value="${productVO.product_Total_Schedule}"></td>
          <td><a>上傳照片</a></td>
          <td><input type="file" accept="image/*" name="product_Img1" value=""></td>
        </tr>
        <tr>
          <td><a><input type="submit" value="確認修改"></a></td>
        </tr>
      </table>
    </form>
</body>
</html>