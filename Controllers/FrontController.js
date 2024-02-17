const BlogModel = require("../models/Blog");
const CategoryModel = require("../models/Category");
const AdminModel = require("../models/admin");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmhos5nnv",
  api_key: "635444285841289",
  api_secret: "PJX7WiOOCe1p5AntC-l0OTmnUFc",
});
class FrontController {
  static login = async (req, res) => {
    res.render("login", { message: req.flash("error") });
  };
  static home = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;

      const blogs = await BlogModel.find().sort({ _id: -1 }).limit(6);
      //console.log(blogs);
      res.render("home", {
        b: blogs,
        name: name,
        email: email,
        profileimage: profileimage,
      });
      //console.log(profileimage);
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      res.render("about", {
        name: name,
        email: email,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      res.render("contact", {
        name: name,
        email: email,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static blog = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      const blogs = await BlogModel.find();
      res.render("blog", {
        b: blogs,
        name: name,
        email: email,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static blogdetail = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      //console.log(req.params.id);
      const detail = await BlogModel.findById(req.params.id); //error
      const recentblog = await BlogModel.find().limit(6);
      const category = await CategoryModel.find();
      //console.log(detail);
      //console.log(recentblog);
      res.render("blog-detail", {
        d: detail,
        r: recentblog,
        c: category,
        name: name,
        email: email,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;

      res.render("profile", {
        name: name,
        profileimage: profileimage,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.admin;
      const { name, email, profileimage } = req.admin;

      //console.log(req.files.image);

      if (req.files) {
        const admin = await AdminModel.findById(id);
        const imageID = admin.profileimage.public_id;
        //console.log(imageID);

        //deleting
        await cloudinary.uploader.destroy(imageID);

        //new image
        const imagefile = req.files.profileimage;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "profileimage",
          }
        );
        var data = {
          name: name,
          email: email,
          profileimage: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await AdminModel.findByIdAndUpdate(id, data);

      // req.flash("success", "update Profile successfully");
      res.render("profile", {
        name: name,
        profileimage: profileimage,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //   static changepassword = async (req, res) => {
  //     try {
  //       const { op, np, cp } = req.body;
  //       const { id } = req.userdata;
  //       if (op && np && cp) {
  //         const user = await UserModel.findById(id);
  //         const isMatched = await bcrypt.compare(op, user.password);
  //         console.log(isMatched);
  //         if (!isMatched) {
  //           req.flash("error", "current password is incorrect");
  //           res.redirect("/profile");
  //         } else {
  //           if (np != cp) {
  //             req.flash("error", "password does not match");
  //             res.redirect("/profile");
  //           } else {
  //             const newHashPassword = await bcrypt.hash(np, 10);
  //             await UserModel.findByIdAndUpdate(id, {
  //               password: newHashPassword,
  //             });
  //             req.flash("success", "password updated successfully");
  //             res.redirect("/");
  //           }
  //         }
  //       } else {
  //         req.flash("error", "all fields are required");
  //         res.redirect("/profile");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
}

module.exports = FrontController;
