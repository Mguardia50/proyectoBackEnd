const express = require ("express");
const handlebars = require ('express-handlebars');
const Router = express;

const router = Router();
const app = express();

let  Items  = require("../src/getAll");
console.log(Items);
const isAdmin = true;



router.engine("hbs", handlebars.engine({
    extname: 'hbs',
    layoutsDir:  __dirname,
    defaultLayout: 'index',
}))

router.set('admin', './admin');
router.set('view engine', 'hbs');


router.get('/admin', (req, res) =>{

    
    /* await pushItems(); */
    res.render('index', {
        layout: "index",
        Items: Items,
    })
})


router.get('/admin/productos/', (req, res) =>{

    const {id} = req.query;
    const product = Items[id];
    (typeof JSON.stringify(Items[id]) == "undefined") ? res.send("<h1>producto no encontrado</h1>") : res.send(`<h1 style="color: black">EL PRODUCTO ES</h1>` + JSON.stringify(product)
    +
        `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>` +
        `<button onclick="location.href='/admin'">VOLVER A ADMIN</button>`) 
})

router.post('/productos', (req, res) =>{
/* router.post('/productos', upload.single('item',3), (req, res) =>{ ESTO SERIA SI USO MULTER*/
    
    const {file} = req;
    const producto = req.body;
    const idProducto = Items.length;
    Items.push({id: idProducto, precio: producto.precio, objeto: producto.item, url: producto.url});

    res.send("<h1> ITEM AGREGADO :</h1> " + JSON.stringify({agregada: producto, agregado2: file, id: Items.length }) + `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>`) 
})

router.put('/productos/remp/:id', (req, res) =>{

    
    const {id} = req.params;
    const productUpd = req.query;
    const anterior = Items[id];
    Items[id].stock = productUpd;
    res.send(JSON.stringify({actualizada: productUpd, anterior: (anterior.objeto)}) +
        `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>` +
        `<button onclick="location.href='/admin'">VOLVER A ADMIN</button>`)
})

router.get('/productos/remp/:id', (req, res) =>{

    
    const {id} = req.params;
    const productUpd = req.query;
    const anterior = Items[id];
    Items[id].stock = productUpd.stock;
    res.send(JSON.stringify({actualizada: productUpd, anterior: anterior.objeto, stock: anterior.stock}) +
        `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>` +
        `<button onclick="location.href='/admin'">VOLVER A ADMIN</button>`)
})

router.get('/productos/e/:id', (req, res) =>{

    const {id} = req.params;
    const {idq} = req.query;
    let productDel = Items[id];
    Items.splice(id,1)
    //Items = Items.filter((productDel)=> productDel != Items[id]);
    res.send(JSON.stringify({eliminada: productDel}) + 
        `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>` +
        `<button onclick="location.href='/admin'">VOLVER A ADMIN</button>`)
})

router.delete('/productos/e/:id', (req, res) =>{

    const {id} = req.params;
    let productDel = Items[id];
    Items.splice(id,1)
    //Items = Items.filter((productDel)=> productDel != Items[id]);
    res.send(JSON.stringify({eliminada: productDel}) + 
        `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>` +
        `<button onclick="location.href='/admin'">VOLVER A ADMIN</button>`)
})

router.delete('/productos/e/', (req, res) =>{

    const {idq} = req.query;
    let productDel = Items[idq];
    Items.splice(idq,1)
    //Items = Items.filter((productDel)=> productDel != Items[id]);
    res.send(JSON.stringify({eliminada: productDel}) + 
        `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>` +
        `<button onclick="location.href='/admin'">VOLVER A ADMIN</button>`)
})

router.get('/productos/e/', (req, res) =>{

    const {idq} = req.query;
    let productDel = Items[idq];
    Items.splice(idq,1)
    //Items = Items.filter((productDel)=> productDel != Items[id]);
    res.send(JSON.stringify({eliminada: productDel}) + 
        `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>` +
        `<button onclick="location.href='/admin'">VOLVER A ADMIN</button>`)
})

module.exports = router, isAdmin;
