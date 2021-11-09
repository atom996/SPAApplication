
//DOMContentLoaded event listener, for loading in all of the events.
document.addEventListener('DOMContentLoaded', () => {
  // Set the state

});

//Asynchronous function that retireves the question data from the fake backend.
async function fetch_question_data(link, placement) {
  try {
    const dataRetrieval = await fetch(link);

    const result = await dataRetrieval.json().then(function(questions) {
      const questionReturn = questions[placement].question;
      console.log(questionReturn);
      return questionReturn;
    });

    console.log(dataRetrieval);
  } catch (err) {
    console.error(err);
  }
}

async function fetch_answer_data(link, placement) {
  try {
    const dataRetrieval = await fetch(link);

    const result = await dataRetrieval.json().then(function(answers) {
      const answerReturn = answers[placement].answer;
      console.log(answerReturn);
      return answerReturn;
    });

    console.log(dataRetrieval);
  } catch (err) {
    console.error(err);
  }
}

function testFunc(){
  //fetch_question_data("https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions",3);
  const x = fetch_answer_data("https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions",3);
  console.log(x);
}


//Renderer for Handlebars.js
var renderBar_function = (view_id, dataIndex) => {
  //Console log to ensure that the function is running.
  console.log("Rendering new view...");
  //Source variable that is set to the innerHTML of the specified <div> element.
  var source = document.querySelector(view_id).innerHTML;
  //Template variable that utilizes Handlebars.js to compile a template for the source.
  var template = Handlebars.compile(source);
  //HTML variable that will replace the innetHTML of the <div> element.
  var html = template(testJson[dataIndex]);
  //return value.
  return html;
}
