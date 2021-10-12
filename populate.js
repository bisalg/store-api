const Model = require('./mongo_atlas/schema_model')
const express = require('express');
const ConnectionDB = require('./mongo_atlas/connection');
require('dotenv').config()
const products = require('./products.json');

const Populate = async () => {
    try {
        await ConnectionDB(process.env.MONGO_URI);
        await Model.deleteMany().then(() => {
            console.log('old data deleted !');
        });
        await Model.insertMany(products).then(() => {
            console.log('new data successfully inserted !');
        });
        process.exit(0);
    } catch (err) {
        console.log();
        process.exit(1);
    }

}

Populate();