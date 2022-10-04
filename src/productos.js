const express = require ("express");
const handlebars = require ('express-handlebars');
const Router = express;

const router = Router();
const app = express();


let Items  = require("./getAll");



const  idCarrito  = require("./idCarrito");
const idCompra = idCarrito[idCarrito.length - 1];

let carrito = [];

router.engine("hbs", handlebars.engine({
    extname: 'hbs',
    layoutsDir:  __dirname + "/../views",
    defaultLayout: 'index',
}))

router.set('views', './views');
router.set('view engine', 'hbs');



router.get('/productos', (req, res) =>{

    /* await pushItems(); */
    res.render('index', {
        layout: "index",
        greetings: "PRODUCTOS",
        operacion: idCarrito,
        verificador: idCompra,
        compras: Items,
        
    })
})

router.get('/productos/carrito', (req, res) =>{
    
    /* await pushItems(); */
    res.render('index', {
        layout: "carrito",
        greetings: "PRODUCTOS",
        compras: carrito,
    })
})

router.get('/productos/carrito/:id', async (req, res) =>{

    const {id} = req.params;
    const product = Items[id];
    if ((typeof JSON.stringify(Items[id]) == "undefined")) {
        res.send("<h1>producto no encontrado</h1>")
     }
    else {
        res.render(`itemCarrito`, {layout: "itemCarrito", producto: product})
    } 
})

router.post('/productos/carrito/:id', (req, res) =>{
 
    const {id} = req.params;
    const producto = Items[id];
    carrito.push({id: producto.id, precio: producto.precio, objeto: producto.objeto, stock: producto.stock, url: producto.url});

    res.send("<h1> ITEM AGREGADO :</h1> " + "<h1>"+ JSON.stringify( producto.objeto)+"</h1> " + 
    `<button onclick="location.href='/productos'">SEGUIR COMPRANDO</button>`+ 
    `<button onclick="location.href='/productos/carrito'">VER MI PEDIDO</button>`) 
})

router.put('/productos/:id', (req, res) =>{

    
    const {id} = req.params;
    const productUpd = req.body;
    const anterior = Items[id];
    Items[id] = productUpd;
    res.send({actualizada: productUpd, anterior: anterior})
})

router.delete('/productos/carrito/d/:id', (req, res) =>{

    const {id} = req.params;
    let productDel = carrito[id];
    carrito = carrito.filter((productDel)=> productDel != carrito[id]);
    
    res.send({eliminada: productDel} +    
        `<button onclick="location.href='/productos'">SEGUIR COMPRANDO</button>`+ 
        `<button onclick="location.href='/productos/carrito'">VER MI PEDIDO</button>`)
})

//ATADO CON ALAMBRES COMO SIEMPRE, EN TB ANDA EL METODO DELETE, PERO EN LOS BROWSERS NO
router.get('/productos/carrito/d/:id', (req, res) =>{

    const {id} = req.params;
    let productDel = carrito[id];
    carrito = carrito.filter((productDel)=> productDel != carrito[id]);
    
    res.send({eliminada: productDel} +    
    `<button onclick="location.href='/productos'">SEGUIR COMPRANDO</button>`+ 
    `<button onclick="location.href='/productos/carrito'">VER MI PEDIDO</button>`)
})

router.delete('/productos/carrito/del/all', (req, res) =>{

    carrito = [];
    
    res.send("<h1> CARRITO VACIADO </h1> "+ carrito +    
    `<button onclick="location.href='/productos'">SEGUIR COMPRANDO</button>`+ 
    `<button onclick="location.href='/productos/carrito'">VER MI PEDIDO</button>`)
})

//ATADO CON ALAMBRES COMO SIEMPRE, EN TB ANDA EL METODO DELETE, PERO EN LOS BROWSERS NO
router.get('/productos/carrito/del/all', (req, res) =>{

    carrito = [];
    
    res.send("<h1> CARRITO VACIADO </h1> " +    
    `<button onclick="location.href='/productos'">SEGUIR COMPRANDO</button>`+ 
    `<button onclick="location.href='/productos/carrito'">VER MI PEDIDO</button>`)
})

module.exports = router;