<?php
include_once("_partials/teacherheader.php");
?>
<div id="testcontainer">
	<div id="tests" class="shadowbox">
		Test Name:<br />
		<input type="text" name="TestName" id='testname'> <br/>
		Questions selected:<br/>
		<textarea id="selectedquestion" rows="4" cols="8"></textarea><br/>
		<button onclick="submitTest()">Submit Test</button>
	</div>
	<div id="questions" class="shadowbox" onload="timedBrowseQuestion">
		Enter Course Number: <input type="text" name="CourseType" id="course" onkeypress="timedBrowseQuestion()"> 
		<button onclick="browseQuestion()">Search Questions</button>
		<br />
		<table id="questiontable" border="1">
			<tr>
				<th>Selection:</th>
				<th>QuestionID:</th>
				<th>Question:</th>
				<th>Answer:</th>
			</tr>
		</table>
	</div>
	<div id="testarea" class="shadowbox">
		<span class="close">x</span>
		<div id="questionqueue">
			QuestionList:
			<ul></ul>
		</div>
		<div id="questionbox"></div>
		<span id="testbuttons">
			<button ></button>
			<button ></button>
			<button onclick="submitAnswer();">Submit Test</button>
		</span>
	</div>
</div>


<?php
include_once("_partials/teacherfooter.php");
?>