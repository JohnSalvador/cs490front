<?php
include_once("_partials/studentheader.php");
?>
	<div id="inscontainer">
		<div id="overlay"></div>
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
		<section id="welcome" class="shadowbox">
			<h1>Welcome to the NJIT Exam System!</h1>
			<p>
				Integration of technology into the classroom has been constant but at a slow rate. With the advancements of technology
				at hand, instructors and students have learned to adapt these advances in technology to make the academic experience easier.
				This online exam system is targetted for instructors who wish to expedite test creation and test grading.
			</p>
			<p>
				As a student, you are privileged to be able to take an exam with this system! More than likely, your instructor has already given
				you an exam id. Please promptly enter it below:
			</p>
			<input type="text" name="TestID" id="testid">
			<button onclick="takeTest()">Take Test</button>
		</section>

		
	</div>
<?php
include_once("_partials/studentfooter.php");
?>