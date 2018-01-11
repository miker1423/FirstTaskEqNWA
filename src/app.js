const express = require('express')
const path = require("path")
const firebase = require("firebase-admin")

const app = express()

const serviceAccount = require(path.join(__dirname + "/FirstTask-7556d5d72ea1.json"));

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://firsttask-7bddd.firebaseio.com"
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+"/index.html"))
});

app.get("/info", function(req, res){
    var DB = firebase.database()
    var dbRef = DB.ref("info");

    dbRef.once("value", 
        function(snapshot){
            res.send({ value: snapshot.val()})
    })
});

var port = process.env.port || 3000

app.listen(port, () => console.log('Example app listening on port 3000!'))