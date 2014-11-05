//AJAX Objects
var xmlHttpLogin = createXmlHttpRequestObject();
var xmlHttpGradedAnswer = createXmlHttpRequestObject();
var xmlHttpFetchAnswerFeedback = createXmlHttpRequestObject();

//Variables
var response = [];
//alert('testing');
function throwError(e) {
	alert(e.toString()+'\nOn line... '+e.lineNumber+'\non file... '+e.fileName);
}
function GET() {
    var getvar = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*?)[#.]/gi, function(m,key,value) {
        getvar[key] = value;
    });
    return getvar;
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

//Login AJAX
function submitLogin() {
	$('span#nouser').fadeOut(100);
	$('span#invalid').fadeOut(100);
	if($('input#user').val()) {
		//console.log('true somehow');
		if(xmlHttpLogin) {
			try{
				var parameter = $('form#login').serialize();
				
				console.log('parameters are '+parameter);
				xmlHttpLogin.open("POST","transmit.php", true);
				xmlHttpLogin.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpLogin.onreadystatechange = handleLoginResponse;
				
				xmlHttpLogin.send(parameter);
				//console.log('test1');
			} catch(e) {
				throwError(e);
			}
		}
		else {
			alert('Error using AJAX to Login');
		}
	} else {
		console.log('Please enter a username');
		$('section.login div').effect("shake",800);
		$('span#nouser').fadeIn(700);
		
	}
}

function handleLoginResponse() {
	//console.log('test2');
	if(xmlHttpLogin.readyState==4&&xmlHttpLogin.status==200) {
		try{
			console.log(xmlHttpLogin.readyState+' '+xmlHttpLogin.status);
			console.log(xmlHttpLogin.responseText);
			response = JSON.parse(xmlHttpLogin.responseText);
			if(response.answer) {
				createSession();
				$('section.login').fadeOut(200,function(){
					if(response.accountType==1)
						window.location.assign("teacher.php?ID="+response.UserID);
					else
						window.location.assign("student.php?ID="+response.UserID);
				});
			} else {
				$('section.login div').effect("shake",800);
				$('span#invalid').fadeIn(700);
			}
		} catch(e) {
			throwError(e);
		}
	}
}

function createSession() {

}

function getGradedAnswer() {
	var id=GETvar()['ID'];
	if(id) {
		if(xmlHttpGradedAnswer) {
			try{
				//console.log(ut);
				var parameter = 'mode=getGradedAnswer&StudentID='+id;
				console.log('GradedAnswer parameter: '+parameter);
				xmlHttpGradedAnswer.open("POST", "transmit.php", true);
				xmlHttpGradedAnswer.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpGradedAnswer.onreadystatechange = handleGradedAnswerResponse;

				xmlHttpGradedAnswer.send(parameter);
			} catch(e) {
				throwError(e);
			}
		}
	} else {
		alert('Something went wrong with grading.');
	}
}

function handleGradedAnswerResponse() {
	if(xmlHttpGradedAnswer.readyState==4&&xmlHttpGradedAnswer.status==200) {
		try{
			response = JSON.parse(xmlHttpGradedAnswer.responseText);
			if(response) {
				var gradedanswers=document.getElementById('ungradedanswers');
				while(gradedanswers.childNodes[0]) gradedanswers.childNodes[0].remove();
				console.log(response);
				for(key in response) {
					//console.log(response[key]===false);
					if(response[key]===false) {
						gradedanswers.innerHTML="<h3>No graded answers from this test</h3>";
					} else {
						var answerselem = document.createElement('li');
						answerselem.className = "answerelem";
						answerselem.innerHTML='<button value="'+response[key]
							+'" onclick="fetchAnswerFeedback(this)">Grade Answer #'+response[key]+'</button>';
						gradedanswers.appendChild(answerselem);
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

function fetchAnswerFeedback(t) {
	console.log("AnswerID= "+t.value);
	if(t.value) {
		if(xmlHttpFetchAnswerFeedback) {
			try{
				//console.log(ut);
				var parameter = 'mode=fetchAnswerFeedback&AnswerID='+t.value;
				console.log('FetchAnswerFeedback parameter: '+parameter);
				xmlHttpFetchAnswerFeedback.open("POST", "transmit.php", true);
				xmlHttpFetchAnswerFeedback.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpFetchAnswerFeedback.onreadystatechange = handleFetchAnswerFeedbackResponse;

				xmlHttpFetchAnswerFeedback.send(parameter);
			} catch(e) {
				throwError(e);
			}
		}
	} else {
		alert('Something went wrong with grading.');
	}
}
function handleFetchAnswerFeedbackResponse() {
	if(xmlHttpFetchAnswerFeedback.readyState==4&&xmlHttpFetchAnswerFeedback.status==200) {
		try{
			response = JSON.parse(xmlHttpFetchAnswerFeedback.responseText);
			if(response) {
				//console.log(response);
				displayFeedback(response);
			} else {
				alert('No response from database while asking for feedback!');
			}
		} catch(e) {
			throwError(e);
		}
	}
}
function displayFeedback(resp) {
	console.log(resp);
	var questionqueue = document.getElementById('questionqueue').childNodes[1];
	while(questionqueue.childNodes[0]) questionqueue.childNodes[0].remove();
	var questionbox = document.getElementById('questionbox');
	while(questionbox.childNodes[0]) questionbox.childNodes[0].remove();
	var testinfo = document.createElement('h2');
	testinfo.innerHTML=resp[0].TestName+' - TestID: '+resp[0].TestID+' Grade: '+resp[1].Grade;
	testinfo.id="test";
	testinfo.className=resp[0].TestID;
	questionbox.appendChild(testinfo);
	var answerinfo = document.createElement('p');
	answerinfo.innerHTML='Answer: '+resp[1].AnswerID+' by Student: '+resp[1].StudentID;
	answerinfo.id="answer";
	answerinfo.className = resp[1].AnswerID;
	questionbox.appendChild(answerinfo);
	var qcount=1;
	for(key in resp[0]) {
		if(resp[0][key].QuestionID) {
			console.log('Question!');
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
					qpiece='Your Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Correct Answer: '+resp[0][key].Answer;
					qpiece+='<p>A.'+resp[0][key].Choice1+' - '+resp[0][key].Feedback1+'</p>';
					qpiece+='<p>B.'+resp[0][key].Choice2+' - '+resp[0][key].Feedback2+'</p>';
					qpiece+='<p>C.'+resp[0][key].Choice3+' - '+resp[0][key].Feedback3+'</p>';
					qpiece+='<p>D.'+resp[0][key].Choice4+' - '+resp[0][key].Feedback4+'</p>';
					qpiece+='<p>E.'+resp[0][key].Choice5+' - '+resp[0][key].Feedback5+'</p>';
					break;
				case "2":
					qpiece='Your Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Correct Answer: '+resp[0][key].Answer;
					qpiece+='<p>T.'+resp[0][key].Choice1+' - '+resp[0][key].Feedback1+'</p>';
					qpiece+='<p>F.'+resp[0][key].Choice2+' - '+resp[0][key].Feedback2+'</p>';
					break;
				case "3":
					qpiece='Your Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Needs to address: '+resp[0][key].Choice1+'<br><span>';
					qpiece+='<p> - '+resp[0][key].Feedback1+'</p>';
					qpiece+='</span>';
					break;
				case "4":
					qpiece='Your Answer: '+resp[1]['Answer']['Ans'+resp[0][key].QuestionID];
					qpiece+='<br>Needs to address: '+resp[0][key].Choice1+', '+resp[0][key].Choice2
						+', '+resp[0][key].Choice3+', '+resp[0][key].Choice4+', '+resp[0][key].Choice5
						+'<br><span>';
					qpiece+='<p>A.'+resp[0][key].Choice1+' - '+resp[0][key].Feedback1+'</p>';
					qpiece+='<p>B.'+resp[0][key].Choice2+' - '+resp[0][key].Feedback2+'</p>';
					qpiece+='<p>C.'+resp[0][key].Choice3+' - '+resp[0][key].Feedback3+'</p>';
					qpiece+='<p>D.'+resp[0][key].Choice4+' - '+resp[0][key].Feedback4+'</p>';
					qpiece+='<p>E.'+resp[0][key].Choice5+' - '+resp[0][key].Feedback5+'</p>';
					qpiece+='</span>';
					break;
			}

			questioncontainer.innerHTML+=qpiece;
			questionbox.appendChild(questioncontainer);
		}
	}

	$('#overlay').fadeIn(1000);
	$('#testarea').fadeIn(1000);
}

function submitLogout() {
	//eatCookies();
	$('body').fadeOut(200, function(){
		window.location.assign("index.php");
	});
}
