$(document).ready(function() {

        // declare global variables
        var correct = 0;
        var incorrect = 0;
        var unanswered = 0;
        var answer = false; // has to turn true
        var count = 25;

    function game() {
        $("#choices").empty(); //empty

        var questions = [{
            question: "What is Chandler's middle name?",
            choices: ["Clint","Muriel","Toby"],
            correctAnswer: 1


        },{
            question: "Where do Ross and Phoebe get stuck before Ben is born?",
            choices: ["The Apartment","Traffic", "A Janitor's Closet"],
            correctAnswer: 2


        }, { 

            question: "Where does Chandler tell Janice he has been relocated to to avoid her?",
            choices: ["Yemen","Aruba","London"],
            correctAnswer: 0



        }, {

            question: "What does Monica's dad give her to compensate ruining her childhood possesions?",
            choices: ["Money","Porche","House"],
            correctAnswer: 1


        },{
    
            question: "What is the name of Joey's agent?",
            choices: ["Janice","Phoebe","Estelle"],
            correctAnswer: 2


        }, {

            question: "What is the name of Ross and Rachel's daughter?",
            choices: ["Emma","Charlie","Carol"],
            correctAnswer: 0

        }]

        // Timer 
            
          
            var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
            
        function timer() {
            count --;
            $("#time").html("Time Left: " + count);
                if (count = 0) {
                    clearInterval(counter); //Stop counting
                    unanswered++;
                    console.log("Time ran out!")
                    $("#choices").html(
                        "You ran out of time! The correct answer: " +
                        triviaQuestion.choices[triviaQuestion.correctAnswer]
                    )
                    setTimeout(ending, 2000);
                }
                
                if (correct + incorrect + unanswered >= 5) {
                    clearInterval(counter)
                    return false;
                }
            }

        // Random Questions 


        function randomObject (obj) { // randomProperty

            var keys = Object.keys(obj) // Object needs to be in CAPS
            return obj[keys[Math.floor(Math.random()*keys.lenght)]];

        }

        var triviaQuestion = randomObject(questions); 
        //  randomQuestion
        var askedQuestions = []; // the already answered questions go into an array
        askedQuestions.push(triviaQuestion);

        // Append so it goes onto the page

        $("#question").append(triviaQuestion + question + "<br>");

        var multipleChoice = triviaQuestion + choices;

        // Make it loop so through the choice array and create a list

        for (var i = 0; i <triviaQuestion.choices.lenght; i++){
   
            $("#choices").append('<button>' + triviaQuestion.choices[i] + '</button>');


        }   


        $("#choices button").on("click", function() {
            //Gets user answer guess
            var userAnswer = $(this).text();
            if (multipleChoice.indexOf(userAnswer) ==
                triviaQuestion.correctAnswer) {
                correct++;
                console.log("right");
                answer = true;
                $("#question").empty();
                $("#choices").html("You are correct!")
                setTimeout(reset, 3000);
            } else {
                incorrect++;
                console.log("wrong");
                answer = true;
                $("#question").empty();
                $("#choices").html(
                    "You are wrrrrrrooooonnngggggg! The correct answer: " +
                    triviaQuestion.choices[
                        triviaQuestion.correctAnswer])
                setTimeout(reset, 3000);
            }

        });

            //Function that runs after all the questions have been answered

        function ending() {
            $("#time").empty();
            $("#question").empty();
            $("#choices").empty();
            console.log("end")
            // var audio = new Audio(
            //     'https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90'
            // );
            // audio.play();
            
            $("#choices").html("All done, heres how you did!" +
                "<br>" + "Correct Answers: " + correct +
                "<br>" + "Incorrect Answers: " + incorrect +
                "<br>" + "Unanswered: " + unanswered);
            $("#correct").append(
                "<button id='startover'>Start Over?</button>"
            )
            $("#startover").on("click", function() {
                // audio.pause();
                $("button").remove();
                game();
            })
        }

        function reset() { 
            $("#time").empty();
            $("#question").empty();
            $("#choices").empty();
            count = 25;
            timer();
            //End questions and display correct/incorrect answers
            if (correct + incorrect + unanswered === 5) {
                ending();
                return
            }
            //Remove the question that was displayed in order to avoid any duplicate questions
            for (var i = 0; i < askedQuestions.length; i++) {
                for (var j = 0; j < questions.length; j++) {
                    if (askedQuestions[i] == questions[j]) {
                        delete questions[j];
                    }
                }
            }
            triviaQuestion = randomObject(questions);
            askedQuestions.push(triviaQuestion);
            //Append the random question
            $("#question").append(triviaQuestion.question +
                "<br>");
            var multipleChoice = triviaQuestion.choices;
            //Loop thru the choices array and add it to a list to display it better
            for (var i = 0; i < triviaQuestion.choices.length; i++) {
                $("#choices").append('<button>' +
                    triviaQuestion.choices[i] + '</button>'
                );
            }
            $("#choices button").on("click", function() {
                //Gets user answer guess
                var userAnswer = $(this).text();
                if (multipleChoice.indexOf(userAnswer) ==
                    triviaQuestion.correctAnswer) {
                    correct++;
                    console.log("right");
                    answer = true;
                    $("#question").empty();
                    $("#choices").html(
                        "You are correct!")
                    setTimeout(reset, 2000);
                } else {
                    incorrect++;
                    console.log("wrong");
                    answer = true;
                    $("#question").empty();
                    $("#choices").html(
                        "You are wrrrrrrooooonnngggggg! The correct answer: " +
                        triviaQuestion.choices[
                            triviaQuestion.correctAnswer
                        ])
                    setTimeout(reset, 2000);
                }
            })
        } 






    } // game close

    $(".btn").on("click", function() {
        //Remove start button
        $('#button').remove();
        $("p").empty();
        game();
        
    });


}); //ready close
