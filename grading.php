<?php
include_once("_partials/teacherheader.php");
?>
	<div id="inscontainer">
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
					<button onclick="submitCorrections();">Submit Correction</button>
				</span>
		</div>
		<div id="overlay"></div>
		<div id="gradecontainer">
			<section id="ungraded" class="shadowbox">
				<ul></ul>
			</section>
			<section id="ungradedanswers" class="shadowbox"></section>
		</div>
	</div>
	

	<script>
		$(document).ready(function(){
			getUngradedTest();
		});
	</script>
<?php
include_once("_partials/teacherfooter.php");
?>