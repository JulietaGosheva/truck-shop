<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Грешка</title>
	</head>
	<body>
		Възникнала грешка: {{ $excpetionMessage }}. Статус на грешката: {{ $statusCode }}.
		Път към началната страница: {!! $baseUrl !!}.
	</body>
</html>