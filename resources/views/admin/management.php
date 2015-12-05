<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Администрация</title>
		<script src="../../resources/dependencies/js/angular.min.js"></script>
		<script src="../../resources/dependencies/js/angular-route.min.js"></script>
        <script src="../../resources/dependencies/js/ui-bootstrap-tpls-0.14.3.min.js"></script>
        <script src="../../resources/admin/js/admin.js"></script>
        <script src="../../resources/admin/js/controllers/ProductController.js"></script>
		<link rel="stylesheet" href="../../resources/dependencies/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="../../resources/dependencies/css/bootstrap-theme.css"></link>
        <link rel="stylesheet" href="../../resources/dependencies/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="../../resources/assets/css/application.css"></link>
	</head>
	<body>
		<div class="application-content" ng-app="AdminController">

            <!-- create XSRF token request and add it to ajaxSetup so every request will have that token -->

			<div ng-include="'../../resources/admin/html/templates/template.html'"></div>
			<div class="single-view-content">
				<div class="container">
                     <div style="padding-top: 25px;" ng-view></div>
				</div>
			</div>
			<div ng-include="'../../resources/admin/html/templates/footer.html'"></div>

		</div>
	</body>
</html>