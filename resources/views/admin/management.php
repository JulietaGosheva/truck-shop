<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Администрация</title>
		
		<!-- 	============ IMPORTANT NOTE ============
				Move all of this relative links to one blade file
					 which constructs paths with laravel build-in functions -->
					 
        <script src="resources/dependencies/js/jquery-2.1.3.min.js"></script>
		<script src="resources/dependencies/external/chosen/chosen.jquery.js"></script>
	    <script src="resources/dependencies/external/bootstrap/bootstrap.min.js"></script>
            
		<script src="resources/dependencies/js/angular.min.js"></script>
		<script src="resources/dependencies/js/angular-route.min.js"></script>
		<script src="resources/dependencies/js/angular-sanitize.min.js"></script>
        <script src="resources/dependencies/js/ui-bootstrap-tpls-0.14.3.min.js"></script>
        
        <script src="resources/admin/js/AdminController.js"></script>
        <script src="resources/admin/js/ModuleNames.js"></script>
        <script src="resources/common/js/FunctionDefinition.js"></script>
        <script src="resources/common/js/modules/HeaderUtil.js"></script>
        
        <script src="resources/admin/js/controllers/products/ProductCreationController.js"></script>
		<script src="resources/admin/js/controllers/products/DeleteProductController.js"></script>
		<script src="resources/admin/js/controllers/products/EditProductController.js"></script>
		<script src="resources/admin/js/controllers/products/SearchProductController.js"></script>
		<script src="resources/admin/js/controllers/products/ProductDetailsController.js"></script>
		
        <script src="resources/admin/js/controllers/users/UserCreationController.js"></script>
        <script src="resources/admin/js/controllers/users/DeleteUserController.js"></script>
        <script src="resources/admin/js/controllers/users/EditUserController.js"></script>
        <script src="resources/admin/js/controllers/users/SearchUserController.js"></script>
        
        <script src="resources/admin/js/controllers/navigations/NavigationCreationController.js"></script>
        <script src="resources/admin/js/controllers/navigations/DeleteNavigationController.js"></script>
        <script src="resources/admin/js/controllers/navigations/EditNavigationController.js"></script>

        <script src="resources/admin/js/controllers/OrdersController.js"></script>
        <script src="resources/admin/js/controllers/PromotionController.js"></script>
        
        <script src="resources/common/js/modules/RestUtil.js"></script>
        <script src="resources/common/js/modules/AjaxUtil.js"></script>
        <script src="resources/common/js/modules/DestinationUtil.js"></script>
        
        <script src="resources/admin/js/modules/HashHelper.js"></script>
        <script src="resources/admin/js/modules/users/UserRetriever.js"></script>
        <script src="resources/admin/js/modules/products/ProductRetriever.js"></script>
        
		<link rel="stylesheet" href="resources/dependencies/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="resources/dependencies/css/bootstrap-theme.css"></link>
        <link rel="stylesheet" href="resources/dependencies/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="resources/dependencies/external/chosen/chosen.css"></link>
        
        <link rel="stylesheet" href="resources/common/css/application.css"></link>
	</head>
	<body>
		<div class="application-content" ng-app="AdminController">

            <!-- create XSRF token request and add it to ajaxSetup so every request will have that token -->

			<div ng-include="'resources/admin/html/templates/template.html'"></div>
			<div class="single-view-content">
				<div class="container">
                     <div style="padding-top: 25px;" ng-view></div>
				</div>
			</div>
			<div ng-include="'resources/admin/html/templates/footer.html'"></div>

		</div>
	</body>
</html>