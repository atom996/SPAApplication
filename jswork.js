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
