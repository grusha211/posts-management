const express = require("express");
const passport = require("passport");


const {postController} = require("../controllers");

const postRoutes = () => {
  const postRoutes = express.Router();
  const authenticate = passport.authenticate('jwt', { session: false });
  postRoutes.post("/create",authenticate,postController.createPost);
  postRoutes.get("/read",authenticate, postController.readPost);
  postRoutes.put("/update/:id",authenticate, postController.updatePost);
  postRoutes.delete("/delete/:id",authenticate, postController.deletePost);
  postRoutes.get("/search",authenticate,postController.searchPost);
  postRoutes.get("/count",authenticate,postController.countPosts);

  return postRoutes;
};

module.exports = postRoutes