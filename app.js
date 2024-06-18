const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes")
/* Reading global variables from config file */

const PORT = process.env.PORT;

/*
 *
 * Express setup
 *
*/

const app = express();
app.use(session({
    secret: "weathertop",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

//turn on serving static files (required for delivering css to client)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

//configure template engine
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set("views", "./views");
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(PORT, function() {
  console.log(`Weathertop running and listening on port ${PORT}`);
});
