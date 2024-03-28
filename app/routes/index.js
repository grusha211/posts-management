// const ssvQARoutes = require("./ssvQARoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
// const authRoutes = require("./authRoutes");

const initRoutes = (app) => {
  // app.use("/ssvqa", ssvQARoutes());
  app.use("/user", userRoutes());
  app.use("/posts",postRoutes());
  // app.use("/auth", authRoutes());
};

module.exports = initRoutes;
