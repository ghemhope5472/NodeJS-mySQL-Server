const express = require('express')
const mysql = require('mysql')


//CREATE CONNECTION
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node+workbench_db'
});

//CONNECT
db.connect((err) => {
    if(err){
       throw err
    }
    console.log('Connected to mysql!')
})


const app = express()

//CREATE DB
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE nodesql';
    db.query( sql, ( err, result) => {
         if(err) throw err;
         console.log(result)
         res.send('Database created...')
    })
})

//CREATE TABLE
app.get('/createTable', (req,res) =>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err,result ) => {
        err ? console.log(err) : console.log(result)
    })
})



//INSERT POST
app.get('/addPost', (req,res) => {
    let post = {
        title : "Post Two",
        body : 'THis is post two'
    }
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err,res) => {
        err ? console.log(err) : console.log("Post one Added!")
    } )
})


//GET POSTS
app.get('/getPosts', (req,res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, posts ) => {
        err ? console.log(err) : console.log(posts)
    }) 
})


//GET SINGLE POST
app.get('/getPost/:id', (req,res) => {
    let sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        err ? console.log(err) : console.log(result)
    })
})


//UPDATE POST
app.get('/updatePost/:id', (req,res) => {
    let newData = 'Updated title here!';
    let sql = `UPDATE posts SET title ='${newData}' WHERE id=${req.params.id}`;
    let query= db.query( sql, (err,result) => {
        if(err) throw err;
        console.log('Posts updated');
        res.send('Updated new data')
    })
})


//DELETE POST
app.get('/deletePost/:id', (req,res) => {
    let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
    let query = db.query( sql, (err,result) => {
        err ? console.log(err) : console.log('Deleted')
    })
})

app.listen('3000', () => {
    console.log('Server is running')
})