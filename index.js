const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.listen(2000, ()=> {
    console.log("Lancement du serveur...")
})

const db = mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'mycine',
});

db.connect(err=>{
    if(err) { console.log(err,'dberr')}
    console.log("Connexion à la base de données...")
})

app.get('/films',(req,res)=>{
    let qr = 'select * from films';
    db.query(qr,(err,result)=> { 
        if(err) {console.log(err,'reqerr')}
        if(result.length>0) {
            res.send(result);
        }
    })
})
app.get('/film/:id',(req,res)=>{
    let id = req.params.id;
    let qr = `select * from films where id = ${id}`;
    db.query(qr,(err,result)=> { 
        if(err) {console.log(err,'reqerr')}
        if(result.length>0) {
            res.send({result});
        }
        else {
            res.send({message:'Film not founded'});
        }
    })
})

app.post('/film',(req,res)=> {
    let title = req.body.title;
    let synopsis = req.body.synopsis;
    let rating = req.body.rating;

    let qr =  `INSERT INTO films (id, title, synopsis,rating) VALUES (NULL, '${title}','${synopsis}', '${rating}')`;
    db.query(qr,(err,result)=> { 
        if(err) {console.log(err,'reqerr')}
        res.send({message:'added a new film data'});
    })
})

app.put('/film/:id',(req,res)=> {
    let id = req.params.id;
    let title = req.body.title;
    let synopsis = req.body.synopsis;
    let rating = req.body.rating;

    let qr =  `UPDATE films SET title = '${title}', synopsis = '${synopsis}', rating = '${rating}'  WHERE films.id = ${id}`;
    db.query(qr,(err,result)=> { 
        if(err) {console.log(err,'reqerr')}
        res.send({message:'updated film data',});
    })
})
app.delete('/film/:id',(req,res) => {
    let id = req.params.id;

    let qr = `DELETE from films where id = '${id}'`;
    db.query(qr,(err,result)=> { 
        if(err) {console.log(err,'reqerr')}
        res.send({message:'deleted film data'});
    })
})

