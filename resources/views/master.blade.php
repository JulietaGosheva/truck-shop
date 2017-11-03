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
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/cart.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/busy-indicator.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/order-dialog.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/login.css" />
		<link rel="stylesheet" type="text/css" href="http://localhost/truck-shop/resources/assets/css/registration.css" />
		
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		
		<script type="text/javascript" src="http://localhost/truck-shop/resources/dependencies/js/jquery-3.2.1.min.js"></script>
		<script type="text/javascript" src="http://localhost/truck-shop/resources/assets/css/sideNavigation.js"></script>
		<script type="text/javascript" src="http://localhost/truck-shop/resources/assets/css/order.js"></script>
		<script type="text/javascript" src="http://localhost/truck-shop/resources/assets/css/cart.js"></script>
	<head>
	
	<body style="background-color: #f2f2f2">

		<div id="busyIndicator" class="busyIndicator">
			<div>
				<img src="http://localhost/truck-shop/resources/assets/gif/loading.gif">
			</div>
		</div>

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
					<span class="fa fa-ellipsis-v"></span>
					<a href="http://localhost/truck-shop/login" class="login">Вход</a>
					<span class="fa fa-ellipsis-v"></span>
					<a href="http://localhost/truck-shop/registration" class="registration">Регистрация</a>
				</div>
				<div class="phone">
					<span class="fa fa-mobile"></span> +359 889 89 87 98<br>
					<span class="fa fa-mobile"></span> +359 889 89 87 98
				</div>

			</header>
			
			<nav class="navigation BottomMargin15px">
				<a class="menu" href="javascript:void(0);" onclick="openSideNavigation()">Меню</a>
				<input type="text" name="search" placeholder="Уникален номер" /> <button class="submit"><span class="fa fa-search"></span></button>
				<div style="float: right; margin-top: -9px; position: relative">
					<a id="cartQuantityCount" href="http://localhost/truck-shop/cart" style="position: absolute; top: 12px; right: 25px;">0</a>
					<a href="http://localhost/truck-shop/cart"><span class="fa fa-opencart fa-2x"></span></a>
				</div>
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

				<div id="successOrderDialog" class="orderDialog">
					Продукта беше успешно добавен към вашата количка!
				</div>

				<div id="failureOrderDialog" class="orderDialog">
					Продукта не беше добавен към вашата количка, поръди възникнала грешка!
				</div>

				<div id="previouslyOrderedDialog" class="orderDialog">
					Продукта е вече добавен към вашата кошница!
				</div>
				
				@yield('page-content')
				
			</main>
			<footer class="footer">
				@Copyright RaISug
			</footer>
			
			<script type="text/javascript" src="http://localhost/truck-shop/resources/assets/css/onstart.js"></script>
		</div>
	</body>
<html>