var xmlHttpSubmitQuestion = createXmlHttpRequestObject();
var xmlHttpBrowseQuestion = createXmlHttpRequestObject();
var xmlHttpTest = createXmlHttpRequestObject();
var xmlHttpUngradedTest = createXmlHttpRequestObject();
var xmlHttpUngradedAnswer = createXmlHttpRequestObject();
var xmlHttpFetchTestAnswer = createXmlHttpRequestObject();
var xmlHttpSubmitCorrections = createXmlHttpRequestObject();



function submitLogout() {
	//eatCookies();
	$('body').fadeOut(200, function(){
		window.location.assign("index.php");
	});
}

//AJAX Object Creator function
function createXmlHttpRequestObject() {
	var xmlHttp;
	
	try {
		xmlHttp = new XMLHttpRequest();
	} catch(e) {
		var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.5.0",
										"MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0",
										"MSXML2.XMLHTTP","Microsoft.XMLHTTP");
		for(var i=0;i<XmlHttpVersions.length && !xmlHttp; i++) {
			try{
				xmlHttp = new ActiveXObject(XmlHttpVersions[i]);	
			} catch(e){}
		}
	}
	
	if(!xmlHttp)
		alert("Error creating the XMLHttpRequest Object.");
	else
		return xmlHttp;
}
function submitQuestion() {
	$('span.questionerrors').fadeOut(100);
	if($('textarea#question').val()&&$('input#course').val()) {

		if(xmlHttpSubmitQuestion) {
			try{
				parameter = $('form#questionform').serialize();
				console.log('parameters: '+parameter);
				xmlHttpSubmitQuestion.open("POST", "transmit.php",true);
				xmlHttpSubmitQuestion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xmlHttpSubmitQuestion.onreadystatechange = handleSubmitQuestionResponse;

				xmlHttpSubmitQuestion.send(parameter);
			} catch(e) {
				throwError(e);
			}
		} else {
			alert('Error using AJAX to Submit Question');
		}
	} else {
		$('span#noquestion').fadeIn(700);
		//console.log($('input#question').val()+' '+$('input#course').val());
	}
}

function handleSubmitQuestionResponse() {
	//console.log('test2');
	if(xmlHttpSubmitQuestion.readyState==4&&xmlHttpSubmitQuestion.status==200) {
		try{
			console.log(xmlHttpSubmitQuestion.readyState+' '+xmlHttpSubmitQuestion.status);
			console.log(xmlHttpSubmitQuestion.responseText);
			response = JSON.parse(xmlHttpSubmitQuestion.responseText);
			//console.log('response= '+response);
			if(response.answer) {
				//console.log(response);
				$('span#submitted').fadeIn(700);
				$('span#submitted').fadeOut(2000);
				$('form#questionform')[0].reset();
			} else {
				alert('Error submitting question into the database');
			}
		} catch(e) {
			throwError(e);
		}
	}
}

var timedID=0;
function timedBrowseQuestion() {
	clearTimeout(timedID);
	timedID=setTimeout(browseQuestion,500);
}

function browseQuestion() {
	console.log('browsing...');
	console.log($("input#course").val());
	if($("input#course").val()) {
		if(xmlHttpBrowseQuestion) {
			try{
				var parameter = 'CourseType='+document.getElementById('course').value
					+'&mode=browseQuestion';

				console.log('parameters are '+parameter);
				xmlHttpBrowseQuestion.open("POST","transmit.php", true);
				xmlHttpBrowseQuestion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpBrowseQuestion.onreadystatechange = handleBrowseQuestionResponse;
				
				xmlHttpBrowseQuestion.send(parameter);
				//console.log('test1');
			} catch(e) {
				throwError(e);
			}
		}
		else {
			alert('Error using AJAX to Browse Questions');
		}
	}
	
}

function handleBrowseQuestionResponse() {
	if(xmlHttpBrowseQuestion.readyState==4&&xmlHttpBrowseQuestion.status==200) {
		try{
			//console.log(xmlHttpBrowseQuestion.readyState+' '+xmlHttpBrowseQuestion.status);
			//console.log(xmlHttpBrowseQuestion.responseText);
			response = JSON.parse(xmlHttpBrowseQuestion.responseText);
			//console.log('response= '+response);
			if(response) {
				//console.log('Response is '+response);
				displayQuestions(response);
			}
		} catch(e) {
			throwError(e);
		}
	}
}

function displayQuestions(resp) {
	var questiontable = document.getElementById('questiontable');
	questiontable=questiontable.childNodes[1];
	while(questiontable.childNodes[1]) questiontable.childNodes[1].remove();
	

	for(var i=0; i<resp.length;i++) {
		var row=document.createElement('tr');

		var selected=document.createElement('td');
		selected.innerHTML='<input type="checkbox" class="questionnumber" onclick="updateSelectedQuestions(this)" name="questionnumber" value="'+resp[i].QuestionID+'">';
		var questionid=document.createElement('td');
		questionid.appendChild(document.createTextNode(resp[i].QuestionID));
		var question=document.createElement('td');
		question.appendChild(document.createTextNode(resp[i].Question));
		var answer=document.createElement('td');
		var outputanswer;
		switch(resp[i].QuestionType) {
			case "1":
				outputanswer=resp[i].Answer;
				break;
			case "2":
				outputanswer=resp[i].Answer;
				break;
			case "3":
				outputanswer=resp[i].Choice1;
				break;
			case "4":
				outputanswer=resp[i].Choice1+', '+resp[i].Choice2+', '+resp[i].Choice3+', '+
					resp[i].Choice4+', '+resp[i].Choice5;
		}
		answer.appendChild(document.createTextNode(outputanswer));

		row.appendChild(selected);
		row.appendChild(questionid);
		row.appendChild(question);
		row.appendChild(answer);
		questiontable.appendChild(row);
		//console.log(resp[i].QuestionType);
	}
}

var selectedQuestions=[];
function updateSelectedQuestions(inp) {
	//var checkboxes=document.getElementsByClassName('questionnumber');
	if(selectedQuestions.indexOf(inp.value)<=-1) {
		selectedQuestions.push(inp.value);
	} else {
		selectedQuestions.splice(selectedQuestions.indexOf(inp.value),1)
	}
	console.log(selectedQuestions);
	var selectedquestion=document.getElementById('selectedquestion');
	
	selectedquestion.value=selectedQuestions;

}

//SubmitTest
function submitTest() {
	if($('textarea#selectedquestion').val()) {
		//console.log('true somehow');
		if(xmlHttpTest) {
			try{
				var teacherid=GETvar();
				var parameter = 'QuestionIDs='+JSON.stringify(selectedQuestions)
					+'&TeacherID='+GETvar()['ID']+'&NumberOfQuestions='+selectedQuestions.length
					+'&TestName='+document.getElementById('testname').value+'&mode=registerTest';
				
				console.log('parameters are '+parameter);
				xmlHttpTest.open("POST","transmit.php", true);
				xmlHttpTest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpTest.onreadystatechange = handleTestResponse;
				
				xmlHttpTest.send(parameter);
				//console.log(GETvar());
			} catch(e) {
				throwError(e);
			}
		}
		else {
			alert('Error using AJAX to Submit the Test');
		}
	} else {
		console.log('Please enter questions to register as test');
	}
}
function handleTestResponse() {
	//console.log('test2');
	if(xmlHttpTest.readyState==4&&xmlHttpTest.status==200) {
		try{
			console.log(xmlHttpTest.readyState+' '+xmlHttpTest.status);
			console.log(xmlHttpTest.responseText);
			response = JSON.parse(xmlHttpTest.responseText);
			//console.log('response= '+response);
			if(response.answer) {
				console.log(response);
				showTest(response.TestID);
			}
		} catch(e) {
			throwError(e);
		}
	}
}

//Getting UngradedTests
function getUngradedTest() {
	var id=GETvar()['ID'];
	if(id) {
		if(xmlHttpUngradedTest) {
			try{
				var parameter = 'mode=getUngradedTest&TeacherID='+id;
				console.log('UngradedTest parameter: '+parameter);
				xmlHttpUngradedTest.open("POST", "transmit.php", true);
				xmlHttpUngradedTest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpUngradedTest.onreadystatechange = handleUngradedTestResponse;

				xmlHttpUngradedTest.send(parameter);
			} catch(e) {
				throwError(e);
			}
		}
	} else {
		alert('Please check if you are correctly logged in');
	}

}
function handleUngradedTestResponse() {
	if(xmlHttpUngradedTest.readyState==4&&xmlHttpUngradedTest.status==200) {
		try{
			var ungraded=document.getElementById('ungraded').childNodes[1];
			//console.log(ungraded);
			response = JSON.parse(xmlHttpUngradedTest.responseText);
			console.log(response);
			if(response) {
				ungraded.innerHTML="<h5>UngradedTest</h5>";
				for(var i=0; i<response.length; i++) {
					var ungradedelem=document.createElement('li');
					ungradedelem.className="testelem";
					ungradedelem.innerHTML='<button value="'+response[i]
						+'" onclick="getUngradedAnswer(this)"> View Test #'+response[i]+'</button>';
					ungraded.appendChild(ungradedelem);
				}
			} else {
				ungraded.innerHTML="You have no ungraded Exams";
			}
		} catch(e) {
			throwError(e);
		}
	}
}
var ut=0;
function getUngradedAnswer(t) {
	//console.log(t.value);
	ut=t.value;
	if(t) {
		if(xmlHttpUngradedAnswer) {
			try{
				//console.log(ut);
				var parameter = 'mode=getUngradedAnswer&TestID='+ut;
				console.log('UngradedAnswer parameter: '+parameter);
				xmlHttpUngradedAnswer.open("POST", "transmit.php", true);
				xmlHttpUngradedAnswer.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpUngradedAnswer.onreadystatechange = handleUngradedAnswerResponse;

				xmlHttpUngradedAnswer.send(parameter);
			} catch(e) {
				throwError(e);
			}
		}
	} else {
		alert('Something went wrong with grading.');
	}
}
function handleUngradedAnswerResponse() {
	if(xmlHttpUngradedAnswer.readyState==4&&xmlHttpUngradedAnswer.status==200) {
		try{
			response = JSON.parse(xmlHttpUngradedAnswer.responseText);
			if(response) {
				var ungradedanswers=document.getElementById('ungradedanswers');
				while(ungradedanswers.childNodes[0]) ungradedanswers.childNodes[0].remove();
				for(key in response) {
					//console.log(response[key]===false);
					if(response[key]===false) {
						ungradedanswers.innerHTML="<h3>No ungraded answers from this test</h3>";
					} else {
						var answerselem = document.createElement('li');
						answerselem.className = "answerelem";
						answerselem.innerHTML='<button value="'+response[key]
							+'" onclick="fetchTestAnswer(this)">Grade Answer #'+response[key]+'</button>';
						ungradedanswers.appendChild(answerselem);
					}
				}
			} else {
				alert('Unfortunately, there was an error fetching the answers');
			}
		} catch(e) {
			throwError(e);
		}
	}
}
var ua=0;
function fetchTestAnswer(t) {
	//console.log(t);
	ua=t.value;
	if(ua) {
		if(xmlHttpFetchTestAnswer) {
			try{
				//console.log(ut);
				var parameter = 'mode=fetchTestAnswer&TestID='+ut+'&AnswerID='+ua;
				console.log('FetchTestAnswer parameter: '+parameter);
				xmlHttpFetchTestAnswer.open("POST", "transmit.php", true);
				xmlHttpFetchTestAnswer.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpFetchTestAnswer.onreadystatechange = handleFetchTestAnswerResponse;

				xmlHttpFetchTestAnswer.send(parameter);
			} catch(e) {
				throwError(e);
			}
		}
	} else {
		alert('Something went wrong with grading.');
	}
}
function handleFetchTestAnswerResponse() {
	if(xmlHttpFetchTestAnswer.readyState==4&&xmlHttpFetchTestAnswer.status==200) {
		try{
			response = JSON.parse(xmlHttpFetchTestAnswer.responseText);
			if(response) {
				//console.log(response);
				displayGrading(response);
			} else {
				alert('No response from database while asking for test!');
			}
		} catch(e) {
			throwError(e);
		}
	}
}
//Seeing corrections
var correction={};
function displayGrading(resp) {
	console.log(resp);
	var questionqueue = document.getElementById('questionqueue').childNodes[1];
	while(questionqueue.childNodes[0]) questionqueue.childNodes[0].remove();
	var questionbox = document.getElementById('questionbox');
	while(questionbox.childNodes[0]) questionbox.childNodes[0].remove();
	correction={}
	var testinfo = document.createElement('h2');
	correction['TestID']=resp[0].TestID;
	testinfo.innerHTML=resp[0].TestName+' - TestID: '+resp[0].TestID;
	testinfo.id="test";
	testinfo.className=resp[0].TestID;
	questionbox.appendChild(testinfo);
	var answerinfo = document.createElement('p');
	correction['AnswerID']=resp[1].AnswerID;
	correction['StudentID']=resp[1].StudentID;
	answerinfo.innerHTML='Answer: '+resp[1].AnswerID+' by Student: '+resp[1].StudentID;
	answerinfo.id="answer";
	answerinfo.className = resp[1].AnswerID;
	questionbox.appendChild(answerinfo);
	var qcount=1;
	console.log(resp[0]);
	for(key in resp[0]) {
		if(resp[0][key].QuestionID) {
			correction['Ans'+resp[0][key].QuestionID]="";
			var qnumbercontainer=document.createElement('li');
			qnumbercontainer.className="qqn "+resp[0][key].QuestionID;
			qnumbercontainer.innerHTML='<label><input type="radio" value="'+resp[0][key].QuestionID
				+'" name="questionref"> '+qcount+'</label>';
			questionqueue.appendChild(qnumbercontainer);
			qcount++;
			var questioncontainer = document.createElement('div');
			questioncontainer.className="shadowbox questioninnerbox";
			questioncontainer.id=resp[0][key].QuestionID;
			questioncontainer.innerHTML='<p>'+resp[0][key].Question+'</p>';
			var qpiece='';
			switch(resp[0][key].QuestionType) {
				case "1":
					qpiece='Student\'s Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Correct Answer: '+resp[0][key].Answer;
					break;
				case "2":
					qpiece='Student\'s Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Correct Answer: '+resp[0][key].Answer;
					break;
				case "3":
					qpiece='Student\'s Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Needs to address: '+resp[0][key].Choice1+'<br><span class="correction">';
					qpiece+='<input type="radio" name="Correction['+resp[0][key].QuestionID
						+']" value="1" onclick="updateCorrection(this)" class="'+resp[0][key].QuestionID
						+'"> Satisfactory <br />';
					qpiece+='<input type="radio" name="Correction['+resp[0][key].QuestionID
						+']" value="0" onclick="updateCorrection(this)" class="'+resp[0][key].QuestionID
						+'"> Unsatisfactory <br />';
					qpiece+='</span>';
					break;
				case "4":
					qpiece='Student\'s Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Needs to address: '+resp[0][key].Choice1+', '+resp[0][key].Choice2
						+', '+resp[0][key].Choice3+', '+resp[0][key].Choice4+', '+resp[0][key].Choice5
						+'<br><span class="correction">';
					qpiece+='<input type="radio" name="Correction['+resp[0][key].QuestionID
						+']" value="1" onclick="updateCorrection(this)" class="'+resp[0][key].QuestionID
						+'"> Satisfactory <br />';
					qpiece+='<input type="radio" name="Correction['+resp[0][key].QuestionID
						+']" value="0" onclick="updateCorrection(this)" class="'+resp[0][key].QuestionID
						+'"> Unsatisfactory <br />';
					qpiece+='</span>';
					break;
			}
			questioncontainer.innerHTML+=qpiece;
			questionbox.appendChild(questioncontainer);
		}
		
	}

	console.log(correction);
	$('#overlay').fadeIn(1000);
	$('#testarea').fadeIn(1000);

}
function updateCorrection(t) {
	correction['Ans'+t.className]=t.value;
	console.log(correction);
}
function submitCorrections() {
	if(correction) {
		if(xmlHttpSubmitCorrections) {
			try{
				var parameter = 'mode=submitCorrections&TestID='+correction['TestID']
					+'&AnswerID='+correction['AnswerID']+'&Corrections='+JSON.stringify(correction);
				console.log('SubmitCOrrections parameter: '+parameter);
				xmlHttpSubmitCorrections.open("POST", "transmit.php", true);
				xmlHttpSubmitCorrections.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpSubmitCorrections.onreadystatechange = handleSubmitCorrectionsResponse;

				xmlHttpSubmitCorrections.send(parameter);
			} catch(e) {
				throwError(e);
			}
		}
	} else {
		alert('Please enter a correct test ID');
	}
}
function handleSubmitCorrectionsResponse() {
	if(xmlHttpShowTest.readyState==4&&xmlHttpShowTest.status==200) {
		try{
			response = JSON.parse(xmlHttpShowTest.responseText);
			if(response.answer) {
				alert('This test has been successfully graded!');
			} else {
				alert('No response from database while asking for test!');
			}
		} catch(e) {
			throwError(e);
		}
	}
}

//HYPER MODE
