
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', 
	     { title: "Test page",
	       author: "Angelacoconuts",
	       texts: [
		   { key: "1", value: "My name is Eva" },
		   { key: "2", value: "I am 24 yrs old"},
		   ],
	     }
	    );
};

exports.angular = function(req, res){
  res.render('angular', { title: "Angular test page"} );
};

exports.bootstrap = function(req, res){
  res.render('bootstrap', { title: "Angular test page"} );
};
