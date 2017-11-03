@extends('master')

@section('page-content')

	<div align="center">
		<div style="margin-top: 100px; margin-bottom: 150px;">
			<form method="POST" action="http://localhost/truck-shop/registration">
				<table class="registration-table">
					<tr>
						<td style="font-family: Arial; text-align: center">Регистрационна форма</td>
					</tr>
					<tr>
						<td><input type="email" name="email" placeholder="Имейл адрес" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input type="password" name="password" placeholder="Парола" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input type="password" name="password" placeholder="Потвърдете Парола" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input type="text" name="firstname" placeholder="Име" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input type="text" name="lastname" placeholder="Фамилия" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input type="text" name="objectName" placeholder="Име на фирма" autocomplete="off"/></td>
					</tr>
					<tr>
						<td><input id="registration-button" type="submit" value="Регистрация" /></td>
					</tr>
				</table>
			</form>
		</div>
	</div>

@endsection