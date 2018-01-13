//Constructor for question objects
function triviaQuestion (question, a1, a2, a3, a4, correct, img){
	this.question = question,
	this.a1 = a1,
	this.a2 = a2,
	this.a3 = a3,
	this.a4 = a4,
	this.correct = correct,
	this.img = img
}

//Creates objects for questions and answers, and a permenant array to hold them for easy access
var swallow = new triviaQuestion("What is the airspeed velocity of an unladen swallow?", "What do you mean - African or European swallow?",
	"13 KPH", "Monty", "Python", "a1", "http://thelittle.org/sites/default/files/imges/film/2.COLOR_galloping%20knights.jpg");

var sherman = new triviaQuestion("On December 21, 1864, General Sherman’s famous “March to the Sea” concluded with the capture of what Southern city?",
	"Atlanta", "Charleston", "Savannah", "Montgomery", "a3", "http://amstudjh56.weebly.com/uploads/2/5/0/4/25048322/1714752.jpg?922");

var ribs = new triviaQuestion("On the human body, the intercostal muscles are located where?", "The hands", "The ribs", 
	"The knees", "The hips", "a2", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/1114_Thorax_zoom.png/300px-1114_Thorax_zoom.png");

var questionArray = [swallow, sherman, ribs];

//Initializes the counter variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var currentQuestion;
var remainingQuestions = questionArray.length;

//Controls the on-screen timer
var timer = {

	timeLeft: 15,

	countDown: function(){
		tickTock = setInterval(timer.callBack, 1000);
	},

	callBack: function(){
		timer.timeLeft--;
		$("#timeDiv").html("<p>Time Remaining: " + timer.timeLeft + " Seconds </p>");
		if (timer.timeLeft < 1){
			console.log("run")
			endQuestion("Out of Time!", true);
			unanswered++;
			var startAgain = window.setTimeout(newQuestion, 4000);
		};
	},

	reset: function(){
		timer.timeLeft = 15;
	}
};

//Starts the next question, and fire the Game Over sequence if there are no new questions left
function newQuestion(){
	//Ends the current game if there are no more new questions
	if(remainingQuestions < 1){
		return endGame();
	}

	//Selects a random question from the array of remaining questions
	//By splicing the selected question out of questionArray, we can hold it for temporary use in currentQuestion,
	//...and ensure that it is not used again during this game.
	var randomIndex = getRandomInt(questionArray.length);
	currentQuestion = questionArray[randomIndex];

	//Resets and starts the timer
	timer.reset();
	timer.countDown();

	$("#main").empty();
	$("#main").append("<div class= 'text-center' id='timeDiv'><p>Time Remaining: " + timer.timeLeft + " Seconds </p></div>");
	$("#main").append("<div class= 'text-center' id='questionDiv'><h2 class='text-center'>" + currentQuestion.question + "</h2></div>");
	$("#main").append("<div class= 'text-center' id='answerDiv'></div>");

	//Appends the current answer choices
	for (var i = 1; i <= 4; i++){
		var a = currentQuestion["a" + i.toString()];
		$("#answerDiv").append("<div><button class='btn btn-default answerButton' type='submit'>" + a  + "</button></div>").data("answer", a);
	} 

	$(".answerButton").on("click", function(){
	//Correct answer selected
	console.log("click")
	if($(this).data("answer") == currentQuestion[currentQuestion.correct]){
		endQuestion("Correct!");
		correct++;
	}

	else{
		endQuestion("Wrong!", true);
		incorrect++;
	}

	var startAgain = window.setTimeout(newQuestion, 4000);
	});

}

//Generates a random integer exclusive of MAX
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//Handles the end of each question, whether triggered by a guess (correct or incorrect), or the expiration time.
function endQuestion(message, wrong){
	clearInterval(tickTock);
	remainingQuestions--;
	$("#questionDiv").html(message);
	$("#answerDiv").empty();
	if(wrong){$("#answerDiv").append("<p>The correct answer was: " + currentQuestion[currentQuestion.correct] + "</p>")};
	$("#answerDiv").append("<img class=text-center src='" + currentQuestion.img + "'></img>");
}

//Handles the end of the game
function endGame(){
	clearInterval(tickTock);
	$("#questionDiv").html("Game Over!  Your Results:");
	$("#answerDiv").empty();
	$("#answerDiv").append("<p>Correct answers: " + correct + "</p>");
	$("#answerDiv").append("<p>Incorrect answers: " + incorrect + "</p>");
	$("#answerDiv").append("<p>Unanswered questions: " + unanswered + "</p>");
	$("#main").append("<button type='button' class='btn btn-primary btn-lg center-block startGame'>Start over?</button>");
}

//Game logic---------------------------------------------

$(".startGame").on("click", function(){newQuestion()});





//When the page first loads, display a self-explanatory title, and a start button
//Start button sets off a countdown
//Randomly selected question populates the screen with 4 choices 
//correct, incorrect and unanswered display 0

//If the player selects a correct answer, "Corect!" will display along with relevant media
//If the player chooses incorrectly, "wrong" message will display along with correct answer
//If time runs out, "out of time" will display along with correct answer
//correct, incorrect, and unanswered update

//A new question, with a new countdown, start automatically.

//Once all questions are exhausted, display end game message, and change button to "start over"