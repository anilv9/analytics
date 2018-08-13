
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    
    var projectSchema = new Schema ({
        project:[{
            "self": String,
"id": String,
"key": String,
"name": String,
// "avatarUrls":[],
// "projectCategory":[]
        }
        ]
    })
    module.exports = mongoose.model('projectmodel', projectSchema);
    