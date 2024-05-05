import mongoose from "mongoose";
import postSchema from "../schema/postSchema.js";

const PostModel = mongoose.model("Post", postSchema);

export default class PostRepository {
  async createPost(postData) {
    try {
      const newPost = new PostModel(postData);
      await newPost.save();
      return newPost;
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  async getPostsByUser(userId) {
    try {
      const posts = await PostModel.find({ createdBy: userId });
      return posts;
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }

  async getPostById(id) {
    try {
      const post = await PostModel.find({ _id: id });
      return post;
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }

  async getAllPosts() {
    try {
      const posts = await PostModel.find();
      return posts;
    } catch (error) {
      throw new Error(`Error fetching all posts: ${error.message}`);
    }
  }

  async updatePost(postId, postData) {
    try {
      const post = await PostModel.findByIdAndUpdate(postId, postData, {
        new: true,
      });
      return post;
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  async deletePost(postId) {
    try {
      await PostModel.findByIdAndDelete(postId);
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }

  async getPostByLocation(latitude, longitude) {
    try {
      const post = PostModel.find({
        geoLocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
          },
        },
      });

      return post;
    } catch (error) {
      throw new Error(`Error finding post: ${error.message}`);
    }
  }

  async countActivePosts() {
    try {
      return await PostModel.countDocuments({ active: true });
    } catch (error) {
      throw new Error(`Error conting post: ${error.message}`);
    }
  }

  async countInactivePosts() {
    try {
      return await PostModel.countDocuments({ active: false });
    } catch (error) {
      throw new Error(`Error conting post: ${error.message}`);
    }
  }
}
