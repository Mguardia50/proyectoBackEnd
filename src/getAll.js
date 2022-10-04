
const fs = require('fs');


let Items = [];



 class Contenedor {

    
    constructor(archivo){

        
        this.archivo = archivo;
    }

    getAll(){
        
            fs.promises.readFile(this.archivo) 
            .then( objetosVenta => {

            let arrayDatos = JSON.parse(objetosVenta);

            
                arrayDatos.map((element)=>{
                    Items.push({id: element.id, objeto: element.objeto, precio: element.precio, stock: element.stock, url: element.url});
                
                })
   
            })
            .catch(err => {
                console.log(err)
            })
        
    }


}

 let container = new Contenedor("./api/objetos.json");

container.getAll(); 

module.exports = Items;


