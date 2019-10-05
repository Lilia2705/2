const express = require('express');
const exprHb = require('express-handlebars');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));


app.engine('.hbs', exprHb({
    defaultLayout: null,
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

let users = [];


app.get ('/', (req,res) => {
    res.render('main.hbs')
});

app.get('/login',(req,res) =>{
    res.render('log')
});

app.get ('/register', (req,res) => {
    res.render('register');
});


app.post('/register', (req, res) => {
    let user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.render('register')
});


app.post('/login', (req, res) => {
    const {email, password} = req.body;

    const finded = users.find( user => user.userMail === email && user.userPass === password);

    res.json(finded);
});



app.get('/users/:user_id', (req,res)=> {
    console.log(req.params);
    const {user_id} = req.params;
    console.log(req.query);
    // res.end(JSON.stringify(req.params))

    const userFromDB = users.find(user => user.id === +user_id);

    res.json(userFromDB);
});

let houses = [];

app.get ('/house', (req,res) => {
res.render('houses' );
});


app.post('/house', (req, res) => {
    let house = req.body;
    house.id = houses.length + 1;
    houses.push(house);
    res.render('houses')
});

app.get('/houses/:house_id', (req,res)=> {
    console.log(req.params);
    const {house_id} = req.params;
    console.log(req.query);
    // res.end(JSON.stringify(req.params))

    const houseFromDB = houses.find(house => house.id === + house_id);

    res.json(houseFromDB);
});



app.all ('*', (req,res) => {
    res.render('error' );
});

app.listen(3000, () => {
    console.log('HELLO');
});
