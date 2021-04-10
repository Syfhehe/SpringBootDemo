/* See license.txt for terms of usage */

function onExecuteTest() {
  var request = new XMLHttpRequest();
  request.open("GET", "url-params.php?value1=1&amp;value2=2&amp;value3=3", true);
  request.send(null);
}

function onGetSmallImage() {
  var request = new XMLHttpRequest();
  request.open("GET", "small-image.png?a=1000&b=2000", true);
  request.send(null);
}

function onGetBigImage()  {
  var request = new XMLHttpRequest();
  request.open("GET", "big-image.jpg", true);
  request.send(null);
}

function onPostData()  {
  var postData = '{"a": "test", "c": "json", "b": "in the post body", sub: {a: 100}}';
  var request = new XMLHttpRequest();
  request.open("POST", "test.json", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Content-Length", postData.length);
  request.send(postData);
}

function onGetHar() {
  var options = {
  };

  console.log("-> triggering export...");

  var start = Date.now();
  HAR.triggerExport(options).then(function(harLog) {
    var ellapsed = Date.now() - start;
    console.log("-> Done! (" + ellapsed + "ms)", harLog);
    var eleLink = document.createElement('a');
    eleLink.download = "har1";
    eleLink.style.display = 'none';
    var blob = new Blob([JSON.stringify(harLog)], {type:"text/plain"});
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  });
}

function onAddRequestListener() {
  HAR.addRequestListener(onRequestFinished);
}

function onRemoveRequestListener() {
  HAR.removeRequestListener(onRequestFinished);
}

function onRequestFinished(request) {
  console.log("-> onRequestFinished", request);
}
