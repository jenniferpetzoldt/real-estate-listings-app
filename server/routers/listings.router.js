const express = require('express');
const router = express.Router();

//PG setup
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'real_estate',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
}

const pool = new Pool(config);

pool.on('connect', ()=>{
    console.log('postgresql connected');
});

pool.on('error', (error)=>{
    console.log('Error connecting to db', error);
});

router.post('/', function(req, res){
    const listingToAdd = req.body;
    console.log('In POST route: ', listingToAdd);
    const query = 'INSERT INTO "listings" ("cost", "sqft", "type", "city", "image_path") VALUES($1, $2, $3, $4, $5);';
    pool.query(query, [listingToAdd.cost, listingToAdd.sqft, listingToAdd.type, listingToAdd.city, listingToAdd.image_path]).then(()=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});