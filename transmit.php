<?php

function send_curl($postfields) {
	//print_r($postfields);
	
	//mid-end 
	//$url = "http://web.njit.edu/~sj76/cs490beta/mid.php";
	//$url = "http://localhost/cs490/mid.php";
	$url = "http://web.njit.edu/~jbs44/cs490/mid.php";

	$bounce = curl_init();
	curl_setopt($bounce, CURLOPT_URL, $url);
	curl_setopt($bounce, CURLOPT_POST, true);
	curl_setopt($bounce, CURLOPT_POSTFIELDS, http_build_query($postfields));
	curl_setopt($bounce, CURLOPT_RETURNTRANSFER, true);

	$response = curl_exec($bounce);
	//echo '<h1>'.$response.'</h1>';
	curl_close($bounce);

	//echo $response;
	return $response;
}

//Build array with all variables
$array=array();

if(isset($_POST['mode'])&&!empty($_POST['mode'])) $array['mode'] = $_POST['mode'];
//login variables
if(isset($_POST['username'])&&!empty($_POST['username'])) $array['username']=$_POST['username'];
if(isset($_POST['password'])&&!empty($_POST['password'])) $array['password']=$_POST['password'];
//question variables
if(isset($_POST['QuestionType'])&&!empty($_POST['QuestionType'])) $array['QuestionType']=$_POST['QuestionType'];
if(isset($_POST['Question'])&&!empty($_POST['Question'])) $array['Question']=$_POST['Question'];
if(isset($_POST['CourseType'])&&!empty($_POST['CourseType'])) $array['CourseType']=$_POST['CourseType'];
if(isset($_POST['Choice1'])&&!empty($_POST['Choice1'])) $array['Choice1']=$_POST['Choice1'];
if(isset($_POST['Choice2'])&&!empty($_POST['Choice2'])) $array['Choice2']=$_POST['Choice2'];
if(isset($_POST['Choice3'])&&!empty($_POST['Choice3'])) $array['Choice3']=$_POST['Choice3'];
if(isset($_POST['Choice4'])&&!empty($_POST['Choice4'])) $array['Choice4']=$_POST['Choice4'];
if(isset($_POST['Choice5'])&&!empty($_POST['Choice5'])) $array['Choice5']=$_POST['Choice5'];
if(isset($_POST['Feedback1'])&&!empty($_POST['Feedback1'])) $array['Feedback1']=$_POST['Feedback1'];
if(isset($_POST['Feedback2'])&&!empty($_POST['Feedback2'])) $array['Feedback2']=$_POST['Feedback2'];
if(isset($_POST['Feedback3'])&&!empty($_POST['Feedback3'])) $array['Feedback3']=$_POST['Feedback3'];
if(isset($_POST['Feedback4'])&&!empty($_POST['Feedback4'])) $array['Feedback4']=$_POST['Feedback4'];
if(isset($_POST['Feedback5'])&&!empty($_POST['Feedback5'])) $array['Feedback5']=$_POST['Feedback5'];
if(isset($_POST['Answer'])&&!empty($_POST['Answer'])) $array['Answer']=$_POST['Answer'];
//Test Variables
if(isset($_POST['TeacherID'])&&!empty($_POST['TeacherID'])) $array['TeacherID']=$_POST['TeacherID'];
if(isset($_POST['NumberOfQuestions'])&&!empty($_POST['NumberOfQuestions'])) $array['NumberOfQuestions']=$_POST['NumberOfQuestions'];
if(isset($_POST['QuestionIDs'])&&!empty($_POST['QuestionIDs'])) $array['QuestionIDs']=$_POST['QuestionIDs'];
if(isset($_POST['TestName'])&&!empty($_POST['TestName'])) $array['TestName']=$_POST['TestName'];
//Showing/Taking Test
if(isset($_POST['TestID'])&&!empty($_POST['TestID'])) $array['TestID']=$_POST['TestID'];
//Submitting Answers
if(isset($_POST['StudentID'])&&!empty($_POST['StudentID'])) $array['StudentID']=$_POST['StudentID'];
if(isset($_POST['AnswerID'])&&!empty($_POST['AnswerID'])) $array['AnswerID']=$_POST['AnswerID'];
//if(isset($_POST[''])&&!empty($_POST[''])) $array['']=$_POST[''];


//send the mode and array to mid, $test has response
$test = send_curl($array);
echo $test;
?>