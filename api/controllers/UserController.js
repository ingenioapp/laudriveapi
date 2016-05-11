/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create:function(req, res){
		console.log("** create user ***");
		var user = req.allParams();
		console.log(user); 
		User.create(user).then(function(usernew){
			//console.log("user created: ", usernew);
			return res.json({msg:"ok",user:usernew});	
		})
		.catch(function(err){
			console.error(err);
			return res.json(500,{msg:"error",error:err});
		});
	}
	
};

