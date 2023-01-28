module.exports = function(app){

    const DonorAuthController = require("../controllers/DonorAuthController");

    app.post("/register_donor", DonorAuthController.registerDonor);
    app.post("/login_donor",DonorAuthController.loginDonor);


}
