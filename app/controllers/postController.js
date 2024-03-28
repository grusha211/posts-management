const Post = require("../models/postModel");
const User = require('../models/userModel');


class postController{
    static async createPost(req, res){
        try {
            const { title, body, active, latitude, longitude } = req.body;
            const createdBy = req.user._id;
            const post = new Post({ title, body, active, createdBy, location: { type: 'Point', coordinates: [latitude, longitude] } });
            await post.save();
            res.status(201).json(post);
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
    }
    static async readPost(req,res){
        try {
            const posts = await Post.find({ createdBy: req.user._id });
            res.json(posts);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    static async updatePost(req,res){
        try {
            const { title, body, active, latitude, longitude } = req.body;
            const post = await Post.findByIdAndUpdate(req.params.id, { title, body, active, location: { type: 'Point', coordinates: [latitude, longitude] } }, { new: true });
            if (!post) {
              return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
    }
    static async deletePost(req,res){
        try {
            const postId = req.params.id;
            const createdBy = req.user._id; 
            const post = await Post.findOneAndDelete({ _id: postId, createdBy });
            if (!post) {
              return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    static async searchPost(req,res){
        try {
            const { latitude, longitude } = req.query;
            const radius = 10000; // 10 kilometers
            const posts = await Post.find({
              location: {
                $near: {
                  $geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                  },
                  $maxDistance: radius
                }
              }
            });
            res.json(posts);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    static async countPosts(req,res){
        try {
            const activeCount = await Post.countDocuments({ active: true });
            const inactiveCount = await Post.countDocuments({ active: false });
            res.json({ activeCount, inactiveCount });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}

module.exports = postController