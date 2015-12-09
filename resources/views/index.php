<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Авточасти</title>
		<script src="../resources/dependencies/js/angular.min.js"></script>
		<script src="../resources/dependencies/js/angular-route.min.js"></script>
        <script src="../resources/dependencies/js/ui-bootstrap-tpls-0.14.3.min.js"></script>
		
		<script src="../resources/assets/js/application.js"></script>
        <script src="../resources/assets/js/helper.js"></script>
        <script src="../resources/assets/js/modules/NavigationUtil.js"></script>
        <script src="../resources/assets/js/controllers/SearchController.js"></script>
        <script src="../resources/assets/js/controllers/TemplateController.js"></script>
        <script src="../resources/assets/js/controllers/ArticalsController.js"></script>
        <script src="../resources/assets/js/controllers/DetailsController.js"></script>
        <script src="../resources/assets/js/controllers/CarouselController.js"></script>
		
		<link rel="stylesheet" href="../resources/dependencies/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="../resources/dependencies/css/bootstrap-theme.css"></link>
		
		<link rel="stylesheet" href="../resources/common/css/application.css"></link>
        
        <link rel="stylesheet" href="../resources/dependencies/css/font-awesome.min.css"></link>
	</head>
	<body>
		<div class="application-content" ng-app="AngularApplication">

			<div ng-include="'../resources/assets/html/templates/template.html'"></div>
			<div class="single-view-content">
                <div class="content-container col-sm-10">
        			<div ng-view></div>
			    </div>
               
				<div class="container"></div>
			</div>
			<div ng-include="'../resources/assets/html/templates/footer.html'"></div>
			
		</div>
	</body>
</html>