// DOMS ELEMENTS  ---------------------------------------------------------
const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_question = document.getElementById("question");
const dom_choiceA = document.getElementById("A");
const dom_choiceB = document.getElementById("B");
const dom_choiceC = document.getElementById("C");
const dom_choiceD = document.getElementById("D");

const dom_score = document.getElementById("score");
const dom_score_p = document.getElementById("score_p");
const dom_score_img = document.getElementById("score_img");

let dom_timeLine = document.getElementById("timeLine")

let timeWorked=false
// DATA  ---------------------------------------------------------
let questions=[
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "B",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
];

let score = 0;
let currentQuestionIndex = 0;
let countLine=0
// FUNCTION  ---------------------------------------------------------

// Hide a given element
function hide(element) {
  element.style.display = "none";
}

// Show a given element
function show(element) {
  element.style.display = "block";
}

function renderQuestion() {
  let question = questions[currentQuestionIndex];
  dom_question.textContent = question.title;
  dom_choiceA.textContent = question.choiceA;
  dom_choiceB.textContent = question.choiceB;
  dom_choiceC.textContent = question.choiceC;
  dom_choiceD.textContent = question.choiceD;
}

dom_start.addEventListener("click", (event) => {
  hide(dom_start);
  show(dom_quiz);
  loadQuestions()
});


function loadQuestions() {
 
  let questionsStorage = JSON.parse(localStorage.getItem("questions"));
  if (questionsStorage !== null) {
    questions = questionsStorage;
    renderQuestion();
    
  }
}



function checkAnswer(choice) {
  
  let maximunLine = parseInt(dom_quiz.offsetWidth/questions.length)
  let question = questions[currentQuestionIndex];
  
  if (choice === question.correct) {
    score += 1;
  }

  if (currentQuestionIndex < questions.length - 1) {
    // Go to the next question
    currentQuestionIndex += 1;
    countLine += maximunLine
    dom_timeLine.style.width = countLine + "px"
    // Render the nex quesiton
    renderQuestion();
  } else {
    timeWorked=true
    if (countLine <= dom_quiz.offsetWidth-maximunLine ){
      countLine += maximunLine-16
      dom_timeLine.style.width = countLine + "px"
    }
    startTimer(1)
  }
}

function showScore() {
  hide(dom_quiz);
  show(dom_score);

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  comment = "CRAZY AMAZING !";
  image = "../../img/100.png";

  if (scorePerCent <= 20) {
    comment = "HUMM !";
    image = "../../img/20.png";
  } else if (scorePerCent <= 40) {
    comment = "YOU CAN IMPROVE !";
    image = "../../img/40.png";
  } else if (scorePerCent <= 60) {
    comment = "NOT BAD BUT... !";
    image = "../../img/60.png";
  } else if (scorePerCent <= 80) {
    comment = " GOOD !";
    image = "../../img/80.png";
  }

  dom_score_p.textContent = comment + " : " + scorePerCent + " %";
  dom_score_img.src = image;
}

///// timer to check /////

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    time--; 
    if (time==0){
        showScore()
        clearInterval(counter)
    }
    console.log('time: ', time);
  }
  
}
