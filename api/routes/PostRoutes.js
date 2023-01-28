const { verifyToken } = require("../utils/verifyToken");
module.exports = function(app) {

    const PatientController = require("../controllers/PostController");
    
    app.post("/createpost",[verifyToken],PatientController.createPost);
    app.get("/posts",[verifyToken],PatientController.getAllPosts);
    app.get("/post/:id", [verifyToken], PatientController.getPostById);
};