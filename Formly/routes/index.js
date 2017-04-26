
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('../views/pages/index', { title: 'Express' });
};