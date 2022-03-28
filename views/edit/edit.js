// DOMS ELEMENTS  ---------------------------------------------------------
const dom_questions_view = document.getElementById("questions-view");
const dom_questions_dialog = document.getElementById("questions-dialog");
const dom_createEditButton = document.getElementById("createEditButton");

// DATA  ---------------------------------------------------------
let questions = [
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
    correct: "C",
  },
];

let questionToEdit = null;

// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

//  LOCAL STORAGE ---------------------------------------------------------
function saveQuestions() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

function loadQuestions() {
  let questionsStorage = JSON.parse(localStorage.getItem("questions"));
  if (questionsStorage !== null) {
    questions = questionsStorage;
  }
}

//  EDIT ---------------------------------------------------------

function renderQuestions() {
  // Remove the card container and create a new one
  dom_questions_container = document.getElementById("questions-container");
  dom_questions_container.remove();
  dom_questions_container = document.createElement("div");
  dom_questions_container.id = "questions-container";
  dom_questions_view.appendChild(dom_questions_container);

  // 2 - For all questions,  create a new div (class : item), and append it the container
  for (let index = 0; index < questions.length; index++) {
    let question = questions[index];
    let card = document.createElement('div')
    card.className = 'card'
    card.dataset.index = index;
    dom_questions_container.appendChild(card)
    let card_body = document.createElement("div");
    card_body.className = "card_body";
    // card_body.dataset.index = index;
    console.log('card_body',card_body);
    card.appendChild(card_body);
    let questionInfos = document.createElement("div");
    questionInfos.className = "question-info";
    card_body.appendChild(questionInfos);

    let title = document.createElement("spam");
    title.className = "title";
    title.textContent = question.title;
    questionInfos.appendChild(title);

    // Create spams for title and author
    let actions = document.createElement("div");
    actions.className = "actions";
    card_body.appendChild(actions);

    let editAction = document.createElement("img");
    editAction.src = "../../img/edit.svg";
    editAction.addEventListener("click", editQuestion);
    actions.appendChild(editAction);

    let trashAction = document.createElement("img");
    trashAction.src = "../../img/trash.png";
    trashAction.addEventListener("click", removeQuestion);
    actions.appendChild(trashAction);

    let card_footer = document.createElement('div')
    card_footer.className = 'card_footer'
    card.appendChild(card_footer)
    for(let A=0; A<4; A++){
      let span = document.createElement('span')
      span.className = 'showAnswer'
      if(A==0){span.textContent = question.choiceA;if(question.correct=='A'){span.classList.add('goodAnswer')}}
      if(A==1){span.textContent=question.choiceB;if(question.correct=='B'){span.classList.add('goodAnswer')}}
      if(A==2){span.textContent = question.choiceC;if(question.correct=='C'){span.classList.add('goodAnswer')}}
      if(A==3){span.textContent=question.choiceD;if(question.correct=='D'){span.classList.add('goodAnswer')}}
      card_footer.appendChild(span)
    }
    console.log('card_footer; ', card_footer);
  }
}

function editQuestion(event) {
  //  Get the question index
  questionToEdit = event.target.parentElement.parentElement.parentElement.dataset.index;

  // update the dialog with question informatin
  let question = questions[questionToEdit];
  document.getElementById("title").value = question.title;
  document.getElementById("choiceA").value = question.choiceA;
  document.getElementById("choiceB").value = question.choiceB;
  document.getElementById("choiceC").value = question.choiceC;
  document.getElementById("choiceD").value = question.choiceD;
  // show your correct answers
  document.querySelectorAll('.radio').forEach(answer =>{
    if (answer.value == question.correct){
      answer.checked=true;
    }
  })

  // Show the dialog
  dom_createEditButton.textContent = "EDIT";
  show(dom_questions_dialog);
}

function removeQuestion(event) {
  //  Get index
  let index = event.target.parentElement.parentElement.parentElement.dataset.index;

  // Remove question
  questions.splice(index, 1);

  // Save to local storage
  saveQuestions();

  // Update the view
  renderQuestions();
}

function onAddQuestion() {
  show(dom_questions_dialog);
  document.getElementById("createEditButton").textContent='Create';
  clearValue()
}

function onCancel(e) {
  dom_createEditButton.textContent = "CREATE";
  hide(dom_questions_dialog);
}

function onCreate() {
  hide(dom_questions_dialog);
  let rightAnswer=''
  let question = document.getElementById("title").value;
  let answerA = document.getElementById("choiceA").value;
  let answerB = document.getElementById("choiceB").value;
  let answerC = document.getElementById("choiceC").value;
  let answerD = document.getElementById("choiceD").value;
  document.querySelectorAll('.radio').forEach(answer =>{if(answer.checked){rightAnswer=answer.value}})
  if(question !=''|| answerA !="" || answerB !=""|| answerC !="" ||answerD !=""){
    if (questionToEdit !== null) {
      let editQuestion = questions[questionToEdit];
      editQuestion.title = question;
      editQuestion.correct = rightAnswer;
      console.log('Good answer is: ', rightAnswer);
      editQuestion.choiceA = answerA;
      editQuestion.choiceB = answerB;
      editQuestion.choiceC = answerC;
      editQuestion.choiceD = answerD;
      
    } else {
      let newQuestion = {};
      newQuestion.title = document.getElementById("title").value;
      newQuestion.correct = rightAnswer;
      console.log('Good answer is: ', rightAnswer);
      newQuestion.choiceA = answerA;
      newQuestion.choiceB = answerB;
      newQuestion.choiceC = answerC;
      newQuestion.choiceD = answerD;
      questions.push(newQuestion);
    }
    // 2- Save question
    saveQuestions();

    // 3 - Update the view
    renderQuestions();
  }
  
}

// MAIN  ---------------------------------------------------------

loadQuestions();

renderQuestions();

// CLEAR VALUES

function clearValue(){
  questionToEdit = null
  document.getElementById("title").value = "" 
  document.getElementById("choiceA").value = ""
  document.getElementById("choiceB").value = ""
  document.getElementById("choiceC").value = ""
  document.getElementById("choiceD").value = ""
  unreleaseCheck()
  
}

function unreleaseCheck(){document.querySelectorAll('.radio').forEach(answer =>{answer.checked=false;})}