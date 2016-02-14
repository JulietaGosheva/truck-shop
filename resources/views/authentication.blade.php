<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Администрация</title>
		
        <script src="../../resources/dependencies/js/jquery-2.1.3.min.js"></script>
	    <script src="../../resources/dependencies/external/bootstrap/bootstrap.min.js"></script>
        
		<link rel="stylesheet" href="../../resources/dependencies/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="../../resources/dependencies/css/bootstrap-theme.css"></link>
        
        <link rel="stylesheet" href="../../resources/common/css/application.css"></link>
	</head>
	<body>
		<div class="application-content">

            <!-- create XSRF token request and add it to ajaxSetup so every request will have that token -->

			<div class="single-view-content">
				<div class="container">
				    <div class="page-header" style="text-align: center;">
				        <h1>Вход към администраторският панел</h1>
				    </div>
				    <form class="form-horizontal" method="POST" action="">
				    	{!! csrf_field() !!}

				        <div class="has-error"></div>
				        <div class="form-group">
				            <label for="email" class="col-sm-4 control-label">Електронна поща</label>
				            <div class="col-sm-5">
				                <input type="email" class="form-control" name="email" id="email" placeholder="Електронна поща">
				            </div>
				        </div>
				        
				        <div class="has-error"></div>
				        <div class="form-group">
				            <label for="password" class="col-sm-4 control-label">Парола</label>
				            <div class="col-sm-5">
				                <input type="password" class="form-control" name="password" id="password" placeholder="Парола">
				            </div>
				        </div>
				        
				        <div class="form-group">
				            <div class="col-sm-offset-4 col-sm-8">
				                <button type="submit" class="btn btn-default">Вход</button>
				            </div>
				        </div>
				    </form>
				</div>
			</div>
			
			<?php include base_path("resources/assets/html/templates/footer.html"); ?>

		</div>
	</body>
</html>