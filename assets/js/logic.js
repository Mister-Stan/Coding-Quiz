var currentQuestion = 0;

var questionTitle = document.getElementById('question-title');
var a = document.getElementById('a');
var b = document.getElementById('b');
var c = document.getElementById('c');
var d = document.getElementById('d');

var startScreen = document.getElementById('start-screen');
var questions = document.getElementById('questions');
var endScreen = document.getElementById('end-screen');

var feedback = document.getElementById('feedback');

var audioCorrect = new Audio('assets/sfx/correct.wav');
var audioIncorrect = new Audio('assets/sfx/incorrect.wav');

var myJsonString = JSON.stringify(quizQuestions);
var myObject = JSON.parse(myJsonString);

function loadQuestion() {
	
	questionTitle.innerText = myObject[currentQuestion].question;
	a.innerText = myObject[currentQuestion].a;
	b.innerText = myObject[currentQuestion].b;
	c.innerText = myObject[currentQuestion].c;
	d.innerText = myObject[currentQuestion].d;
}

function startQuiz(){
	startScreen.classList.remove('start');
	startScreen.classList.add('hide');
	
	questions.classList.remove('hide');
	questions.classList.add('start');
	
	loadQuestion();
}

function endQuiz(){
	questions.classList.remove('start');
	questions.classList.add('hide');
	
	endScreen.classList.remove('hide');
	endScreen.classList.add('start');
}

function submitQuiz(){
	document.location.href = "highscores.html";
}

function checkQuestionAnswer(q,a){
	
	if(myObject[q].answer == a){
		feedback.innerText = 'Correct!';
		//audioCorrect.play();
	}
	else{
		feedback.innerText = 'Wrong!';
		//audioIncorrect.play();
	}
	
	feedback.classList.remove('hide');
	setTimeout( function(){ feedback.classList.add('hide'); }, 700 );
	
	currentQuestion++;
	
	if(currentQuestion < quizQuestions.length){
		loadQuestion();
	}
	else{
		endQuiz();
	}
	
}

// Get references to the #next-question element
var nextQuestion = document.querySelector('#next-question');

// Add event listener to generate button
nextQuestion.addEventListener('click', loadQuestion);

// Get references to the #start element
var startButton = document.querySelector('#start');

// Add event listener to generate button
startButton.addEventListener('click', startQuiz);

// Get references to the #submit element
var submitButton = document.querySelector('#submit');

// Add event listener to generate button
submitButton.addEventListener('click', submitQuiz);



