var currentQuestion = 0;

var questionTitle = document.getElementById('question-title');
var a = document.getElementById('a');
var b = document.getElementById('b');
var c = document.getElementById('c');
var d = document.getElementById('d');

var myJsonString = JSON.stringify(quizQuestions);
var myObject = JSON.parse(myJsonString);

function loadQuiz() {
	
	questionTitle.innerText = myObject[currentQuestion].question;
	a.innerText = myObject[currentQuestion].a;
	b.innerText = myObject[currentQuestion].b;
	c.innerText = myObject[currentQuestion].c;
	d.innerText = myObject[currentQuestion].d;
	
	currentQuestion++;

  if (currentQuestion == quizQuestions.length) {
    document.location.href = "highscores.html";	
	}
}
//loadQuiz();

// Get references to the #generate element
var generateBtn = document.querySelector('#next-question');
// Add event listener to generate button
generateBtn.addEventListener('click', loadQuiz);