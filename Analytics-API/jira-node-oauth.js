var express = require('express');
var session = require('express-session');
var OAuth = require('oauth').OAuth;
var fs = require('fs');
var app = express();
app.use(session({ secret: "red" }));
app.get('/', function(req, res) {
    res.send("Hello World!");
});

let oauthToken = '';
let oauthTokenSecret = '';
var base_url = "http://ecomjirb04.edc.cingular.net:8081";
app.get('/jira', function(req, res) {
    var oa = new OAuth(
        base_url + "/plugins/servlet/oauth/request-token", 
        base_url + "/plugins/servlet/oauth/access-token", 
        "mykey", fs.readFileSync('jira.pem', 'utf8'), '1.0', "http://localhost:3000/jira/callback", "RSA-SHA1"); 
oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret) {
if (error) {
    console.log(error.data);
    res.send('Error getting OAuth access token');
} else {
  

   req.session.oa = oa;
    req.session.oauth_token = oauthToken;
    req.session.oauth_token_secret = oauthTokenSecret;
    return res.redirect(base_url + "/plugins/servlet/oauth/authorize?oauth_token=" + oauthToken);
 }
});
});

app.get('/jira/callback', function(req, res) {
    var oa = new OAuth(req.session.oa._requestUrl,
    req.session.oa._accessUrl,
    req.session.oa._consumerKey,
    fs.readFileSync('./jira.pem', 'utf8'),
    req.session.oa._version,
    req.session.oa._authorize_callback,
    req.session.oa._signatureMethod);
    oa.getOAuthAccessToken(
        req.session.oauth_token,
        req.session.oauth_token_secret,
        req.param('oauth_verifier'),
    function(error, oauth_access_token, oauth_access_token_secret, results2) {
if (error) {
console.log('error');
console.log(error);
} else {

// store the access token in the session
req.session.oauth_access_token= oauthToken = oauth_access_token;
req.session.oauth_access_token_secret= oauthTokenSecret = oauth_access_token_secret;
res.send({
    message: "successfully authenticated.",
    access_token: oauth_access_token,
    secret: oauth_access_token_secret
    });
}
});
});

app.get('/projects', function(req, res) {
    console.log('/projects called');
var consumer = new OAuth(base_url+"/plugins/servlet/oauth/request-token",base_url+"/plugins/servlet/oauth/access-token",
"mykey",fs.readFileSync('jira.pem', 'utf8'),'1.0',"http://localhost:3000/jira/callback",
"RSA-SHA1"
);
function callback(error, data, resp) {
    console.log("data,", data, "error,", error); 
    return res.send(data);
}
consumer.get(base_url+"/rest/api/2/project",
oauthToken, //authtoken
oauthTokenSecret, //oauth secret
callback);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});