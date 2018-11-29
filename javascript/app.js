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
    var userCorrect = "Correct!!!";
    var userIncorrect = "Incorrect!";
    var timerOut = "You're out of time!!!"

    // Variable to hold the explanation when user selects the wrong answer or runs out of time:
    var answerExplain = ["Sailing was introduced into the Olympics at the Games held in Athens, Greece in 1896. Although sailing was on the program for that year it could not take place because of weather concerns. Sailing was not included in the 1900 Olympics, but returned to the regular program in 1904.",
    "On most sailboats there are three sheets-the port jib sheet, the starboard jib sheet and the mainsheet. The jib sheets are the lines (ropes) that control the jib sail and the main sheet controls the mainsail. The saying 'being three sheets to the wind' referring to someone who is extremely drunk or out of control comes from this sailing term. On a sailboat if all three of your sheets are out flapping in the wind you have no control over your sails and thus your sailboat.",
    "A tiller is a straight piece of wood or metal which fits into the head of the rudder and is used for steering a boat.",
    "From the rear of the boat looking forward, the left side of the boat is port and the right side is starboard.",
    "The schooner has a fore mast which is shorter than the main mast. The ketch and the yawl both have a mizzen mast, aft of the main mast, but the mizzen mast on a yawl is located aft of the steering post. The easy way to remember which is which is that 'k' comes before 'y.' The sloop has only one mast.",
    "Halyards are used to raise and lower the sails!",
    "Jibing is turning the stern past the wind so the wind changes from one side to the other, allowing a turn. Tacking is changing the bow into the wind using the wind change from side to side to help the turn. Sail trimming is simply setting the angle of the vessel to the wind. Hull trimming however is adjusting the boat's load to work with its performance in the water.",
    "The yellow flag is the international signal flag for, 'my vessel is healthy.' It is known as the 'Q' flag, and in effect invites Customs Officers to inspect your vessel. Once inspected, or after a specified period awaiting inspection, the Q flag can be lowered, and need not be raised again while inside the territorial waters of that country.",
    "When entering a harbour, these 'lateral marks' as they are known, must be kept green to starboard and red to port. On leaving harbour, the green buoys must be kept to port and the red to starboard. When navigating a channel, either leaving or entering a harbour, you must keep your vessel to your right hand side of the channel. Buoys that warn of danger, and many others, are standardised across the world. However, in the system in use in the United States, the lateral mark system is reversed; on leaving a harbour the green lateral buoys must be kept to starboard, the red to port and vice versa on entering a harbour. The opening of a safe channel may also be indicated by a pillar buoy painted with alternating red/white vertical stripes."];

    // An array to hold the gifs to show after user is correct or incorrect:
    var giphyArray = ["<img class='giphy' src='https://media.giphy.com/media/jGC37Ky8b5OxO/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/3o7aCVTfelG4XSbv3y/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/fHua9RHmk5I4Ry8X7S/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/3o6MbbDfnFzOS0SYes/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/3oriNLze0eyurnHTwI/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/xUPGcFdM5qI3G05Ng4/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/5Mnb0r8Qdvv6U/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/PNfPqeuSXnFTYKYn9P/giphy.gif'>",
    "<img class='giphy' src='https://media.giphy.com/media/l0MYSryDg63YEmXVS/giphy.gif'>"
    ];

    // An array to hold the gifs to show after a user runs out of time:
    var timeUpGif = "<img class='giphy' src='https://media.giphy.com/media/DcshtTtOSpPO/giphy.gif'>"

    // Variables set at the beginning of the game
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
        countDown();
        startGame();
        // Call the timer function
    });

    // Create startGame function
    function startGame() {
        $(gameHTML).show();
        
        countdown = 25;
        $("#timer").html("Time Left: " + countdown);
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
    }
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
    

    // Stop the timer from counting down
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
        $("#response").html(userCorrect + "<br><br>" + giphyArray[question]);
        setTimeout(next, 1000 * 6);
        console.log("Correct Answers: " + correct);
    };

    // A function to run when the incorrect answer is selected
    function incorrectAnswer() {
        incorrect++;
        $(gameHTML).hide();
        $("#response").show();
        $("#response").html(userIncorrect + "<br><br>" + answerExplain[question] + "<br><br>" + giphyArray[question]);
        setTimeout(next, 1000 * 10);
        console.log("Incorrect Answers: " + incorrect);
    }

    // A function to run when the timer is up
    function timesUp() {
        incorrect++;
        $(gameHTML).hide();
        $("#response").show();
        $("#response").html(timerOut + "<br><br>" + answerExplain[question] + "<br><br>" + timeUpGif);
        setTimeout(next, 1000 * 10);
        console.log("Incorrect Answers: " + incorrect);
    }

    // A function to run the next question in the array 
    function next() {
        if (question < 8) {
            $("#response").hide();
            question++;
            countDown();
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
            "Incorrect Answers: " + incorrect + "<br><br>" +
            "<img class='giphy' src='https://media.giphy.com/media/3rlkI1QFJWRUsdRtha/giphy.gif'>");
        $(".restart").show();
        $("#finalScore").show();
        stop();

        // When the restart button is clicked
        $(".restart").click(function () {
            $(".restart").hide();
            $("#finalScore").hide();
            correct = 0;
            incorrect = 0;
            question = 0;
            countDown();
            startGame();
        })
    }
})