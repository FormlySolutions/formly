
/*
 * GET signin.
 */

exports.get = function(req, res){
  res.render('../views/pages/signin', { title: 'Express' });
};
exports.post = function(req, res){
    let options = {
            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: false, // The cookie only accessible by the web server
            signed: false // Indicates if the cookie should be signed
        }
    res.cookie('user_authenticated', 'true', options);
	res.redirect("/app");
};