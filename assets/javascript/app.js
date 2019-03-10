// GAME CAN BE FOUND AT: https://aprilleperez.github.io/bootstrap-portfolio/portfolio.html

// time vars
var intervalID; // holds setInterval that runs timer
var timerRunning = false; // timer isn't running
var time = 15; // declare 15 seconds

// point vars
var correct = 0; // correct points

var questionCount = 0; // tracking which question user is on
console.log("base qC " + questionCount);


// Array of Questions
var questions = [
    "How do you spell the main character's name?",
    "What was Sokka's alias?",
    "Who is the only bender of these choices?",
    "Which of these names was NOT one of Toph's aliases throughout the series?",
    "Which air temple did Teo, his father, and a group of refugees set up shop?"
];

// Array of Options
var options = [
    ["Ang", "Aang", "Tenzin", "Angg"],
    ["Joke Master", "Non-Bender Warrior", "Boomerang Guy", "Hungry Guy"],
    ["Sokka", "Haru", "Suki", "The Earth King"],
    ["Metal Master", "The Blind Bandit", "The Runaway", "Chief"],
    ["Western Air Temple", "Eastern Air Temple", "Southern Air Temple", "Northern Air Temple"]
];

// Array of correctAnswer
var correctAnswer = [
    "Aang",
    "Boomerang Guy",
    "Haru",
    "Metal Master",
    "Northern Air Temple"
]


//-----------------------------START OF GAME------------------------------
// event listeners, JS runs when button clicked
window.onload = function () {

    //$(function () {
        $('#start-button').click(function () {  // when start button is clicked
            $("#start-button, #instructions1, #instructions2").addClass("hidden"); // hides start page
            $("#domOptionButtons, #domTimeRemaining, #domQuestion").removeClass("hidden"); // shows game page
            start(); // CALLS start function
        });
    //});
};

// function to start timer
function start() {
    if (!timerRunning) { //if timer isn't running
        timerRunning = true; // set timer to run
        time = 15; // set time to 15 seconds
        $("#domTimer").html("00:15"); // display time at 15 seconds
        printQuestion(questionCount); // CALLS printQuestion function, passing through value of questionCount
        console.log("current qC " + questionCount);
        intervalID = setInterval(count, 1000); // set the interval to count (decrement) every second, CALLS count function
        questionCount++; // increases questionCount by one, indicating that the next question will follow 
        console.log("incremented qC " + questionCount);
    }

    if (questionCount >= 6) {
        setTimeout(function () { // set timeout
            gameOver(); // CALL start function again
        }, 1000 * 1);
    }
}

// function to print questions and options to DOM
function printQuestion() {
    for (i = 0; i < questions.length; i++) {
        if (i === questionCount) { // for example, if i(0) === questionCount(0)
            $("#domQuestion").html(questions[i]); // change DOM to indexed question (0 -> 1st question)
            $("#option1").html(options[i][0]); // change DOM to indexed options (0 -> 1st option, 0 -> first index to first button)
            $("#option2").html(options[i][1]);
            $("#option3").html(options[i][2]);
            $("#option4").html(options[i][3]);
        }
    }
}

// function for counting down
function count() {
    // decrement time by 1,
    time--;
    // console.log(time);

    // Get current time, pass into timeConverter function, save result in variable.
    var converted = timeConverter(time); // CALLS timeConverter function
    // console.log(converted);

    // show converted time in the "display" div.
    $("#domTimer").text(converted);

    // stop countdown when timer reaches 0
    if (time == 0) {
        stop(); // CALLS stop function
        outOfTime();
    }
}

// function for converting time 
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

// function to stop timer
function stop() {
    if (timerRunning) { // if the timer is running
        timerRunning = false; // set timer to stop
        clearInterval(intervalID); // clear the interval
    }
}

// listens for which of 4 buttons was clicked
$('#option1, #option2, #option3, #option4').click(function (event) { // when one of 4 option buttons are clicked

    var clickedOption = $(this).val(); // store which button's value was clicked in a variable (number)

    let userPicked = options[questionCount - 1][clickedOption]; // stores option data based off of question count with the string indexed (string) from clickedOption (i.e. on first question(qC = 1) if user clicked Option1(value 0), clicked option = 0, and options = first question array, and first indexed item)

    if (userPicked === correctAnswer[questionCount - 1]) { // if user's selected button equals the answer for the question
        timerRunning = false; // stop timer
        clearInterval(intervalID); // clear interval
        correct++; // add correct point
        correctMessage(); // CALL correct message function
    } else {
        timerRunning = false; // stop timer
        clearInterval(intervalID); // stop timer
        wrongMessage(); // CALL wrong message function
    }
});

function correctMessage() {
    $("#correctMessage").modal("show"); // show correct message
    setTimeout(function () { // set timeout
        start(); // CALL start function again
        $("#correctMessage").modal("hide"); // hide correct message
    }, 1000 * 2); // after two seconds

}

function wrongMessage() {
    $("#wrongMessage").modal("show"); // show wrong message
    setTimeout(function () { // set timeout
        start(); // CALL start function again
        $("#wrongMessage").modal("hide"); // hide correct message
    }, 1000 * 2); // after two seconds

}

function outOfTime() {
    $("#outOfTime").modal("show"); // show out of time message
    setTimeout(function () { // set timeout
        start(); // CALL start function again
        $("#outOfTime").modal("hide"); // hide correct message
    }, 1000 * 2); // after two seconds

}

// Game over function
function gameOver() {
    $("#domOptionButtons, #domTimeRemaining, #domQuestion").addClass("hidden"); // hide game page
    $("#domCorrect").html(correct); // show points out of 5 user got
    $("#play-again, #domPoints, #domEndMessage").removeClass("hidden"); // show end page

    $('#play-again').click(function () {  // when play again button is clicked
        $("#play-again, #domPoints, #domEndMessage").addClass("hidden"); // hides end page
        timerRunning = false; // timer isn't running
        clearInterval(intervalID); // clear interval
        correct = 0; // zeroed correct
        questionCount = 0; // zeroed question
        $("#start-button, #instructions1, #instructions2").removeClass("hidden"); // shows start page
    });
}











// PRE-CODE THINKING

// GAME SETS UP WITH:
// Shown sections - 1. Game title (same throughout), 2. instructions (body), 3. start button (at end, becomes Play Again)
// declare # of questions and match: question statement, question answer choices, question correct answer
// timer is hidden and not running
// begin action on clicks (do not execute when page loads)


// GAME TRIGGERED BY:
// when start button is clicked, change section 2 and 3 to question statements and answer choices respectively
// -- timer starts counting down
// -- question [i] displayed on Dom
// -- 4 buttons display choices
// user guesses answer
// right answer --> stops timer, displays correct message, adds point to questions correct
// wrong answer --> stops timer, displays incorrect message, does not add point to questions correct
// out of time --> timer is at 0 (stops), displays out of time message, does not add point to questions correct



// GAME RESETS BY:



















// var questions1 = [
//     {
//         question: "How do you spell his name?",
//         choices: ["Ang", "Aang", "Tenzin", "Angg"],
//         correctAnswer: "Aang",
//     }
// ]


// Questions object
// var questions = {
//     q1: "How do you spell his name?",
//     q2: "What was Sokka's alias?",
//     q3: "Who is the only bender of these choices?",
//     q4: "Which of these names was not one of Toph's aliases throughout the series?",
//     q5: "Which air temple did Teo, his father, and a group of refugees set up shop?",
// }

// Options (buttons) object
// var options = {
//     q1: ["Ang", "Aang", "Tenzin", "Angg"],
//     q2: ["Joke Master", "Non-Bender Warrior", "Boomerang Guy", "Hungry Guy"],
//     q3: ["Sokka", "Haru", "Suki", "The Earth King"],
//     q4: ["Metal Master", "The Blind Bandit", "The Runaway", "Chief"],
//     q5: ["Western Air Temple", "Eastern Air Temple", "Southern Air Temple", "Northern Air Temple"],
// }

// Correct Answers object
// var correctAnswer = {
//     q1: "Aang",
//     q2: "Boomerang Guy",
//     q3: "Haru",
//     q4: "Metal Master",
//     q5: "Northern Air Temple",
// }


    // $("#domQuestion").html(questions.q1);

    // $("#option1").html(options.q1[0]);
    // $("#option2").html(options.q1[1]);
    // $("#option3").html(options.q1[2]);
    // $("#option4").html(options.q1[3]); 