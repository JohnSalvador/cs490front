var xmlHttpShowTest = createXmlHttpRequestObject();
var xmlHttpAnswer = createXmlHttpRequestObject();

function throwError(e) {
	alert(e.toString()+'\nOn line... '+e.lineNumber+'\non file... '+e.fileName);
}
function GETvar() {
    var getv = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    	function(m,key,value) {
        getv[key] = value;
    	}
    );
    return getv;
}
///[?&]+([^=&]+)=([^&]*?)[#.]/gi

//ShowTest
var test=[];
function showTest(testId) {
	//console.log('ran showtest');
	
	if(document.getElementById('testid'))
		testId=document.getElementById('testid').value;;
	if(testId) {
		if(xmlHttpShowTest) {
			try{
				var parameter = 'mode=takeTest&TestID='+testId;
				console.log('ShowTest parameter: '+parameter);
				xmlHttpShowTest.open("POST", "transmit.php", true);
				xmlHttpShowTest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpShowTest.onreadystatechange = handleShowTestResponse;

				xmlHttpShowTest.send(parameter);
			} catch(e) {
				throwError(e);
			}
		}
	} else {
		alert('Please enter a correct test ID');
	}
}
function handleShowTestResponse() {
	//console.log('test2');
	if(xmlHttpShowTest.readyState==4&&xmlHttpShowTest.status==200) {
		try{
			response = JSON.parse(xmlHttpShowTest.responseText);
			if(response.TestID) {
				displayTest(response);
			} else {
				alert('No response from database while asking for test!');
			}
		} catch(e) {
			throwError(e);
		}
	}
}
var answer;
function displayTest(resp) {
	console.log(resp);
	var questionqueue = document.getElementById('questionqueue').childNodes[1];
	while(questionqueue.childNodes[0]) questionqueue.childNodes[0].remove();
	var questionbox = document.getElementById('questionbox');
	while(questionbox.childNodes[0]) questionbox.childNodes[0].remove();
	answer={};
	//console.log(questionqueue.childNodes[1]);
	var testinfo = document.createElement('h2');
	testinfo.innerHTML=resp.TestName+' - TestID: '+resp.TestID;
	testinfo.id="test";
	testinfo.className=resp.TestID;
	questionbox.appendChild(testinfo);
	var qcount=1;
	for(key in resp) {
		//console.log(resp[key].QuestionID);
		if(resp[key].QuestionID) {
			answer['Ans'+resp[key].QuestionID]="";
			var qnumbercontainer=document.createElement('li');
			qnumbercontainer.className="qqn "+resp[key].QuestionID;
			qnumbercontainer.innerHTML='<label><input type="radio" value="'+resp[key].QuestionID
				+'" name="questionref"> '+qcount+'</label>';
			questionqueue.appendChild(qnumbercontainer);
			qcount++;
			//QuestionParsing
			var questioncontainer=document.createElement('div');
			questioncontainer.className='shadowbox questioninnerbox';
			questioncontainer.id=resp[key].QuestionID;
			questioncontainer.innerHTML='<p>'+resp[key].Question+'</p>';
			var qpiece='';
			switch(resp[key].QuestionType) {
				case "1":
					qpiece='<ul>';
					qpiece+='<li><input type="radio" name="Answer['+resp[key].QuestionID
						+']" value="A" onclick="updateAnswer(this)" class="'+resp[key].QuestionID+
						'">A. '+resp[key].Choice1+'</li>';
					qpiece+='<li><input type="radio" name="Answer['+resp[key].QuestionID
						+']" value="B" onclick="updateAnswer(this)" class="'+resp[key].QuestionID+
						'">B. '+resp[key].Choice2+'</li>';
					qpiece+='<li><input type="radio" name="Answer['+resp[key].QuestionID
						+']" value="C" onclick="updateAnswer(this)" class="'+resp[key].QuestionID+
						'">C. '+resp[key].Choice3+'</li>';
					qpiece+='<li><input type="radio" name="Answer['+resp[key].QuestionID
						+']" value="D" onclick="updateAnswer(this)" class="'+resp[key].QuestionID+
						'">D. '+resp[key].Choice4+'</li>';
					qpiece+='<li><input type="radio" name="Answer['+resp[key].QuestionID
						+']" value="E" onclick="updateAnswer(this)" class="'+resp[key].QuestionID+
						'">E. '+resp[key].Choice5+'</li>';
					qpiece+='</ul>';
					break;
				case "2":
					qpiece='<ul>';
					qpiece+='<li><input type="radio" name="Answer['+resp[key].QuestionID
						+']" value="T" onclick="updateAnswer(this)" class="'+resp[key].QuestionID+
						'">True. '+resp[key].Choice1+'</li>';
					qpiece+='<li><input type="radio" name="Answer['+resp[key].QuestionID
						+']" value="F" onclick="updateAnswer(this)"  class="'+resp[key].QuestionID+
						'">False. '+resp[key].Choice2+'</li>';
					break;
				case "3":
					qpiece='<p>';
					qpiece+='<input type="text" name="Answer['+resp[key].QuestionID
						+']" onkeyup="timedUpdateAnswer(this)" class="'+resp[key].QuestionID+
						'">';
					qpiece+='</p>';
					break;
				case "4":
					qpiece+='<textarea type="text" name="Answer['+resp[key].QuestionID
						+']" onkeyup="timedUpdateAnswer(this)" class="'+resp[key].QuestionID+
						'" rows="5" cols="70"></textarea>';
					break;
			}
			questioncontainer.innerHTML+=qpiece;
			questionbox.appendChild(questioncontainer);
		}
		

	}
	console.log(answer);
	//console.log(questionqueue.childNodes);

	$('#testarea').fadeIn(1000);
	$('#overlay').fadeIn(800);
}
function takeTest() {
	//console.log(test);
	showTest();
}
function updateAnswer(t) {
	//console.log(answer[t.className]);
	answer['Ans'+t.className]=t.value;
	//console.log(JSON.stringify(answer));
	var qq='.qqn.'+t.className;
	if(answer['Ans'+t.className])
		$(qq).css("background-color", "#33FF33");
		//console.log($(qq).parent());
	else
		$(qq).css("background-color", "#CC0000");
	console.log(answer);
}
var timedID=0;
function timedUpdateAnswer(t) {
	
	clearTimeout(timedID);
	timedID=setTimeout(updateAnswer(t),2000);
}

//Submitting Answers
function submitAnswer() {
	var r=confirm('Are you sure you want to submit your exam?');
	if(!r) console.log(answer[0]);
	else
	if(answer) {
		//console.log('true somehow');
		if(xmlHttpAnswer) {
			try{
				var studentid=GETvar()['ID'];
				var string=JSON.stringify(answer);
				var testid=document.getElementById('test').className;
				//console.log(string);
				var parameter = 'mode=submitAnswer&StudentID='+studentid+'&TestID='+testid
					+'&Answer='+string;
				
				console.log(parameter);
				xmlHttpAnswer.open("POST","transmit.php", true);
				xmlHttpAnswer.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlHttpAnswer.onreadystatechange = handleAnswerResponse;
				
				xmlHttpAnswer.send(parameter);
				//console.log('test1');
			} catch(e) {
				throwError(e);
			}
		}
		else {
			alert('Error using AJAX to Answer');
		}
	} else {
		
	}

}
function handleAnswerResponse() {
	if(xmlHttpAnswer.readyState==4&&xmlHttpAnswer.status==200) {
		try{
			response = JSON.parse(xmlHttpAnswer.responseText);
			if(response.answer) {
				alert('Your answers have been submitted!');
				console.log(response);
			} else {
				alert('Unfortunately, there was an error submitting your answers');
			}
		} catch(e) {
			throwError(e);
		}
	}
}

//Functionality on steroids
$('.close').on('click',function() {
	$this=$(this);
	//console.log($this.parent());
	$this.parent().fadeOut(1000);
	$('#overlay').fadeOut(800);
});

