const cube = document.querySelector('.cube');
const time = 8;

cube.addEventListener('click', () => {
    cube.style.transition = '';
    cube.style.transform = `translateY(100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    setTimeout(() => {
        cube.style.transition = `transform ${time}s`;
        const randomValue = Math.floor((Math.random() * 6) + 1);
        console.log(`randomValue: ${randomValue}` );
        
        switch(randomValue) {
            case 1:             
                cube.style.transform = `translate(5px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                break;
            case 2:
                cube.style.transform = `translateY(-35px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 3:
                cube.style.transform = `translateX(-40px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                break;
            case 4:
                cube.style.transform = `translateX(-35px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                break;
            case 5:
                cube.style.transform = `translateY(-35px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 6:
                cube.style.transform = `translateX(-70px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                break;
        };
    }, time * 5);

});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
    // remove the start button when clicked
$('#start').on('click', function(){
    $('#start').remove();
  game.loadQuestion();

})

// click event when you click the answer

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})

// Variable for questions, an array of objects 

let questions = [{
    question: "{{set_info.set_question1}}",
    answers: ["{{set_info.set_option1a}}", "{{set_info.set_option1b}}", "{{set_info.set_option1c}}"],
    correctAnswer: "{{ set_info.set_answer1 }}",
    image: "assets/images/imagename"
}, {
    question: "{{set_info.set_question2}}",
    answers: ["{{set_info.set_option2a}}", "{{set_info.set_option2b}}", "{{set_info.set_option2c}}"],
    correctAnswer: "{{ set_info.set_answer2 }}",
    image: "assets/images/imagename",
}, {
question: "{{set_info.set_question3}}",
    answers: ["{{set_info.set_option3a}}", "{{set_info.set_option3b}}", "{{set_info.set_option3c}}"],
    correctAnswer: "{{ set_info.set_answer3 }}",
    image: "assets/images/imagename",
}, {
    question: "{{set_info.set_question4}}",
    answers: ["{{set_info.set_option4a}}", "{{set_info.set_option4b}}", "{{set_info.set_option4c}}"],
    correctAnswer: "{{ set_info.set_answer4 }}",
    image: "assets/images/imagename"
}, {
    question: "{{set_info.set_question5}}",
    answers: ["{{set_info.set_option5a}}", "{{set_info.set_option5b}}", "{{set_info.set_option5c}}"],
    correctAnswer: "{{ set_info.set_answer5 }}",
    image: "assets/images/imagename"
},

];


var game = {
    questions:questions,
    currentQuestion:0, 
    counter:30, 
    correct:0,
    incorrect:0,
    unanswered:0,
    
    countdown: function(){
        game.counter --;
        $('#counter').html(game.counter); 
        if(game.counter<=0){
            console.log("TIME UP!")
            game.timeUp();
        }
    },
    loadQuestion: function (){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h3> Time to Guess: <span id ='counter'>30</span> Seconds</h3>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="btn btn-light btn-space answer-button" id="button- '+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>Out of time!<h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html('<h2>Complete!</h2>')
        $('#subwrapper').append(" Correct: " +game.correct + '<br/>');
        $('#subwrapper').append(" Incorrect: " +game.incorrect + '<br/>');
        $('#subwrapper').append(" Unanswered: " +game.unanswered + '<br/>');
        $('#subwrapper').append('<br><a href="{% url "blog:index" %}"><button class="btn btn-light">Home</button></a> &nbsp <a href="{% url "blog:quiz" set_id=next_id %}"><button class="btn btn-light">Next set</button></a>')


    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
    } else {
        game.answeredIncorrectly();
    }

    },
    answeredCorrectly: function(){
        console.log("right!")
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2> CORRECT!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else{
            setTimeout(game.nextQuestion,2*1000);
        }

    },
    answeredIncorrectly: function(){
        console.log("wrong")
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2> Wrong!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else{
            setTimeout(game.nextQuestion,2*1000);
        }

    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }

}
  