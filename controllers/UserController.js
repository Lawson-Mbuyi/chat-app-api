export const UserLogin = (req, res) => {
    res.render("home", {
      user: req.user,
    });
  };
  export const getUserProfile = (req, res) => {
    res.render("home");
  };