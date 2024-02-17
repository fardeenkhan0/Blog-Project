const BlogModel = require("../../models/Blog");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmhos5nnv",
  api_key: "635444285841289",
  api_secret: "PJX7WiOOCe1p5AntC-l0OTmnUFc",
});

class BlogController {
  static displayBlog = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      const data = await BlogModel.find();
      //console.log(data);
      res.render("admin/blog/display", {
        d: data,
        name: name,
        email: email,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static insertBlog = async (req, res) => {
    try {
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      //console.log(myimage);

      const result = new BlogModel({
        title: req.body.title,
        descripition: req.body.descripition,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await result.save();
      //console.log(result);
      res.redirect("./admin/blog/display");
    } catch (error) {
      console.log(error);
    }
  };
  static blogview = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      //console.log(req.params.id);
      const result = await BlogModel.findById(req.params.id);
      //console.log(result);
      res.render("admin/blog/view", {
        view: result,
        name: name,
        email: email,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static blogedit = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      //console.log(req.params.id);
      const result = await BlogModel.findById(req.params.id);
      //console.log(result);, {
      res.render("admin/blog/edit", {
        edit: result,
        name: name,
        email: email,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static blogupdate = async (req, res) => {
    try {
      const { name, email, profileimage } = req.admin;
      //console.log(req.params.id);
      //console.log(req.body);
      // delete image
      const blog = await BlogModel.findById(req.params.id);
      const imageid = blog.image.public_id;
      //console.log(imageid);
      await cloudinary.uploader.destroy(imageid);
      //update image
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      const update = await BlogModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        descripition: req.body.descripition,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await update.save();

      res.redirect("/admin/blog/display");
    } catch (error) {
      console.log(error);
    }
  };
  static blogdelete = async (req, res) => {
    try {
      const blog = await BlogModel.findById(req.params.id);
      const imageid = blog.image.public_id;
      //console.log(imageid);
      await cloudinary.uploader.destroy(imageid);
      await BlogModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/blog/display");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = BlogController;
