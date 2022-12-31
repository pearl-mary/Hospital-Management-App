const express = require('express');
const app = new express();

const fs = require('fs');
const data = require('./hospitalData.json');
app.use(express.json());

const logger = require('morgan');

//using body parameter
app.use(logger('dev'));


//get method
app.get('/hospitalInfo', (req, res) => {
    res.send(data);
})
//post method
app.post('/hospitalInfo', (req, res) => {
    data.push(req.body);
    fs.writeFile('hospitalData.json', JSON.stringify(data), (err, resp) => {
        if (err) {
            resp.send("Data cannot be written!");
        }
        else {
            resp.send("Data wrote successfully!");
        }
    })
})
app.put('/hospitalInfo/:name', (req) => {
    let name = req.params.name;
    data.forEach((item) => {
        if (item.NameofHospital == name) {
            item.HospitalLocation = req.body.HospitalLocation;
            item.PatientCount = req.body.PatientCount;
        }
    })
    fs.writeFile('hospitalData.json', JSON.stringify(data), (err, res) => {
        if (err) {
            res.send("Data Updation Failed!")
        }
        else {
            res.send("Udated Data Successfully!")
        }

    })
})
//delete method
app.delete('/hospitalInfo/:name', (req) => {
    let name = req.params.name;
    let value = data.filter(item => item.NameofHospital !== name);
    fs.writeFile('hospitalData.json', JSON.stringify(value), (err, res) => {
        if (err) {
            res.send("Cannot Delete Data!")
        }
        else {
            res.send(" Data Successfully Deleted !")
        }
    })
})
//listening to server

app.listen(3000);
console.log("Server Listening to port 3000");