'use strict';
const adminModel = require('../adminModel.js');
var fs = require('fs');

module.exports.login = function(req,res){
	var username = req.body.username;
	var pass = req.body.password;
	var result = {};
  adminModel.findOne({'username':username,'password':pass},function(err,users) {
    if(users){
    	req.session.admin = users;
    	result = {error:0, user: users};

    }else{
    	result = {error:1,user:req.session.admin};
    }
    res.send(result);
  });
}

module.exports.logOut = function (req,res) {
	if(req.session.admin) req.session.destroy();
  res.send('OK');
}

module.exports.createDummy = function (req,res) {
	var result = [];
	var newAdmin = new adminModel({
		username : 'admin',
		password : 'admin123',
	});
	newAdmin.save(function (err,save) {

		if(err){
			result = {error:1,msg:err};
		}else{
			result = {error:0,msg:"User Created"};
		}
		res.send(result);
	});
}
