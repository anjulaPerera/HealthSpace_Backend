module.exports = function(app){

    const OrganizationAuthController = require("../controllers/OrganizationAuthController");

    app.post("/register_organization", OrganizationAuthController.registerOrganization);
    app.post("/login_organization",OrganizationAuthController.loginOrganization);


}
