var express = require('express');
var router = express.Router();
// load the module and create the reference of mongodb module
let mongoClient = require("mongodb").MongoClient;
//url Details
let url ="mongodb://127.0.0.1:27017";
const dbName = 'arhamdb';
const collectionName = 'student';

/* GET all course data  */
router.get('/', function(req, res, next) {
    // res.send('course router get methods response.');
    // Connect to the database
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;

        // Specify the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Retrieve all documents from the collection
        collection.find({}).toArray(function(err, docs) {
            if (err) throw err;

            // Send the retrieved documents back as a response
            res.send(docs);

            // Close the database connection
            client.close();
        });
    });
});

/* create new course row in collection */
router.post('/', function(req, res, next) {
    // res.send('course router post methods response.');

    mongoClient.connect(url,(err,client)=>{
        if(!err){
            console.log("Connected")
            let db = client.db(dbName)

            db.collection(collectionName).insertOne(req.body,(err,result)=>{
                if(!err){
                    console.log("Record inserted successfully")
                    res.send("Record inserted successfully")
                    // console.log(result)
                }else {
                    console.log(err);
                    res.send("erro in inserting records")
                }

                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })
});

/*
    update record from collection
 */

router.put('/', function(req, res, next) {
    //res.send('course router put methods response.');

    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);

            db.collection(collectionName).replaceOne({"_id":req.body._id},req.body,(err,result)=> {
                if(!err){
                    console.log("Record inserted successfully")
                    res.send("record inserted successfully");
                    //console.log(result);
                }else {
                    console.log(err);
                    res.send("error in inserting records");
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })
});

/*
    delete the record
 */
router.delete('/', function(req, res, next) {
    //res.send('course router delete methods response.');
    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);

            db.collection(collectionName).deleteOne({"_id":req.body._id},req.body,(err,result)=> {
                if(result.deletedCount>0){
                    res.send("Record deleted successfully")
                }else {
                    res.send("Record not present")
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })


});


module.exports = router;