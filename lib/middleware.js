module.exports = function( postModel, env ) {

  var Post 			= postModel,
      request 	= require('request');



  return {


  create: function(req,res){
	var id = req.params.id;
  var person_data = {
    email: "ali@ali.com",
    title: "another one",
    _id: "1",
    content: "<h2>hee</h2>",
    author: "Ali Al Dallal"
};


	var post = new Post(person_data);
		post.save(function (err) {
  		if (err) 
  			res.json(err);
		})



},

  	getPost: function( req, res, next ) {
    var id = req.params.id,
		url = env.get("ELASTIC_SEARCH_QUERY")+id;

		request( url, function(error, req, body ){

			if (error){
				res.json(error.message);
			}

			var parsed = JSON.parse(body); 

			if (!parsed._source) {
				res.status( 404 );
    		return res.render( 'error.html', { code: 404, message: "Page not found :(" });
			}

  		return res.render("single.html", parsed._source);
  });
	}
};
};