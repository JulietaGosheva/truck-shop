<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<script type="text/javascript" src="../resources/assets/js/dependencies/angular.min.js"></script>
		<script type="text/javascript" src="../resources/assets/js/dependencies/angular-route.min.js"></script>
		<script src="../resources/assets/js/application.js"></script>
        <script type="text/javascript" src="../resources/assets/js/helper.js"></script>
        <script src="../resources/assets/js/modules/Constants.js"></script>
		<script src="../resources/assets/js/controllers/IndexController.js"></script>
        <script src="../resources/assets/js/controllers/TemplateController.js"></script>
        <script src="../resources/assets/js/controllers/ArticalsController.js"></script>
        <script src="../resources/assets/js/controllers/SubitemsController.js"></script>
		<link rel="stylesheet" href="../resources/assets/css/bootstrap.min.css"></link>
		<link rel="stylesheet" href="../resources/assets/css/application.css"></link>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	</head>
	<body>
		<div class="application-content" ng-app="AngularApplication">

			<div ng-include="'../resources/assets/html/template.html'"></div>
			<div class="single-view-content">
				<div class="container">
				</div>
			</div>
			<div ng-include="'../resources/assets/html/footer.html'"></div>
			
		</div>
	</body>
</html>