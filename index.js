const { name } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Article = require('./models/article');

mongoose.connect('mongodb+srv://ahmedelhamalawy:174174174@cluster0.bapltgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('connected successfully');
}).catch((error)=>{
    console.log('error with connecting with the DB', error);
});    

app.use(express.json());

app.get('/hello', (req, res) => {
res.send('hello');
});

app.get('/', (req, res) => {
    res.send('hello in node js project');
    });

app.get('/numbers', (req, res) => {
    let numbers ='';
    for(let i = 0; i <= 100; i++){
        numbers += i + '-';
    }
    // res.send(`${numbers}`);
    // res.sendFile(__dirname + '/views/numbers.html');
    res.render('numbers.ejs',{
        name:'Ahmed',
        numbers:numbers,
    });
    
});

app.get('/findsummation/:number1/:number2', (req, res) => {
    const num1 = req.params.number1;
    const num2 = req.params.number2;
    const total = Number(num1) + Number(num2);
    res.send(`the total is:${total}`);
    });

app.get('/sayhello', (req, res) => {
    //  console.log(req.body);
    // console.log(req.query);
    // res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);
    res.json({
        name:req.body.name,
        age:req.query.age,
        language:"Arabic",
    });
    });    

app.get('/test', (req, res) => {n
res.send('you visited test');
}); 

app.put('/test', (req, res) => {
    res.send('hello world');
}); 

app.post('/addcomment', (req, res) => {
    res.send('post request on add comment');
}); 

app.delete('/testingDelete', (req, res) => {
    res.send('delete request');
}); 

app.post('/articles', async (req, res) => {
    const newArticle = new Article()
    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody
    newArticle.title = artTitle
    newArticle.body = artBody
    newArticle.numberOflikes=0
    await newArticle.save()
    res.json(newArticle);
});

app.get('/articles', async (req, res) => {
    const articles = await Article.find();
    console.log('the articles are', articles);
    res.json(articles);
}); 


app.get('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    try{
        const article = await Article.findById(id);
        res.json(article);
        return;
    }catch(error){
        console.log('error while reading article of id',id);
        return res.send('error');
    }
}); 

app.delete('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    try{
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
        return;
    }catch(error){
        console.log('error while reading article of id',id);
        return res.json(error);
    }
}); 

app.get('/showArticles', async (req, res) => {
    const articles = await Article.find();
    res.render('articles.ejs',{
        allArticles:articles,
    });
}); 

app.listen(3000, () => {
console.log('Server is running on port 3000');
});