var express = require("express");
var app = express();
var db = require("./middlewares/db");
app.use(express.static("public"));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.listen(3000);


app.use('/', require('./routes/route.login'));
app.use('/', require('./routes/route.todolist'))