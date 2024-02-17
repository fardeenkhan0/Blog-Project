const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin");

const checkAdminAuth = async (req, res, next) => {
  //console.log("middleware auth");
  const { token } = req.cookies; //token get
  //console.log(token);
  if (!token) {
    req.flash("error", "Unauthorized Login");
    res.redirect("/");
  } else {
    const data = jwt.verify(token, "iamfullstackwebdeveloper");
    //console.log(data);
    //data get
    const admin = await AdminModel.findOne({ _id: data.id });
    //console.log(admin);
    req.admin = admin;
    next();
  }
};

module.exports = checkAdminAuth;
