<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>product列表</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/product/css/productList.css">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/product/vendors/jquery/jquery-3.4.1.min.js"></script>
</head>
<body>
	<aside class="aside">
		<a href="#">xxx管理</a>
		<a href="<%=request.getContextPath()%>/product/productAdd.jsp">新增商品</a>
		<a href="<%=request.getContextPath()%>/product/productList.jsp">商品清單</a>
	</aside>

	<div class="search_area">
		<input type="text" id="search" placeholder="請輸入商品編號" />
		<span class="searchIcon"><i class="fa fa-search"></i></span>
	</div>
	
	<jsp:useBean id="productList" scope="page" class="com.product.model.ProductService"></jsp:useBean>
	
	<table>
		<tr>
			<th><input type="checkbox" name="" value=""></th>
			<th>商品照片</th>
			<th>商品名稱</th>
			<th>商品編號</th>
<!-- 			<th>商品簡介</th> -->
			<th>平均停留時間</th>
<!-- 			<th>地址</th> -->
			<th>經度</th>
			<th>緯度</th>
			<th>縣市</th>
			<th>商品類別</th>
			<th>商品風格</th>
			<th>熱門狀態</th>
			<th>購買紀錄</th>
			<th>點擊紀錄</th>
			<th>商品狀態</th>
			<th>操作</th>
		</tr>

		<c:forEach items="${productList.all}" var="product">
			<tr class="list">
				<td><input type="checkbox" name="" value=""></td>
				<td><img alt="" src="<%=request.getContextPath()%>/DBGifReader2?product_ID=${product.product_ID}" width="150px" height="150px"></td>
				<td>${product.product_Name}</td>
				<td>${product.product_ID}</td>
<%-- 				<td>${product.product_Intro}</td> --%>
				<td>${product.product_Staytime}</td>
<%-- 				<td>${product.product_Address}</td> --%>
				<td>${product.product_Latitutde}</td>
				<td>${product.product_Longitude}</td>
				<td>${product.product_County}</td>
				<td>${product.product_Class}</td>
				<td>${product.product_Style}</td>
				<td>${product.product_Seq}</td>
				<td>${product.product_Sale_Rec}</td>
				<td>${product.product_Click_Rec}</td>
				<td>${product.product_State==1?"上架中":"下架"}</td>
				<td><a href="/TDA101G1/ProductServlet?update=${product.product_ID}">修改</a>
				<br><a href="/TDA101G1/ProductServlet?delete=${product.product_ID}">刪除</a></td>
			</tr>
		</c:forEach>
	</table>

	<script type="text/javascript" src="<%=request.getContextPath()%>/product/js/productList.js"></script>
</body>
</html>
