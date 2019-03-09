// GAME CAN BE FOUND AT: https://aprilleperez.github.io/bootstrap-portfolio/portfolio.html


var intervalID; // holds setInterval that runs timer
var timerRunning = false; // timer isn't running
var time = 15; // declare 15 seconds

var correct = 0; // correct points
var wrong = 0; // wrong points

var questionCount = 0; // tracking which question user is on
console.log("base qC " + questionCount);


// Array of Questions
var questions = [
    "How do you spell his name?",
    "What was Sokka's alias?",
    "Who is the only bender of these choices?",
    "Which of these names was not one of Toph's aliases throughout the series?",
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

    $(function () {
        $('#start-button').click(function () {  // when start button is clicked
            $("#start-button, #instructions1, #instructions2").addClass("hidden"); // hides start page
            $("#domOptionButtons, #domTimeRemaining, #domQuestion").removeClass("hidden"); // shows game page
            start(); // CALLS start function
            // nextQuestion();
        });
    });
};

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
        wrong++;
        stop(); // CALLS stop function
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


// function to start timer
function start() {
    if (!timerRunning) { //if timer isn't running
        timerRunning = true; // set timer to run
        printQuestion(questionCount); // CALLS printQuestion function, passing through value of questionCount
        console.log("current qC " + questionCount);
        intervalID = setInterval(count, 1000); // set the interval to count (decrement) every second, CALLS count function
        questionCount++; // increases questionCount by one, indicating that the next question will follow 
        console.log("incremented qC " + questionCount);
    }
}

function stop() { // function to stop timer
    if (timerRunning) { // if the timer is running
        timerRunning = false; // set timer to stop
        clearInterval(intervalID); // clear the interval
    }

}

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

$('#option1, #option2, #option3, #option4').click(function (event) { // when one of 4 option buttons are clicked
    console.log("this was clicked");

    var clickedOption = $(this).val(); // store which button was clicked in a variable
    console.log(clickedOption);

    let userPicked = options[questionCount - 1][clickedOption];
    console.log(userPicked);

    if (userPicked = correctAnswer.toString([questionCount - 1])) {
        alert("this was correct");
    } else {
        alert("this was incorrect");
    }



    // for (j = 0; j < correctAnswer.length; i++) {
    //     if (j === questionCount) {

    //     }  
    // };
});




// function answerResult() {

// }


// function nextQuestion() {

// }








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