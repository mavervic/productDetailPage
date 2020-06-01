<%@page import="sun.misc.BASE64Encoder"%>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="BIG5">
<title>prosearch</title>
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

<%

	

%>
	

	<div class="search_area">
		<img alt="" src="data:image/jpg;base64, " />
	</div>
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/product/js/productList.js"></script>
</body>
</html>