
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.poi = function(req, res){
  console.log(req.params[0]);
  res.render('poi');
};
