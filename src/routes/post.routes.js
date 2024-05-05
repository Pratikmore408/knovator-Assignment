import express from "express";
import PostController from "../controller/post.controller.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.post("/create", (req, res) => {
  postController.createPost(req, res);
});

postRouter.get("/get", (req, res) => {
  postController.getPostsByUser(req, res);
});

postRouter.get("/getall", (req, res) => {
  postController.getAllPosts(req, res);
});

postRouter.put("/update/:id", (req, res) => {
  postController.updatePost(req, res);
});

postRouter.delete("/delete/:id", (req, res) => {
  postController.deletePost(req, res);
});

postRouter.get("/postsbylocation", (req, res) => {
  postController.getPostsByLocation(req, res);
});

postRouter.get("/count", (req, res) => {
  postController.getPostCounts(req, res);
});

export default postRouter;
