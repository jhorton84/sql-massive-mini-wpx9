const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());


// process is 
massive(process.env.CONNECTION_STRING).then(database => {
   app.set('db', database);
});

//This goes and runs the SQL file '/db/get_superheroes.sql'. The 'db' is referencing the 'db' in the app.set. They must be named the same, but the name doesn't matter.
app.get('/api/superheroes', (req, res) => {
    app.get('db').get_superheroes().then(superheroes => {
        res.json(superheroes);
    }).catch(error => {
        console.log('Error in  GET superheroes', error);
    })
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`The server has sailed from port:${PORT} ⛵️`);
})