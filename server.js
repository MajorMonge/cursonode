var express = require('express');
var app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let mongoose = require('mongoose');
mongoose.connect(
    "mongodb://admin:node123@ds145415.mlab.com:45415/cursonode",
    { useNewUrlParser: true }
);

let ToDo = require("./models/todo");

//mongodb://admin:node123@ds145415.mlab.com:45415/cursonode

app.get('/', function(req, res) {
    res.send('Hello World Cipop');
});

app.get('/todo', function(req, res) {
    ToDo
        .find()
        .exec((err, todos) => {
            if(!err){
                res.json({
                success: true,
                message: "ToDos buscados com sucesso.",
                todos
                });
            }else{
                res.json({success: false, message: err.message, todos: []});
            }
        })
});

app.post('/todo', async(req, res) => {
    try{
        let title = req.body.title;

        let newTodo = new ToDo({
            title: title
        });

        let savedTodo = await newTodo.save();

        res.json({success: true, message: "ToDo inserido com sucesso", todo: savedTodo});
    }catch(err){
        res.json({success: false, message: err.message});
    }
});

let port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`Express running at ${port}`);
});

module.exports = app;