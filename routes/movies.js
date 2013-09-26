// Connect string to Oracle
var connectData = { 
  "hostname": "cis550hw1.c5cld00masig.us-east-1.rds.amazonaws.com", 
  "user": "cis550student", 
  "password": "cis550hw1", 
  "database": "IMDB" };
var oracle =  require("oracle");

/////
// Query the oracle database, and call output_actors on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for
function query_db(res,name) {
  oracle.connect(connectData, function(err, connection) {
    if ( err ) {
    	console.log(err);
    } else {
	  	// selecting rows
	  	connection.execute(	"SELECT m.name, m.rank, a.first_name, a.last_name " + 
	  						"FROM actors a, movies m, roles r " + 
	  						"WHERE a.id = r.actor_id AND m.id = r.movie_id AND a.last_name='" + name + 
	  						"' AND rownum <= 10", 
	  			   [], 
	  			   function(err, results) {
	  	    if ( err ) {
	  	    	console.log(err);
	  	    	console.log('SQL querry is wrong');
	  	    } else {
	  	    	connection.close(); // done with the connection
	  	    	output_movies(res, name, results);
	  	    }
	
	  	}); // end connection.execute
    }
  }); // end oracle.connect
}

/////
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_movies(res,name,results) {
	res.render('movies.jade',
		   { title: "Movies acted by last name " + name,
		     results: results }
	  );
}

/////
// This is what's called by the main app 
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};