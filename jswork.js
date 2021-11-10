function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const complimentArray = ["Amazing","Well Done!","Incredible!","Fantastic"];

const quizState = [
  {
    currentQuestion: 0,
    type: "",
    questionsRight: 0,
    questionsWrong: 0
  }
];
//Asynchronous function that retireves the question data from the fake backend.
async function fetch_question_data(link, placement) {
  try {
    const dataRetrieval = await fetch(link);

    const result = await dataRetrieval.json().then(function(questions) {
      console.log(questions[placement].question);
      return questions[placement].question;
    });

    console.log(dataRetrieval);
  } catch (err) {
    console.error(err);
  }
}

//Initializes the quizes based on the option selected from the dropdown
function firstTFQuestInit(){
  document.getElementById('progressList').innerHTML = "";
  if(document.getElementById('dropSelect').value == 'opOne') {
    renderBar_function("#firstTFQuestion", 0, "https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
    quizState.type = "tf";
    quizState.currentQuestion = 0;
    quizState.questionsWrong = 0;
    quizState.questionsRight = 0;
    document.getElementById("rightAnswerCount").innerHTML = "Questions Right:"
    document.getElementById("wrongAnswerCount").innerHTML = "Questions Wrong:"
    console.log(quizState.type);
  } else if(document.getElementById('dropSelect').value == 'opTwo') {
    renderBar_function("#firstTIQuestion", 0, "https://my-json-server.typicode.com/atom996/SPAApplication/textInputQuestions");
    quizState.type = "ti";
    quizState.currentQuestion = 0;
    quizState.questionsWrong = 0;
    quizState.questionsRight = 0;
    document.getElementById("rightAnswerCount").innerHTML = "Questions Right:"
    document.getElementById("wrongAnswerCount").innerHTML = "Questions Wrong:"
    console.log(quizState.type);

  } else {
    alert('Please pick a quiz type!');
  }
  var node = document.createElement('li');
  node.appendChild(document.createTextNode('Question 1'));
  document.getElementById('progressList').appendChild(node);
}

function answerReview(){
  if (quizState.type == "tf") {
    alert("test");
  } else if (quizState.type == "ti") {
    alert("test ti");
  }
}
//Function for testing user input if true is selected in True/False questions
function answerTrueReview() {
  fetch("https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions").then(response => {
    return response.json();
  }).then( (data) => {
      if(data[quizState.currentQuestion].answer == "false"){
        quizState.questionsWrong += 1;
        quizState.currentQuestion += 1;
        document.getElementById("wrongAnswerCount").innerHTML = `Questions Wrong: ${quizState.questionsWrong}`;
        renderBar_function("#firstTFQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
        document.getElementById('progressList').appendChild(node);
      } else {
        quizState.questionsRight += 1;
        quizState.currentQuestion += 1;
        document.getElementById("rightAnswerCount").innerHTML = `Questions Right: ${quizState.questionsRight}`;
        renderBar_function("#firstTFQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
        document.getElementById('progressList').appendChild(node);
      }
  }).catch(
    (err) => {
      console.error(err);
    }
  )
}
//Similar function to the one above, but for the false choice.
function answerFalseReview() {
  fetch("https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions").then(response => {
    return response.json();
  }).then( (data) => {
      if(data[quizState.currentQuestion].answer == "true"){
        quizState.questionsWrong += 1;
        quizState.currentQuestion += 1;
        document.getElementById("wrongAnswerCount").innerHTML = `Questions Wrong: ${quizState.questionsWrong}`;
        renderBar_function("#firstTFQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
        document.getElementById('progressList').appendChild(node);
      } else {
        quizState.questionsRight += 1;
        quizState.currentQuestion += 1;
        document.getElementById("rightAnswerCount").innerHTML = `Questions Right: ${quizState.questionsRight}`;
        renderBar_function("#firstTFQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
        document.getElementById('progressList').appendChild(node);
      }
  }).catch(
    (err) => {
      console.error(err);
    }
  )
}
//hello
//Renderer for Handlebars.js
var renderBar_function = (view_id, dataIndex, link) => {
  //Console log to ensure that the function is running.
  console.log("Rendering new view...");
  //Source variable that is set to the innerHTML of the specified <div> element.
  var source = document.querySelector(view_id).innerHTML;
  //Template variable that utilizes Handlebars.js to compile a template for the source.
  var template = Handlebars.compile(source);
  //HTML variable that will replace the innetHTML of the <div> element.
  //var html = template(testJson[dataIndex]);

  fetch(link).then(response => {
    return response.json();
  }).then( (data) => {
      var html = template({'quesOne' : data[dataIndex].question}, {'quesNum' : quizState.currentQuestion});
      document.querySelector("#view_widget").innerHTML = html;
  }).catch(
    (err) => {
      console.error(err);
    }
  )
  //return value.
}
