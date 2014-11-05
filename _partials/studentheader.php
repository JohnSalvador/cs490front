<?php
/*
if(isset($_COOKIE['serverCookie'])&&isset($_COOKIE['user'])&&isset($_COOKIE['type']))
	verifyCookie();
else header('Location: index.php');
*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Student - Exam System</title>
	<link rel="stylesheet" href="style.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
</head>
<body>
	<nav id="top">
		<ul>
			<li><a href="student.php?ID=<?php echo $_GET['ID']?>" class="shadowbox navbutton">Home</a></li>
			<li><a href="grades.php?ID=<?php echo $_GET['ID']?>" class="shadowbox navbutton">Check Grades</a></li>
			<li><a href="" class="shadowbox navbutton">Previous Exams</a></li>
		</ul>
		<div id="usersection"><!--Logged in as <span id="username"></span> -->
			<button id="logout" class="shadowbox menubutton" onClick="submitLogout()">Logout</button>
		</div>
	</nav>