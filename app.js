const express = require('express');
const exp = express();
const path = require('path');
const cheerio = require('cheerio');
const sleep = require('sleep')
const request = require('request');
const axios = require('axios');
const rp = require('request-promise')
var fs = require('fs');
// const link = "";

//server conn and assets
// Require static assets from public folder
exp.use(express.json());
exp.use(express.static(path.join(__dirname, 'public')));
exp.use(express.urlencoded({ extended: false }));

// Set 'views' directory for any views 
// being rendered res.render()
exp.set('views', path.join(__dirname, ''));
// Set view engine as EJS
exp.engine('html', require('ejs').renderFile);
exp.set('view engine', 'html');


exp.listen(5000, () => {
    console.log('listening on port 5000');

});

exp.get('/', (req, res) => {
    res.render('index');
})

exp.post('/', (req, res, next) => {
    console.log(req.body);

    var qry = req.body.query;
    console.log(qry);
    const searchUrl = (`https://www.google.com/search?q=${qry}`);
    // sleep.sleep(10);
    console.log(searchUrl);
    var savedData = [];

    axios.get(searchUrl)
        .then(response => {
            // console.log(response.data);
            fs.writeFileSync('test.html', JSON.stringify(response.data))



        })
})

exp.get('/result', (req, res) => {
    res.render('test')
})