var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customfieldsSchema = require('./customfieldsschema');

var jiraSchema = new Schema ({
    Test_name: String, //CRO_Issue_Key
    Summary: String,
    Description:String,
    URL: String,
    Hypothesis: String,
    Intake_Review : String,
    Platform: String,
    Test_Approach : [{value:String}],
    Primary_Metric : [{
        value:String
    }],
    Secondary_Metric : [{
        value:String
    }],
    Conversion_Impact_Area:[{
        value:String
    }],
    Metrics :String,
    Target_Release_Date:Date,
    Data_Start_Date :Date,
    Data_End_Date : Date,
    Business_Validation_Steps: String,
    Target_Test_Name : String,
    Test_Result: [{
        value:String
    }],
    Attachments: [{
        content : String
    }],
    created : Date,
    customfields : {type :customfieldsSchema, default:{}}
    
    // results : {type: String, default : ''}, 
    // recommendations : {type: String, default : ''},
    // observations : {type: String, default : ''}

})

module.exports = mongoose.model('jiramodel', jiraSchema);