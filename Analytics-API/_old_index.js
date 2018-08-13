let express = require('express');
let fetch = require('node-fetch');
var config = require('./config');
var mongoose = require('mongoose');
var Jira = require('./schema/abtestsschema');
var ProjectModel = require('./schema/projectschema');
let path  = require('path');
var D3Node = require('d3-node')

mongoose.connect('mongodb://localhost/demo', (err)=>{
	if(err){
		console.log('failed to connect to mongodb, please check connection.')
	}
});
mongoose.Promise = global.Promise;

var changeDataStructure = (data)=>{
	// console.log('dadadada'+data.fields.labels)
	 var test =  {
		Test_name : data.key,
		Summary: data.fields.summary,
		Description: data.fields.description,
		Hypothesis: data.fields.customfield_26580,
		Labels: data.fields.labels,
		Owning_Pod : data.fields.customfield_27080,
		Site_Area : data.fields.customfield_28481,
		Status: data.fields.status,
		URL: data.fields.customfield_10020,
		Metrics : data.fields.customfield_16397,
		Primary_Metric : data.fields.customfield_26180,
		Secondary_Metric : data.fields.customfield_26384,
		Data_Start_Date : data.fields.customfield_27185,
		Data_End_Date : data.fields.customfield_27186,
		Test_Approach : data.fields.customfield_26383,
		Target_Release_Date: data.fields.customfield_14880,
		Target_Test_Name : data.fields.customfield_27181,
		Test_Result: data.fields.customfield_26392,
		created : data.fields.created,
		Attachments: data.fields.attachment,
		Intake_Review : data.fields.customfield_26381,
		Conversion_Impact_Area: data.fields.customfield_27380,
		Business_Validation_Steps: data.fields.customfield_20980,
		Platform: data.fields.customfield_26382,
		Estimated_Value: data.fields.customfield_27187
	 }

var jiraInstance = new Jira(test);
  // console.log('parsed output to web-server');
 
	Jira.findOneAndUpdate({"Test_name" : test['Test_name']},{$set:test}, (err, response)=>{
		if (err) return console.error(err);
		console.log('issue added to the DB');
		// console.log(`${response}`);
		if (response === null){
			jiraInstance.save( (err, jira) =>{
				if (err) return console.error(err);
			  });
		}
		
	});

return jiraInstance.toJSON();
}
const project = config.base_url+config.jira_api.project.path;
const issues = config.base_url+config.jira_api.issues.path;

var app = express();
app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname,'index.html'));
});

app.get('/jira',(req,res)=>{
	// console.log('jira')
	Jira.find({}, (ere,doc)=>{
	var options = { selector: '#chart', container: '<div id="container"><div id="chart"><pre>'+JSON.stringify(doc,null,2)+'</pre></div></div>' }
	var d3n = new D3Node(options)
	var d3 = d3n.d3
	d3.select(d3n.document.querySelector('#chart')).append('span') 
	res.send(d3n.html())
	})
	
})

app.get('/getallissues',(req,res)=>{
	var searchApi = 'http://jira.cingular.net/jira/rest/api/2/search';
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
					"customfield_27187",
					"customfield_28481",
					"labels",
					"status",
					"attachment",
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
			Promise.all(promises).then((results)=>{
				console.log('issues length'+ issues.length);
				issues = issues.map((element, index)=>{
					return changeDataStructure(element);
				})
				res.send(issues);
			})
			
		}else{
		return res.send(json)
	}
	});
})

app.get('/projects',(req,res)=>{
fetch(project, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'}
}).then(response=>{
	return response.json();
}).then(data => {
	var projectModelInstance = new ProjectModel({project :data});
	mongoose.connect('mongodb://localhost/demo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
  console.log('connected');
	projectModelInstance.save((err, jira)=> {
		if (err) return console.error(err);
		console.log('data saved');
		mongoose.disconnect();
	  })
	});
	res.send(data);
}).catch(err => {console.log(err);});
});

app.get('/issues',(req,res)=>{
	var id = req.param('id');
	console.log(id)
fetch(issues+''+id, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'}
}).then(response=>{
	return response.json();
}).then(data => {
	res.send(changeDataStructure (data));

}).catch(err => {console.log(err);});

});

app.get('/addtext',(req, res)=>{
	
	let jiraid = req.param('jiraid');
	let key = req.param('key');
	let value = req.param('value');
		var obj = {};
		obj[key] =value;
		// console.log(key, value, obj);
	Jira.update({'Test_name':jiraid},
	{$set:obj},
	{},function(err, numAffected){
		// console.log(numAffected);
	})
	res.send('issue updated');
})

app.get('/updatecustom', (req,res)=>{
	let jiraid = req.param('jiraid');
	let recommendations = req.param('recommendations');
	let results = req.param('results');
	Jira.findOneAndUpdate({"Test_name" : jiraid}, 
	{$set : {'customfields' : {recommendations :recommendations, results : results}}},
	{new:true}, (err, doc)=>{
		if(err){
			res.send(err)
		}
		res.send(doc);
	})
})
app.get('/getissues', (req,res)=>{
	 Jira.find({}, 'Test_name', (err,doc)=>{
		 if (err)
res.send(err);
		else  res.send(doc);
	})
})

app.get('/jira/:jiraid',function(req,res){
	Jira.find({ 'Test_name':req.params.jiraid}, (err,doc)=>{
		if (err)
		res.send(err);
	   else  {
		   res.send(`<pre>${JSON.stringify(doc,{},2)}</pre>`);
	   }
   })
})

app.listen(3000, ()=> {
    console.log('Web-server is listening on port 3000!');
});