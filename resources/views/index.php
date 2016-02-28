<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Авточасти</title>
		
		<script src="resources/dependencies/js/jquery-2.1.3.min.js"></script>
		<script src="resources/dependencies/external/chosen/chosen.jquery.js"></script>
	    <script src="resources/dependencies/external/bootstrap/bootstrap.min.js"></script>
		
		<script src="resources/dependencies/js/angular.min.js"></script>
		<script src="resources/dependencies/js/angular-route.min.js"></script>
		<script src="resources/dependencies/js/angular-sanitize.min.js"></script>
        <script src="resources/dependencies/js/ui-bootstrap-tpls-0.14.3.min.js"></script>
		
		<script src="resources/assets/js/ClientController.js"></script>
		
		<script src="resources/common/js/Registry.js"></script>
        <script src="resources/common/js/FunctionDefinition.js"></script>

		<script src="resources/assets/js/modules/ClientCache.js"></script>        
        <script src="resources/assets/js/modules/NavigationUtil.js"></script>
        
        <script src="resources/assets/js/ClientModules.js"></script>
        <script src="resources/common/js/modules/HeaderUtil.js"></script>
        <script src="resources/common/js/modules/RestClient.js"></script>
        <script src="resources/common/js/modules/AjaxClient.js"></script>
        <script src="resources/common/js/modules/DestinationUtil.js"></script>
        
        <script src="resources/assets/js/controllers/SearchController.js"></script>
        <script src="resources/assets/js/controllers/TemplateController.js"></script>
        <script src="resources/assets/js/controllers/ArticalsController.js"></script>
        <script src="resources/assets/js/controllers/DetailsController.js"></script>
        <script src="resources/assets/js/controllers/CarouselController.js"></script>
		
		<link rel="stylesheet" href="resources/dependencies/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="resources/dependencies/css/bootstrap-theme.css"></link>
		
		<link rel="stylesheet" href="resources/common/css/application.css"></link>
        
        <link rel="stylesheet" href="resources/dependencies/css/font-awesome.min.css"></link>
	</head>
	<body>
		<div class="application-content" ng-app="AngularApplication">

			<div ng-include="'resources/assets/html/templates/template.html'"></div>
			<div class="single-view-content">
                <div class="content-container col-sm-10">
        			<div ng-view></div>
			    </div>
               
				<div class="container"></div>
			</div>
			<div ng-include="'resources/assets/html/templates/footer.html'"></div>
			
			<div class="modal fade" id="wait-modal">
			    <div class="modal-dialog">
			        <div class="modal-content">
			            <div class="modal-header">
			                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			                <h4 class="modal-title" id="modal_label">Моля изчакайте</h4>
			            </div>
			            <div class="modal-body">
			                Зарежда...
			            </div>
			        </div>
			    </div>
			</div>
		</div>
	</body>
</html>