const express = require('express');


const { urlencoded } = require("express");
const app = express();


let Mensajes= [];
let productos = [];
let productosAgregados = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const path = require('path')
app.use(express.static('public'));
app.use(express.static('style.css'));

const productosRouter = require ("./src/productos.js");
app.use('/', productosRouter);

const administrador = require ("./admin/admin.js");
app.use('/', administrador);




app.listen(8080, ()=>{
    console.log("iniciando")
})