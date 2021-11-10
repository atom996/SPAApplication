function getRandom() {
  return Math.floor(Math.random() * 4);
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
        renderSuggestion_function("#suggestIdTF",quizState.currentQuestion - 1, "https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
      } else if (quizState.currentQuestion == 4){
          if (quizState.questionsRight >= 4) {
            renderPassed_function('#passedId');
          } else {
            renderFailed_function('#failedId');
          }
      }else {
        var ranum = getRandom();
        quizState.questionsRight += 1;
        quizState.currentQuestion += 1;
        document.getElementById("rightAnswerCount").innerHTML = `Questions Right: ${quizState.questionsRight}`;
        renderBar_function("#firstTFQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
        document.getElementById('progressList').appendChild(node);
        document.getElementById('goodMessage').innerHTML = complimentArray[ranum];
        setTimeout(() => {document.getElementById('goodMessage').innerHTML="";},1000);
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
        renderSuggestion_function("#suggestIdTF",quizState.currentQuestion - 1, "https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
      } else if (quizState.currentQuestion == 4){
          if (quizState.questionsRight >= 4) {
            renderPassed_function('#passedId');
          } else {
            renderFailed_function('#failedId');
          }
      }else {
        var ranum = getRandom();
        quizState.questionsRight += 1;
        quizState.currentQuestion += 1;
        document.getElementById("rightAnswerCount").innerHTML = `Questions Right: ${quizState.questionsRight}`;
        renderBar_function("#firstTFQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
        document.getElementById('progressList').appendChild(node);
        document.getElementById('goodMessage').innerHTML = complimentArray[ranum];
        setTimeout(() => {document.getElementById('goodMessage').innerHTML="";},1000);
      }
  }).catch(
    (err) => {
      console.error(err);
    }
  )
}
//Function for the Text Input Answers
function answerTextReview() {
  fetch("https://my-json-server.typicode.com/atom996/SPAApplication/textInputQuestions").then(response => {
    return response.json();
  }).then( (data) => {
      if(data[quizState.currentQuestion].answer != document.getElementById('textAns').value){
        quizState.questionsWrong += 1;
        quizState.currentQuestion += 1;
        document.getElementById("wrongAnswerCount").innerHTML = `Questions Wrong: ${quizState.questionsWrong}`;
        renderSuggestion_function("#suggestIdTI",quizState.currentQuestion - 1, "https://my-json-server.typicode.com/atom996/SPAApplication/textInputQuestions");
      } else if (quizState.currentQuestion == 4){
          if (quizState.questionsRight >= 4) {
            renderPassed_function('#passedId');
          } else {
            renderFailed_function('#failedId');
          }
      }else {
        var ranum = getRandom();
        quizState.questionsRight += 1;
        quizState.currentQuestion += 1;
        document.getElementById("rightAnswerCount").innerHTML = `Questions Right: ${quizState.questionsRight}`;
        renderBar_function("#firstTIQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/textInputQuestions");
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
        document.getElementById('progressList').appendChild(node);
        document.getElementById('goodMessage').innerHTML = complimentArray[ranum];
        setTimeout(() => {document.getElementById('goodMessage').innerHTML="";},1000);
      }
  }).catch(
    (err) => {
      console.error(err);
    }
  )
}

function continueTFFunction() {
  if (quizState.currentQuestion == 4){
      if (quizState.questionsRight >= 4) {
        renderPassed_function('#passedId');
      } else{
          renderFailed_function('#failedId');
      }
  } else {
    renderBar_function("#firstTFQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
    var node = document.createElement('li');
    node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
    document.getElementById('progressList').appendChild(node);
  }
}

function continueTIFunction() {
  if (quizState.currentQuestion == 4){
      if (quizState.questionsRight >= 4) {
        renderPassed_function('#passedId');
      } else{
          renderFailed_function('#failedId');
      }
  } else {
    renderBar_function("#firstTIQuestion",quizState.currentQuestion,"https://my-json-server.typicode.com/atom996/SPAApplication/textInputQuestions");
    var node = document.createElement('li');
    node.appendChild(document.createTextNode(`Question ${quizState.currentQuestion + 1}`));
    document.getElementById('progressList').appendChild(node);
  }
}

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

//renders the suggestions
var renderSuggestion_function = (view_id, dataIndex, link) => {

  console.log("Rendering new view...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);


  fetch(link).then(response => {
    return response.json();
  }).then( (data) => {
      var html = template({'suggestQues' : data[dataIndex].options});
      document.querySelector("#view_widget").innerHTML = html;
  }).catch(
    (err) => {
      console.error(err);
    }
  )
  //return value.
}

//rendering the completed quiz
var renderFailed_function = (view_id) => {

  console.log("Rendering new view...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'resultOne' : quizState.questionsWrong});

  document.querySelector("#view_widget").innerHTML = html;

  //return value.
}

var renderPassed_function = (view_id) => {

  console.log("Rendering new view...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'resultOne' : quizState.questionsRight});

  document.querySelector("#view_widget").innerHTML = html;

  //return value.
}
