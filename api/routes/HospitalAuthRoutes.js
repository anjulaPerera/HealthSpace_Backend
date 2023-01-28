module.exports = function(app){

    const HospitalAuthController = require("../controllers/HospitalAuthController");

    app.post("/register_hospital", HospitalAuthController.registerHospital);
    app.post("/login_hospital",HospitalAuthController.loginHospital);


}
