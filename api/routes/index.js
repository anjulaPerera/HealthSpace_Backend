var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.send('Welcome to API!');
});

require('./PatientAuthRoutes')(router);
require('./DonorAuthRoutes')(router);
require('./HospitalAuthRoutes')(router);
require('./OrganizationAuthRoutes')(router);
require('./PostRoutes')(router);

module.exports.router=router;