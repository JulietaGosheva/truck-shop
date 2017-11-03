@extends('master')

@section('page-content')

	<div align="center">
		<div style="margin-top: 100px; margin-bottom: 150px;">
			<form method="POST" action="http://localhost/truck-shop/client/authentication">
				<table class="login-table">
					<tr>
						<td style="font-family: Arial; text-align: center">ВХОД</td>
					</tr>
					<tr>
						<td><input id="email" type="email" name="email" placeholder="Имейл адрес" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input id="password" type="password" name="password" placeholder="Парола" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input id="login-button" type="submit" value="ВХОД" /></td>
					</tr>
				</table>
			</form>
		</div>
	</div>

	<script>
		(function(){
			var emailField = document.getElementById("email");
			var passwordField = document.getElementById("password");

			setTimeout(function() {
				emailField.value = "";
				passwordField.value = "";
			}, 1000);
		})()
	</script>
@endsection