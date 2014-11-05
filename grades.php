<?php
include_once("_partials/studentheader.php");
?>
	<div id="inscontainer">
		<div id="testarea" class="shadowbox">
			<span class="close">x</span>
				<div id="questionqueue">
					QuestionList:
					<ul></ul>
				</div>
				<div id="questionbox"></div>
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
			getGradedAnswer();
		});
	</script>
<?php
include_once("_partials/studentfooter.php");
?>