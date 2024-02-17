const CategoryModel = require("../../models/Category");

class CategoryController {
  static CategoryDisplay(req, res) {
    res.render("admin/category/display");
  }
}
module.exports = CategoryController;
