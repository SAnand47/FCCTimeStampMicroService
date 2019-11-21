// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  //  res.send('hello')
  res.json({ greeting: "hello API" });
});

console.log((new Date("2015-06").getTime()),(new Date("2015-06").toUTCString())); //-- for testing
// console.log(new Date("ggfeg"));
// console.log(new Date(1450137600000));

//API endpoint with date
app.get("/api/timestamp/:date_string?", function(req, res) {
  // res.send(req.params.date_string) //-- for testing
  const givenDate = req.params.date_string;
  //if the date is empty
  if (!givenDate) {
    let dte = new Date();
    return res.json({ unix: Number(dte.getTime()), utc: dte.toUTCString() });
  }
  //if the date is in ms
  if(Number(givenDate)){
      let dte=new Date(Number(givenDate));
      return res.json({ unix: Number(dte.getTime()), utc: dte.toUTCString() });
  }
  //if the date is invalid
  let dte = new Date(givenDate);
  if (dte == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  return res.json({ unix: Number(dte.getTime()), utc: dte.toUTCString() });
});

// //create listening Port
// const port = process.env.PORT || 3000;
// app.listen(3000, () => console.log(`listening on port ${port}..`));


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

