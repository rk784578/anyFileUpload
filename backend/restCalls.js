
const REQURIED_NODE_MODULES = require('../public/modules/nodeModules.js')



// // Insert record
exports.insert = (url, dataBase, collectionName, jsonData, callback) => {

    REQURIED_NODE_MODULES.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dataBase);
        dbo.collection(collectionName).insert(jsonData, function (err, res) {
            if (err) throw err;
            //console.log("1 document inserted",res);
            db.close();
            callback(null, { status: 201, message: "1 document inserted" });
        });
    });
}

// Fetch 
exports.findOne = (url, dataBase, collectionName, jsonData, callback) => {
    REQURIED_NODE_MODULES.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dataBase);
        dbo.collection(collectionName).findOne(jsonData, function (err, res) {
            if (err) throw err;
            db.close();
            callback(null, res);
        });
    });
}


// Get All data  
exports.getAll = (url, dataBase, collectionName, jsonData, callback) => {
    REQURIED_NODE_MODULES.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dataBase);
        var cursor = dbo.collection(collectionName).find();
        // Execute the each command, triggers for each document
        let rows = []
        cursor.each(function (err, item) {
            // If the item is null then the cursor is exhausted/empty and closed
            if (item == null) {
                db.close();
               // console.log("NO RECORDS FOUND");
                callback(null, rows);
                // return;
            }
            else {
                rows.push(item);
            }
        });

    });
}

// Update 
exports.updateData = (url, dataBase, collectionName, jsonData, callback) => {


    REQURIED_NODE_MODULES.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dataBase);
        // this is the  existing name feild
        var myquery = { _id: jsonData._id };
        // new values passing to the db and updating.
        var newvalues = { $set: jsonData };
        dbo.collection(collectionName).updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            //console.log("1 document updated",res);
            callback(null,"1")
            db.close();
        });
    });
}


// Delete
exports.deleteRecord = (url, dataBase, collectionName, jsonData, callback)=>{
REQURIED_NODE_MODULES.MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dataBase);
    var myquery = { _id: jsonData._id };
    dbo.collection(collectionName).deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
    });
});
}

// fetch query 
exports.fetch =(url, dataBase, collectionName, jsonData, callback)=>{

    REQURIED_NODE_MODULES.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dataBase);
        dbo.collection(collectionName).find(jsonData).toArray(function (err, results) {
            if (err) {
                console.log(err);
            }
            callback(null,results);
           // console.log(results.length); // output all records
            db.close();
        });
    
    });
}

// rest normal call (CLOudant)
exports.cloudRest = (url, method, data, callback) => {


    REQURIED_NODE_MODULES.request({
        uri: url,
        method: method,
        json: data
    }, (err, response, body) => {
        if (err) {
            callback(null, err);
        }
        else {
            // console.log(body);  
            callback(null, body);
        }
    });
};