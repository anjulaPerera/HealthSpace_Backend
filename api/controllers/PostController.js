const UseRole = require("../enums/UseRole");
const { Post } = require("../models/PostModel");

exports.createPost = async (req, res) => {
    var newService = new Post(req.body);

    await newService.save((err, post) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create post!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New post is created!",
                data: post
            });
        }
    });
};

exports.getAllPosts = async (req, res) => {
    Post.find(function(err, posts) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive posts!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received posts!",
            data: posts
        });
    });
};


exports.getPostById = async (req, res) => {
    Post.findById(req.params.id, async function(err, post) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid post id!"
            });
        }

        if(!post) {
            return res.status(200).json({
                success: false,
                message: "Invalid post id!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post received!",
            data: post
        });
    });
};



exports.searchServices = (req, res) => {
    var searchString = req.body.city;

    if(!searchString) {
        return res.status(422).json({
            success: false,
            message: "Searach term is required!"
        });
    }
    
    Post.find({
        $or: [
            {city: {$regex: searchString, $options: 'i'}}
        ]
    }, function(err, services){
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Error filteting services!",
                data: err
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filtered services!",
            data: services
        });
    });
};


