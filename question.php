<?php
include_once("_partials/teacherheader.php");
?>
<div id="questioncontainer" class="shadowbox">
	<span id="submitting" class="questionerrors">Submitting</span>
	<span id="noquestion" class="questionerrors">Please enter a question before submitting!</span>
	<span id="submitted" class="questionerrors">Question is submitted!</span>
	<form id="questionform" action="transmit.php" method="post">
		Question:<br/>
		<textarea name="Question" id="question" cols="50" rows="10"></textarea><br />
		<br/>
		Question Type:<br/>
		<input type="radio" name="QuestionType" value="1"> Multiple Choice<br/>
		<input type="radio" name="QuestionType" value="2">True or False<br/>
		<input type="radio" name="QuestionType" value="3"> Fill in the Blank<br/>
		<input type="radio" name="QuestionType" value="4">Open Ended<br/>
		<br/>
		Course:<br/>
		<input type="text" name="CourseType" id="course"><br/>
		<br/>
		Choices:<br/>
		If Multiple Choice, enter the choices from #1-#5. If True or False, enter Choice#1 as True and Choice#2 as False.If Fill in the Blank, enter in Choice#1 the answer. If open ended, enter the ideas and main points that needed to be addressed to answer the question.<br/>
		Choice#1: <input type="text" name="Choice1"><br/>
		Choice#2: <input type="text" name="Choice2"><br/>
		Choice#3: <input type="text" name="Choice3"><br/>
		Choice#4: <input type="text" name="Choice4"><br/>
		Choice#5: <input type="text" name="Choice5"><br/>
		<br/>
		Feedback:<br/>
		If Multiple Choice, enter feedback for each choices. If True or False, enter why True or False is not correct in Feedback#1 and #2. If Fill in the blank, enter the explanation why Choice#1 is the answer. If open ended, enter how the ideas and main points should be addressed in answering the question.<br/>
		Feedback1: <input type="text" name="Feedback1"><br/>
		Feedback2: <input type="text" name="Feedback2"><br/>
		Feedback3: <input type="text" name="Feedback3"><br/>
		Feedback4: <input type="text" name="Feedback4"><br/>
		Feedback5: <input type="text" name="Feedback5"><br/>
		<br/>
		Answer: <input type="text" name="Answer"><br/>
		If Multiple Choice, enter A for Choice#1, B for Choice#2... and so on. If True or False, enter T if True, or F if false. If fill in the blank and open ended, leave blank.<br/>

		<button type="button" id="loginbutton" onClick="submitQuestion()">Submit Question</button><br/>
		<input type="hidden" name="mode" value="submitQuestion">
	</form>
</div>

<?php
include_once("_partials/teacherfooter.php");
?>
