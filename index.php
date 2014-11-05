<!DOCTYPE html>
<!-- 
John Salvador - front end
Shalim Javed - middle end
Vanessa Casanas - back end

Front End files:
index.php, student.php, style.css, scripts.js, transmit.php
-->
<html>
<head>
<meta http-equiv="content-type" content="text/html; "charset="utf-8">
<link rel="stylesheet" href="normalize.css">
<link rel="stylesheet" href="style.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
</head>
<body>
<style type="text/css">

</style>

<section class="container">
<div class="login">
	<section class="login">
  		<h1>NJIT Exam System</h1>
  		<div>
		    <form id='login' action='transmit.php' method='post' style="text-align: center">
		    	<p id='credential'>
			        <label class="credential">Username:</label>
			        <input type="text" name="username" id="user" class="credential" placeholder="username" /><br />
			        <label class="credential">Password:</label>
			        <input type="password" name="password" id="pass" class="credential" placeholder="password" /><br />
		        </p>
	          	System Login: <br />
		        <button type="button" id="loginbutton" onClick="submitLogin()">Login</button><br/>
		        <input type="hidden" name="mode" value="login" />
			    <div id="loginmessage">
				    <span id="nouser">Please enter a Username</span>
				    <span id="invalid">Invalid credentials</span>
				</div>
			</form>
		</div>
    </section>
</div>

<div class="about">
</div>

<script src="scripts.js"></script>
<script>
	$(document).ready(function() {
		$('section.login').slideDown(800);
		console.log('jQuery started!');
	}).keypress(function(e) {
		if(e.which==13) {
			$('#loginbutton').click();
		}
	});
</script>
</body>
</html>

