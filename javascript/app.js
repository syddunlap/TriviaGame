$(document).ready(function () {

    // Variable holding questions
    var questionArray = ["Sailing is an Olympic sport. What year was it first included in the Olympics?",
        "On a sailboat, what is a sheet?",
        "When someone asks you to grab the tiller, what are they asking you to do?",
        "The right side of a boat is referred to as what?",
        "You're sailing a boat with two masts with the mizzen mast located forward of the steering post. What type of boat are you on?",
        "What are halyards used for?",
        "Which of the following is NOT a turning maneuver in sailing?",
        "What color flag must be flown when first entering the territorial waters of another country?",
        "Large buoys used to denote a safe channel or passage for vessels in and out of the harbor are what color?"];
    // Variable holding answers
    var answerArray = [["1896", "1904", "1920", "1944"],
    ["Another name for the sail", "A thin blanket on the bed", "The chartbook you're referencing", "Lines used for controlling and adjusting sails"],
    ["Tend to any plants and/or herb garden nearby", "Steer the boat", "Get the anchor ready", "Check coordinates and plot location on charts"],
    ["Bow", "Starboard", "Stern", "Port"],
    ["Ketch", "Schooner", "Yawl", "Sloop"],
    ["To hail nearby boats during an emergency", "A tool used for measuring distance", "Used to raise and lower the sails", "Controls the movement of the sails"],
    ["Jibing", "Tacking", "Sail trimming", "Hull trimming"],
    ["White", "Red", "Yellow", "Green"],
    ["Blue & White", "Black & White", "Red & Yellow", "Red & Green"]];
    // Variable holding correct answers
    var correctAnswerArray = ["1896",
        "Lines used for controlling and adjusting sails",
        "Steer the boat",
        "Starboard",
        "Ketch",
        "Used to raise and lower the sails",
        "Hull trimming",
        "Yellow",
        "Red & Green"];
    // Variables to hold message screen after user guesses or time is up:
    var userCorrect = "You're correct!!!"
    var userIncorrect = "You're wrong!!!"
    var timerOut = "You're out of time!!!"

    var question = 0;
    var countdown = 25;
    var intervalId;

    // Variables to hold score
    let correct = 0;
    let incorrect = 0;

    // Hide answer buttons until game is started.
    $("#quiz").hide();

    // Hide restart button until game is ended.
    $(".restart").hide();

    // Print the questions to HTML
    var gameHTML = $("#quiz")

    // Function when button is clicked
    $(".start").click(function () {
        // hide the start button
        $(".start").hide();
        startGame();
        // Call the timer function
    });

    // Create startGame function
    function startGame() {
        countDown();
        $(gameHTML).show();
        // show question
        $("#question").html(questionArray[question]);
        // show answers
        $("#quiz").show();
        $("#a1").html(answerArray[question][0]);
        $("#a2").html(answerArray[question][1]);
        $("#a3").html(answerArray[question][2]);
        $("#a4").html(answerArray[question][3]);
    };

    // Create a timer function
    function countDown() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);

        function decrement() {
            countdown--;
            if (countdown === 0) {
                clearInterval(decrement);
                console.log("Time's Up")
                stop();
                timesUp();
            }
            $("#timer").html("Time Left: " + countdown);
        }
    }

    // Stop Function
    function stop() {
        clearInterval(intervalId);
    }

    // Create a function for when an answer is clicked with if then statements
    $("body").on("click", ".answer", function (event) {
        let userAnswer = $(this).text();

        // If for correct answer:
        if (userAnswer === correctAnswerArray[question]) {
            correctAnswer();
        }

        // Else for incorrect answer:
        else {
            incorrectAnswer();
        }

    });

    // A function to run when the correct answer is selected
    function correctAnswer() {
        correct++;
        $(gameHTML).hide();
        $("#response").show();
        $("#response").text(userCorrect);
        setTimeout(next, 1000 * 8);
        console.log("Correct Answers: " + correct);
    };

    // A function to run when the incorrect answer is selected
    function incorrectAnswer() {
        incorrect++;
        $(gameHTML).hide();
        $("#response").show();
        $("#response").text(userIncorrect);
        setTimeout(next, 1000 * 8);
        console.log("Incorrect Answers: " + incorrect);
    }

    // A function to run when the timer is up
    function timesUp() {
        incorrect++;
        $(gameHTML).hide();
        $("#response").show();
        $("#timesup").text(timerOut);
        setTimeout(next, 1000 * 8);
        console.log("Incorrect Answers: " + incorrect);
    }

    // A function to run the next question in the array 
    function next() {
        if (question < 1) {
            countdown = 25;
            $("#response").hide();
            question++;
            startGame();
        }

        else {
            finalScore();
        }
    }

    // A function to show the final score at the end of the quiz
    function finalScore() {
        $("#response").hide();
        $("#results").html("Game Over!" + "<br><br>" +
            "Correct Answers: " + correct + "<br>" +
            "Incorrect Answers: " + incorrect);
        $(".restart").show();
        $("#finalScore").show();

        // When the restart button is clicked
        $(".restart").click(function () {
            $(".restart").hide();
            $("#finalScore").hide();
            countdown = 25;
            correct = 0;
            incorrect = 0;
            question = 0;
            startGame();
        })
    }
})