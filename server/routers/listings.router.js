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

// POST route
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

// Listings GET route
router.get('/for-sale', function(req, res){
    console.log('in GET route');
    const query = 'SELECT * FROM "listings" WHERE "type" = ($1);';
    pool.query(query, ['sale']).then((results)=>{
        console.log(results);
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in GET', error);
        res.sendStatus(500);
    });
});

//listings DELETE route
router.delete('/for-sale/:id', function(req, res){
    console.log('In listing DELETE route');
    const id = req.params.id;
    const query = 'DELETE FROM "listings" WHERE "id" = ($1);';
    pool.query(query, [id]). then((results)=>{
        console.log(results);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error with listing DELETE', error);
        res.sendStatus(500);
    });
});

//Rentals GET route
router.get('/for-rent', function(req, res){
    console.log('in GET route');
    const query = 'SELECT * FROM "listings" WHERE "type" = ($1);';
    pool.query(query, ['rent']).then((results)=>{
        console.log(results);
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in GET', error);
        res.sendStatus(500);
    });
});

// rentals DELETE route
router.delete('/for-rent/:id', function(req,res){
    console.log('In rental DELETE route');
    const id = req.params.id;
    const query = 'DELETE FROM "listings" WHERE "id" = ($1);';
    pool.query(query, [id]).then((results)=>{
        console.log(results);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error with rental DELETE', error);
        res.sendStatus(500);
    });
});

module.exports = router;