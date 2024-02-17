class TeacherController {
    static Display = async (req, res) => {
      try {
        res.render("Display", {
          error: req.flash("error"),
        });
      } catch (error) {
        console.log(error);
      }
    };
  
  }
  module.exports = TeacherController;