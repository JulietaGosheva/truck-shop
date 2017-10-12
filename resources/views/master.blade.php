<DOCTYPE html>
<html>
	<head>
		
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/container.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/navigation.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/sideNavigation.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/footer.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/main.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/common.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/header.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/filters.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/product.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/product-details.css" />
		
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		
		<script type="text/javascript" src="http://localhost/truck-shop/resources/assets/css/sideNavigation.js"></script>
	<head>
	
	<body style="background-color: #f2f2f2">
		<div class="container" id="container">
			
			<header class="header">
				<div class="logo">
					<a href="http://localhost/truck-shop">
						<img src="http://localhost/truck-shop/resources/assets/images/logo2.jpg"/>
					</a>
				</div>
				<div class="links">
					<a href="#">За нас</a>
					<span class="fa fa-ellipsis-v"></span>
					<a href="#">Контакти</a>
				</div>
				<div class="phone">
					<span class="fa fa-mobile"></span> +359 889 89 87 98
				</div>
			</header>
			
			<nav class="navigation BottomMargin15px">
				<a class="menu" href="javascript:void(0);" onclick="openSideNavigation()">Меню</a>
				<input type="text" name="search" \> <button class="submit"><span class="fa fa-search"></span></button>
				<a href="#registration" class="registration">Регистрация</a>
				<a href="#login" class="login">Вход</a>
			</nav>
			
			<main class="main" id="main" onclick="closeSideNavigation()">
			
				<div id="sideNavigation" class="sideNavigation">
					<a href="javascript:void(0)" class="closeNavigationBtn" onclick="closeSideNavigation()">&times;</a>
					<a href="#">About</a>
					<ul>
						<li><a href="#">Sub menu1</a></li>
						<li><a href="#">Sub menu2</a></li>
						<li><a href="#">Sub menu3</a></li>
					</ul>
					<a href="#">Services</a>
					<a href="#">Clients</a>
					<a href="#">Contact</a>
				</div>

				@yield('filters')
				
				@yield('page-content')
				
			</main>
			<footer class="footer">
				@Copyright RaISug
			</footer>
		</div>
	</body>
<html>