const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const handlebars = require("express-handlebars");
const routes = require("./routes")

/* Reading global variables from config file */
dotenv.config();
const PORT = process.env.PORT;

/*
 *
 * Express setup
 *
*/

const app = express();

//turn on serving static files (required for delivering css to client)
app.use(express.static("public"));

//configure template engine
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set("views", "./views");
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(PORT, function() {
  console.log(`Weathertop running and listening on port ${PORT}`);
});
