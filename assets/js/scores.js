var highscores = document.getElementById('highscores');

function readHighscores() {

//variable to store the scores in HTML format
var highscoresHTML = '';

//array used to sort scores
localStorageArray = [];

//iterates localStorage

for (var i = 0; i < localStorage.length; i++) {

//sets iteration key name
var key = localStorage.key(i);

//uses key name to retrieve the corresponding value
var value = localStorage.getItem(key);

//array used to sort the scores 
localStorageArray[i] = {'initials' : key, 'score': value };
}

//sorts array for the high scores
localStorageArray.sort(function(a, b){return a.score - b.score});

//reads the array and creates 'li' for 'ol'
for (var i = localStorageArray.length - 1; i >= 0; i--){
highscoresHTML += '<li>' + localStorageArray[i].initials + '- ' + localStorageArray[i].score + '</li>'
}

//adds result with the 'li' in highscores.html
highscores.innerHTML = highscoresHTML;
}

//reads and prints scores from localStorage
readHighscores();

//function to delete scores from the history
function clearHighscores() {

//clears the localStorage
localStorage.clear();

//refresh scores 
readHighscores();

}

//get references to the #clear element
var clearButton = document.querySelector('#clear');

//add event listener to clear button
clearButton.addEventListener('click', clearHighscores);