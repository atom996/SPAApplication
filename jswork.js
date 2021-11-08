var testJson = [
  {
    testOne: "Test1",
    testTwo: "Test2",
    testThree: "Test3"
  },
  {
    testFour: "Test4",
    testFive: "Test5",
    testSix: "Test6"
  },
  {
    testSeven: "Test7",
    testEight: "Test8",
    testNine: "Test9"
  }
];

var testFunction = (view_id, testIndex) => {
  console.log("Testing...");
  var source = document.querySelector(view_id).innerHTML;
  var template = Handlebars.compile(source);
  var html = template(testJson[testIndex]);

  document.querySelector("#view_widget").innerHTML = html;
}
