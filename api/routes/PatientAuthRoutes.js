module.exports = function(app){

    const PatientAuthController = require("../controllers/PatientAuthController");

    app.post("/register_patient", PatientAuthController.registerPatient);
    app.post("/login_patient",PatientAuthController.loginPatient);


}
