//initialize the quiz timer
var timer = 75;
var time = document.querySelector('#time');

//initialize variable that actualize the timer from  setInterval function
var refreshTimer;

//initialize the quiz score
var quizScore = 0;
var finalScore = document.querySelector('#final-score');
var initials = document.querySelector('#initials');

//initialize first question from the quiz
var currentQuestion = 0;

var questionTitle = document.getElementById('question-title');

//variables for the "a", "b", "c" and "d" answer
var a = document.getElementById('a');
var b = document.getElementById('b');
var c = document.getElementById('c');
var d = document.getElementById('d');


var startScreen = document.getElementById('start-screen');
var questions = document.getElementById('questions');
var endScreen = document.getElementById('end-screen');
var feedback = document.getElementById('feedback');

//initialize audio for correct and wrong answers
var audioCorrect = new Audio('assets/sfx/correct.wav');
var audioIncorrect = new Audio('assets/sfx/incorrect.wav');

//variable with quiz questions in string format
var myJsonString = JSON.stringify(quizQuestions);

//variable with quiz questions in object format
var myObject = JSON.parse(myJsonString);

//function that is keeping track of time needed to finish the quiz
function startTimer() {
	//adds in index.html the initial value of timer	
	time.innerText = timer;

	//refresh the timer by seconds
	refreshTimer = setInterval(function () {
		//decrements timer
		timer--;

		//adds in index.html the value of timer
		time.innerText = timer;

		if (timer <= 0) {

			//ends quiz
			endQuiz();

			//stops setInterval function
			clearInterval(refreshTimer);
		}
	}, 1000
	);
}


//function that loads current question from questions.js and adds it to the index.html
function loadQuestion() {
	questionTitle.innerText = myObject[currentQuestion].question;
	a.innerText = myObject[currentQuestion].a;
	b.innerText = myObject[currentQuestion].b;
	c.innerText = myObject[currentQuestion].c;
	d.innerText = myObject[currentQuestion].d;
}


//function that starts the quiz
function startQuiz() {
	//hides start screen
	startScreen.classList.remove('start');
	startScreen.classList.add('hide');

	//shows questions screen
	questions.classList.remove('hide');
	questions.classList.add('start');

	//starts the timer
	startTimer();

	//loads current question (index 0)
	loadQuestion();
}


//function to end the quiz
function endQuiz() {

	//hides questions screen
	questions.classList.remove('start');
	questions.classList.add('hide');

	//shows the screen with the user initials
	endScreen.classList.remove('hide');
	endScreen.classList.add('start');

	//the quiz score is equal with the value of the timer in seconds that is remaining
	quizScore = timer;

	//actualizing score in the final screen
	finalScore.innerText = quizScore;
}


//function that sends quiz result
function submitQuiz() {

//saves the user initials and quiz score in localStorage
localStorage.setItem(initials.value, quizScore);

//redirect towards quiz highscores page
document.location.href = 'highscores.html';
}


//function that checks user answer
function checkQuestionAnswer(userCurrentQuestion, userAnswer) {

//checks if the answer given for the current question is same as user answer
if(myObject[userCurrentQuestion].answer === userAnswer) {

//gives user feedback
feedback.innerText = 'Correct!';
audioCorrect.play();
}
else{
feedback.innerText = 'Wrong!';
audioIncorrect.play();

//takes 10 seconds from the timer for wrong answer
timer = timer - 10;

//stops setInterval function
clearInterval(refreshTimer);

if(timer <= 0) {
//to stop the timer when reaches 0;

timer = 0 ;
timer.innerText = timer;

endQuiz();
}
else{
startTimer();
}
}

//user feedback
feedback.classList.remove('hide');

//shows feedback after 0.7 seconds
setTimeout(function(){feedback.classList.add('hide');}, 700);

//goes to next index(next question)
currentQuestion++;

//if are still questions to be answered
if(currentQuestion < quizQuestions.length) {

//loads next question
loadQuestion();
} else {
//ends quiz
endQuiz();

//stops setInterval function
clearInterval(refreshTimer);
}
} 

//get references to the #start element
var startButton = document.querySelector('#start');

//add event listener to the startButton button
startButton.addEventListener('click', startQuiz);

//get references to the #submit element
var submitButton = document.querySelector('#submit');

//add event listener to the submitButton button
submitButton.addEventListener('click', submitQuiz);





