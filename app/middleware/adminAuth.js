module.exports.adminAuth = function(req, res, next){
  console.log('calle');
  if(!req.session.admin){
    res.redirect('/');
  }else{
    return next();
  }
};
