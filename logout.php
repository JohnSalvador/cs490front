<?php
setcookie("serverCookie", "", time()-1);
setcookie("user", "", time()-1);
setcookie("type", "", time()-1);
header("Location: index.php");
?>