
//DOMContentLoaded event listener, for loading in all of the events.
document.addEventListener('DOMContentLoaded', () => {
  // Set the state

});

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

function firstTFQuestInit(){
  if(document.getElementById('dropSelect').value == 'opOne') {
    renderBar_function("#firstTFQuestion", 0, "https://my-json-server.typicode.com/atom996/SPAApplication/trueFalseQuestions");
  } else if(document.getElementById('dropSelect').value == 'opTwo') {
    renderBar_function("#firstTIQuestion", 0, "https://my-json-server.typicode.com/atom996/SPAApplication/textInputQuestions");
  } else {
    alert('Please pick a quiz type!');
  }
}

function firstTIQuestInit(){
  renderBar_function("#firstTFQuestion", 0, "https://my-json-server.typicode.com/atom996/SPAApplication/textInputQuestions");
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
      var html = template({'quesOne' : data[dataIndex].question});
      document.querySelector("#view_widget").innerHTML = html;
  }).catch(
    (err) => {
      console.error(err);
    }
  )
  //return value.
}
