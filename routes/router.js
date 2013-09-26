var actor = require('./actor'),
	movie = require('./movies');

exports.do_work = function(req, res){
  // console.log(req.query.submitButton);
  if (req.query.submitButton == 'Show actors') {
  		actor.do_work(req, res);
  }
  else if(req.query.submitButton == 'Show movies'){
  		movie.do_work(req, res);
  };
  // else{

  // };
};