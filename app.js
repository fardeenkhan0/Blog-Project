const express = require("express");
const app = express();
const port = 1000;
const web = require("./routes/web");
const connectDB = require("./db/connectdb");
const fileUpload = require("express-fileupload");
var cloudinary = require("cloudinary");
var session = require("express-session");
var flash = require("connect-flash");
const cookieParser = require("cookie-parser");

//token get
app.use(cookieParser());
//conect db
connectDB();
// to convert url data in json form
app.use(express.urlencoded({ extended: false }));

//for file upload
app.use(fileUpload({ useTempFiles: true }));

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

//router load
app.use("/", web);

//template server
app.set("view engine", "ejs");

//public folder set up
app.use(express.static("public"));

//server create
app.listen(port, () => {
  console.log(`SERVER START ${port}`);
});
