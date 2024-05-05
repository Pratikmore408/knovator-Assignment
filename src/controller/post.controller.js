import PostModel from "../model/post.model.js";
import PostRepository from "../repository/post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(req, res) {
    const { title, body, active, geoLocation } = req.body;
    const createdBy = req.userID;
    console.log(createdBy);

    try {
      const newPost = new PostModel(
        title,
        body,
        createdBy,
        active,
        geoLocation
      );

      const savedPost = await this.postRepository.createPost(newPost);

      res.status(201).send(savedPost);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await this.postRepository.getAllPosts();
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getPostsByUser(req, res) {
    const createdBy = req.userID;

    try {
      const posts = await this.postRepository.getPostsByUser(createdBy);
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const { title, body, active, geoLocation } = req.body;
    const createdBy = req.userID;

    try {
      let post = await this.postRepository.getPostById(id);

      if (!post) {
        return res.status(404).send("Post not found");
      }

      for (const p of post) {
        if (p.createdBy.toString() !== createdBy) {
          return res.status(403).send({
            success: false,
            error: "You are not authorized to update this post",
          });
        }
      }

      post = await this.postRepository.updatePost(id, {
        title,
        body,
        active,
        geoLocation,
      });
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deletePost(req, res) {
    const { id } = req.params;
    const createdBy = req.userID;

    try {
      let post = await this.postRepository.getPostById(id);

      if (!post) {
        return res.status(404).send("Post not found");
      }

      for (const p of post) {
        if (p.createdBy.toString() !== createdBy) {
          return res
            .status(403)
            .send("You are not authorized to delete this post");
        }
      }

      await this.postRepository.deletePost(id);
      res.status(200).send("Post deleted SuccessFully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getPostsByLocation(req, res) {
    const { latitude, longitude } = req.query;

    try {
      const posts = await this.postRepository.getPostByLocation(
        latitude,
        longitude
      );
      console.log(posts);

      res.status(200).send(posts);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getPostCounts(req, res) {
    try {
      const activeCount = await this.postRepository.countActivePosts();
      const inactiveCount = await this.postRepository.countInactivePosts();

      res.status(200).json({ success: true, activeCount, inactiveCount });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
