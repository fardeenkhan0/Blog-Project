const AdminModel = require("../../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmhos5nnv",
  api_key: "635444285841289",
  api_secret: "PJX7WiOOCe1p5AntC-l0OTmnUFc",
});

class AdminController {
  static dashboard = async (req, res) => {
    const { name, email, profileimage } = req.admin;
    res.render("admin/dashboard", {
      name: name,
      email: email,
      profileimage: profileimage,
    });

    try {
    } catch (error) {}
  };
  static insertregister = async (req, res) => {
    // const { name, email, password, confirmpassword } = req.body;
    // const profileimage = req.files.profileimage;
    // //console.log(profileimage);
    // const profileimageupload = await cloudinary.uploader.upload(profileimage.tempFilePath, {
    //   folder: "profileprofileimage",
    // });
    //console.log(profileimageupload);
    try {
      const profileimage = req.files.profileimage;
      const profileimageupload = await cloudinary.uploader.upload(
        profileimage.tempFilePath,
        {
          folder: "profileprofileimage",
        }
      );

      const { name, email, password, confirmpassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      if (admin) {
        req.flash("error", "Email already exists");
        res.redirect("/register");
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const register = await new AdminModel({
              name: name,
              email: email,
              password: hashpassword,
              profileimage: {
                public_id: profileimageupload.public_id,
                url: profileimageupload.secure_url,
              },
            });
            await register.save();
            res.redirect("/");
          } else {
            req.flash("error", "password and confirm password does not match");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All field are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    //res.render("admin/dashboard");
    try {
      //console.log(req.body);
      const { email, password } = req.body;
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });
        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          if (ismatched) {
            const token = jwt.sign(
              { id: admin._id },
              "iamfullstackwebdeveloper"
            );
            res.cookie("token", token);
            res.redirect("/home");
          } else {
            req.flash("error", "Email or password does not match");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not register user");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All field are required");
        res.redirect("/");
      }
    } catch (error) {}
  };
}
module.exports = AdminController;
