<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<script src="../resources/assets/js/dependencies/angular.min.js"></script>
		<script src="../resources/assets/js/dependencies/angular-route.min.js"></script>
        <script src="../resources/assets/js/dependencies/ui-bootstrap-tpls-0.14.3.min.js"></script>
		<script src="../resources/assets/js/application.js"></script>
        <script src="../resources/assets/js/helper.js"></script>
        <script src="../resources/assets/js/modules/NavigationUtil.js"></script>
        <script src="../resources/assets/js/controllers/SearchController.js"></script>
        <script src="../resources/assets/js/controllers/TemplateController.js"></script>
        <script src="../resources/assets/js/controllers/ArticalsController.js"></script>
        <script src="../resources/assets/js/controllers/DetailsController.js"></script>
        <script src="../resources/assets/js/controllers/CarouselController.js"></script>
		<link rel="stylesheet" href="../resources/assets/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="../resources/assets/css/bootstrap-theme.css"></link>
		<link rel="stylesheet" href="../resources/assets/css/application.css"></link>
        <link rel="stylesheet" href="../resources/assets/css/font-awesome.min.css"></link>
	</head>
	<body>
		<div class="application-content" ng-app="AngularApplication">

			<div ng-include="'../resources/assets/html/templates/template.html'"></div>
			<div class="single-view-content">
				<div class="container">
				</div>
			</div>
			<div ng-include="'../resources/assets/html/templates/footer.html'"></div>
			
		</div>
	</body>
</html>