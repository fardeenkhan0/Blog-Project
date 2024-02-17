const express = require("express");
const FrontController = require("../Controllers/FrontController");
const AdminController = require("../Controllers/admin/AdminController");
const TeacherController = require("../Controllers/TeacherController");
const BlogController = require("../Controllers/admin/BlogController");
const CategoryController = require("../Controllers/admin/CategoryController");
const checkAdminAuth = require("../middleware/auth");
const ContactController = require("../Controllers/admin/ContactController");
const route = express.Router();

route.get("/", FrontController.login);
route.get("/home", checkAdminAuth, FrontController.home);
route.get("/about", checkAdminAuth, FrontController.about);
route.get("/contact", checkAdminAuth, FrontController.contact);
route.get("/blog", checkAdminAuth, FrontController.blog);
route.get("/blog-detail/:id", checkAdminAuth, FrontController.blogdetail); //error/:id
route.get("/register", FrontController.register);
route.get("/logout", FrontController.logout);
route.get("/profile", checkAdminAuth,FrontController.profile);
route.post("/updateProfile", checkAdminAuth, FrontController.updateProfile);

// route.get("/blog-detail", FrontController.blogDetail);

route.get("/teacher/display", TeacherController.Display);

route.get("/admin/dashboard", checkAdminAuth, AdminController.dashboard);
route.post("/insertregister", AdminController.insertregister);
route.post("/verifylogin", AdminController.verifylogin);

//blog-controller
route.get("/admin/blog/display", checkAdminAuth, BlogController.displayBlog);
route.post("/insertblog", checkAdminAuth, BlogController.insertBlog);
route.get("/blogview/:id", checkAdminAuth, BlogController.blogview);
route.get("/blogedit/:id", checkAdminAuth, BlogController.blogedit);
route.post("/blogupdate/:id", checkAdminAuth, BlogController.blogupdate);
route.get("/blogdelete/:id", checkAdminAuth, BlogController.blogdelete);

// route.post("/insertcontact", checkAdminAuth, ContactController.insertcontact);

route.get("/admin/blog/Category", CategoryController.CategoryDisplay);

module.exports = route;
