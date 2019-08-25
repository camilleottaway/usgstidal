const  express = require('express');
const path = require('path');

const CLIENTAPPPATH = "../public/build";


module.exports.staticFilesSetup = (app) =>{
    app.use(express.static(path.join(__dirname, CLIENTAPPPATH)));
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, CLIENTAPPPATH, 'index.html'));
    });
}
