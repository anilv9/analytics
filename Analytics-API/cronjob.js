var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
let fetch = require('node-fetch');
var Jira = require('./schema/abtestsschema');

var  changeDataStructure = function(data){
    var test =  {
		Test_name : data.key,
		Summary: data.fields.summary,
		Description: data.fields.description,
		URL: data.fields.customfield_10020,
		Hypothesis: data.fields.customfield_26580,
		Intake_Review : data.fields.customfield_26381,
		Test_Approach : data.fields.customfield_26383,
		Primary_Metric : data.fields.customfield_26180,
		Secondary_Metric : data.fields.customfield_26384,
		Conversion_Impact_Area: data.fields.customfield_27380,
		Metrics : data.fields.customfield_16397,
		Target_Release_Date: data.fields.customfield_14880,
		Data_Start_Date : data.fields.customfield_27185,
		Data_End_Date : data.fields.customfield_27186,
		Business_Validation_Steps: data.fields.customfield_20980,
		Target_Test_Name : data.fields.customfield_27181,
		Test_Result: data.fields.customfield_26392,
		Attachments: data.fields.attachment,
		created : data.fields.created,
		Owning_Pod : data.fields.customfield_27080,
		Platform: data.fields.customfield_26382,
		Labels: data.fields.labels
	 }

var jiraInstance = new Jira(test);
 console.log('parsed output to web-server');
Jira.findOneAndRemove({"Test_name" : test['Test_name']}, function(err, response){
   if (err) return console.error(err);
   console.log('issue added to the DB');
   jiraInstance.save(function (err, jira) {
       if (err) return console.error(err);
     });	 
});

return jiraInstance.toJSON();
}

new CronJob('1 * * * * *', function() {
    console.log('cron job started');

    mongoose.connect('mongodb://localhost/demo', (err)=>{
	if(err){
		console.log('failed to connect to mongo, please check connection.')
	}
});
mongoose.Promise = global.Promise;

    var  searchApi = 'http://jira.cingular.net/jira/rest/api/2/search';
	var startIndex = 0;
	var maxresult = 50;
	var data=  {
		"jql": "project = CRO",
		"startAt": startIndex,
		"maxResults": maxresult,
		"fields": ["summary",
					"description",
					"customfield_10020",
					"customfield_26580",
					"customfield_26381",
					"customfield_26383",
					"customfield_26180",
					"customfield_26384",
					"customfield_27380",
					"customfield_16397",
					"customfield_14880",
					"customfield_27185",
					"customfield_27186",
					"customfield_20980",
					"customfield_27181",
					"customfield_26392",
					"customfield_27080",
					"customfield_26382",
					"attachment",
					"labels",
				"created"]
	}
	fetch(searchApi,{method: "POST", body : JSON.stringify(data), 
	headers : {'Content-Type' : 'application/json', 'Accept' : 'application/json'}})
	.then(response=>response.json(),reject => console.log(reject))
	.then((json)=>{ 
		var issues  = json.issues;
		if(json.total > maxresult) {
			console.log('total is greater than maxresult')
			var promises = [];
			for(let i=1; i<=json.total/maxresult; i++){
				data.startAt = maxresult*i+1;
				console.log('---------'+data.startAt);
				promises.push(fetch(searchApi,{method: "POST", body : JSON.stringify(data), 
								headers : {'Content-Type' : 'application/json', 'Accept' : 'application/json'}})
								.then(response=>response.json(),reject => console.log(reject))
								.then((json)=>{issues = issues.concat(json.issues)}));
			}
			Promise.all(promises).then(function(results){
				console.log('issues length'+ issues.length);
				issues = issues.map(function(element, index){
					return changeDataStructure(element);
				})
				//res.send(issues);
			})
			
		}else{
		//return res.send(json)
	}
	});
 
}, null, true, 'America/Los_Angeles');
