// Requirements
const express = require('express');
const app = express ();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const listingsRouter = require('./routers/listings.router.js')


// Configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup routes
app.use('/listings', listingsRouter);

// Static files
app.use(express.static('server/public'));

// Start the server
app.listen(PORT, ()=>{
    console.log(`App is running on port: ${PORT}`);
});