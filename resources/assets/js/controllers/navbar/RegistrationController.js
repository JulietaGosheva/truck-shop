(function() {

	/* ============ Variables and Constructor ============= */
	
	var RestClient = null;
	var DestinationUtil = null;
	
	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();

	var module = angular.module(clientModules.getClientControllerName());
	
	var RegistrationController = function ($scope, $http) {
		initModel($scope);
		
		RestClient = registry.getReference(clientModules.getRestClientName(), $http);
		DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
		
		registry.getReference(clientModules.getTemplateUtilName()).setBreadcrumb({ displayName: "Регистрация" });
	};

	var initModel = function($scope) {
		$scope.isValidEmail = false;
		$scope.isPrivatePerson = true;
		$scope.isValidPassword = false;
		$scope.isValidLastName = false;
		$scope.isButtonDisabled = true;
		$scope.isValidFirstName = false;
		$scope.isValidObjectName = false;
		$scope.isPasswordConfirmed = false;
		$scope.checkEmail = jQuery.proxy(checkEmail, $scope);
		$scope.checkPassword = jQuery.proxy(checkPassword, $scope);
		$scope.checkLastName = jQuery.proxy(checkLastName, $scope);
		$scope.checkFirstName = jQuery.proxy(checkFirstName, $scope);
		$scope.executeRequest = jQuery.proxy(registerClient, $scope);
		$scope.checkObjectName = jQuery.proxy(checkObjectName, $scope);
		$scope.updateObjectFieldState = jQuery.proxy(updateObjectFieldState, $scope);
		$scope.checkConfirmedPassword = jQuery.proxy(checkConfirmedPassword, $scope);
	};
	
	module.controller('RegistrationController', ["$scope", "$http", RegistrationController]);
	
	/* ================ onBlur change events ================ */
	
	var checkEmail = function($event) {
		addErrorClass("#emailFieldId");
		
		var currentTarget = $event.currentTarget;
		if (typeof currentTarget === "undefined") {
			this.isValidEmail = false;
			updateButtonState.call(this);
			return;
		}
		
		var email = currentTarget.value;
		if (typeof email === "undefined") {
			this.isValidEmail = false;
			updateButtonState.call(this);
			return;
		}
		
		var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (emailPattern.test(email) === false) {
			this.isValidEmail = false;
			updateButtonState.call(this);
			return;
		}
		
		this.isValidEmail = true;
		updateButtonState.call(this);
		addSuccessClass("#emailFieldId");
	};
	
	var checkPassword = function($event) {
		addErrorClass("#passwordFieldId");
		
		var currentTarget = $event.currentTarget;
		if (typeof currentTarget === "undefined") {
			this.isValidPassword = false;
			updateButtonState.call(this);
			return;
		}
		
		var password = currentTarget.value;
		if (typeof password === "undefined") {
			this.isValidPassword = false;
			updateButtonState.call(this);
			return;
		}
		
		if (password.length < 6) {
			this.isValidPassword = false;
			updateButtonState.call(this);
			return;
		}
		
		this.isValidPassword = true;
		updateButtonState.call(this);
		addSuccessClass("#passwordFieldId");
	};
	
	var checkConfirmedPassword = function($event) {
		addErrorClass("#confirmPasswordFieldId");
		
		var currentTarget = $event.currentTarget;
		if (typeof currentTarget === "undefined") {
			this.isPasswordConfirmed = false;
			updateButtonState.call(this);
			return;
		}
		
		var confirmedPassword = currentTarget.value;
		if (typeof confirmedPassword === "undefined") {
			this.isPasswordConfirmed = false;
			updateButtonState.call(this);
			return;
		}
		
		if (this.isValidPassword === false) {
			this.isPasswordConfirmed = false;
			updateButtonState.call(this);
			return;
		}
		
		if (this.password !== confirmedPassword) {
			this.isPasswordConfirmed = false;
			updateButtonState.call(this);
			return;
		}
		
		this.isPasswordConfirmed = true;
		updateButtonState.call(this);
		addSuccessClass("#confirmPasswordFieldId");
	};

	var checkFirstName = function($event) {
		addErrorClass("#firstNameFieldId");
		
		var currentTarget = $event.currentTarget;
		if (typeof currentTarget === "undefined") {
			this.isValidFirstName = false;
			updateButtonState.call(this);
			return;
		}
		
		var firstName = currentTarget.value;
		if (typeof firstName === "undefined") {
			this.isValidFirstName = false;
			updateButtonState.call(this);
			return;
		}
		
		if (firstName.length === 0) {
			this.isValidFirstName = false;
			updateButtonState.call(this);
			return;
		}
		
		this.isValidFirstName = true;
		updateButtonState.call(this);
		addSuccessClass("#firstNameFieldId");
	};

	var checkLastName = function($event) {
		addErrorClass("#lastNameFieldId");
		
		var currentTarget = $event.currentTarget;
		if (typeof currentTarget === "undefined") {
			this.isValidLastName = false;
			updateButtonState.call(this);
			return;
		}
		
		var lastName = currentTarget.value;
		if (typeof lastName === "undefined") {
			this.isValidLastName = false;
			updateButtonState.call(this);
			return;
		}
		
		if (lastName.length === 0) {
			this.isValidLastName = false;
			updateButtonState.call(this);
			return;
		}
		
		this.isValidLastName = true;
		updateButtonState.call(this);
		addSuccessClass("#lastNameFieldId");
	};
	
	var checkObjectName = function($event) {
		addErrorClass("#objectNameFieldId");
		
		if (this.isPrivatePerson === true) {
			this.isValidObjectName = true;
			updateButtonState.call(this);
			return;
		}
		
		var currentTarget = $event.currentTarget;
		if (typeof currentTarget === "undefined") {
			this.isValidObjectName = false;
			updateButtonState.call(this);
			return;
		}
		
		var objectName = currentTarget.value;
		if (typeof objectName === "undefined") {
			this.isValidObjectName = false;
			updateButtonState.call(this);
			return;
		}
		
		if (objectName.length === 0) {
			this.isValidObjectName = false;
			updateButtonState.call(this);
			return;
		}
		
		this.isValidObjectName = true;
		updateButtonState.call(this);
		addSuccessClass("#objectNameFieldId");
	};
	
	var updateObjectFieldState = function($event) {
		updateButtonState.call(this);

		if (this.isPrivatePerson) {
			this.objectName = "";
			this.isValidObjectName = false;
			removeAllSpecialClasses("#objectNameFieldId");
			return;
		}

		addErrorClass("#objectNameFieldId");
		addFeedbackClass("#objectNameFieldId");
	};
	
	var updateButtonState = function() {
		this.isButtonDisabled = (this.isValidEmail === false || this.isValidPassword === false
			|| this.isPasswordConfirmed === false || this.isValidFirstName === false || this.isValidLastName === false
			|| (this.isPrivatePerson === false && this.isValidObjectName === false));
	};
	
	/* ================ make up functions ================ */
	
	var removeAllSpecialClasses = function(fieldId) {
		jQuery(fieldId).removeClass("has-success has-error has-feedback");
	};
	
	var addSuccessClass = function(fieldId) {
		jQuery(fieldId).removeClass("has-error").addClass("has-success");
	};
	
	var addFeedbackClass = function(fieldId) {
		jQuery(fieldId).removeClass("has-feedback").addClass("has-feedback");
	};
	
	var addErrorClass = function(fieldId) {
		jQuery(fieldId).removeClass("has-success").addClass("has-error");
	};
	
	/* ================ Backend AJAX requests ================ */
	
	var registerClient = function() {
		var requestData = prepareRequestData.call(this);
		RestClient.POST(requestData, jQuery.proxy(onSucces, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function() {
		var requestData = {
			email: this.email,
			password: this.password,
			lastname: this.lastName,
			firstname: this.firstName,
			confirmedPassword: this.confirmedPassword,
			objectName: this.isPrivatePerson ? undefined : this.objectName
		};
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method: "POST",
			headers: headers,
			data: requestData,
			url: DestinationUtil.getUserRegistrationEndpoint()
		};
	};
	
	var onSucces = function(xhrResponse) {
		location.hash = "#/";
	};
	
	var onError = function(xhrResponse) {
		$("#result-modal-label").text("Неуспешен регистрация.");
		$("#result-modal-body").text("Извиняваме се за неудобството, но не успяхме да ви регистрираме в системата. Моля опитайте пак.");
		$('#result-modal').modal({ keyboard: true });
	};
	
})();