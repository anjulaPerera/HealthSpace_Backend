const UseRole = require("../enums/UseRole");
const { Post } = require("../models/PostModel");




exports.createPost = async (req, res) => {


    
    var newPost = new Post(req.body);


    await newPost.save((err, post) => {
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
        })
    };
;

exports.getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalDocuments = await Post.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);
    Post.find()
        .skip(skip)
        .limit(limit)
        .exec(function(err, posts) {
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
                data: posts,
                pagination: {
                    page: page,
                    limit: limit,
                    totalPages: totalPages,
                    totalDocuments: totalDocuments
                }
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

exports.updatePost = async (req, res) => {
    await Post.findById(req.params.id, function(err, post) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid post id!"
            });
        }
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found!"
            });
        }
        post.name = req.body.name;
        post.description = req.body.description;
        post.profile_image = req.body.profile_image;
        post.city = req.body.city;

        post.save(function(err) {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to update post!",
                    data: err
                });
            }
            return res.status(200).json({
                success: true,
                message: "Post has been updated!",
                data: post
            });
        });
    });
};

exports.deletePost = async (req, res) => {
    await Post.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to delete post!",
                data: err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post has been deleted!"
        });
    });
};

